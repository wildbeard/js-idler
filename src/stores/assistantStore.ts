import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Assistant } from '../types'
import { items } from '../data/items'
import {
  canHireAssistant as canHireAssistantFn,
  isAssistantMaxed as isAssistantMaxedFn,
  hasRequirementsForAssistant,
  hireAssistant as hireAssistantFn,
  fireAssistant as fireAssistantFn,
  upgradeAssistant as upgradeAssistantFn,
  updateAssistantJobs,
  generateRandomAssistant,
} from '../game/assistants'
import { useGameStore } from './gameStore'

export const useAssistantStore = defineStore('assistant', () => {
  const gameStore = useGameStore()

  const availableAssistants = ref<Assistant[]>([])
  const configuringAssistant = ref<Assistant | null>(null)
  const configuringAssistantConfig = ref<{
    mining: string[]
    smithing: string[]
    selling: Record<string, { checked: boolean; item_id: string; method: string; value: number }>
  } | null>(null)
  const firingAssistant = ref<Assistant | null>(null)

  setInterval(() => {
    if (!gameStore.s.quests_completed.includes('introduction_assistants')) return
    const assistant = generateRandomAssistant({ value: gameStore.s })
    if (availableAssistants.value.length >= gameStore.s.global_variables.max_available_assistants) {
      availableAssistants.value.shift()
    }
    availableAssistants.value.push(assistant)
  }, gameStore.s.global_variables.assistant_refresh_rate)

  const availableFiltered = computed(() =>
    availableAssistants.value.filter((a) => hasRequirementsForAssistant(a, { value: gameStore.s })),
  )

  function hireAssistant(assistant: Assistant) {
    hireAssistantFn(assistant, { value: gameStore.s })
    availableAssistants.value = availableAssistants.value.filter((a) => a.id !== assistant.id)
    configuringAssistant.value = gameStore.s.assistants[gameStore.s.assistants.length - 1]
  }

  function editAssistant(purchasedAssistant: Assistant) {
    const c: typeof configuringAssistantConfig.value = {
      mining: [],
      smithing: [],
      selling: {},
    }

    for (const key in purchasedAssistant.config) {
      if (purchasedAssistant.skills.includes('selling') && key === 'selling') {
        for (const item of items.filter((i) => i.sellable)) {
          const currConfig = purchasedAssistant.config.selling.find(
            (cfg) => cfg.item_id === item.item_id,
          )
          c!.selling[item.item_id] = {
            checked: !!currConfig,
            item_id: item.item_id,
            method: currConfig?.method ?? 'sell_x',
            value: currConfig?.value ?? 0,
          }
        }
      } else {
        const k = key as 'mining' | 'smithing'
        c![k] = [...purchasedAssistant.config[k]]
      }
    }

    configuringAssistantConfig.value = c
    configuringAssistant.value = purchasedAssistant
  }

  function saveAssistantConfig(purchasedAssistant: Assistant) {
    const idx = gameStore.s.assistants.findIndex((a) => a.id === purchasedAssistant.id)
    if (idx === -1 || !configuringAssistantConfig.value) return

    for (const key in configuringAssistantConfig.value) {
      if (key === 'selling') {
        purchasedAssistant.config.selling = []
        for (const itemId in configuringAssistantConfig.value.selling) {
          const itemConfig = configuringAssistantConfig.value.selling[itemId]
          if (itemConfig.checked) {
            purchasedAssistant.config.selling.push({
              item_id: itemConfig.item_id,
              method: itemConfig.method as 'all' | 'sell_x' | 'keep_x',
              value: itemConfig.value,
            })
          }
        }
      } else {
        const k = key as 'mining' | 'smithing'
        purchasedAssistant.config[k] = [...(configuringAssistantConfig.value[k] ?? [])]
      }
    }

    gameStore.s.assistants[idx] = JSON.parse(JSON.stringify(purchasedAssistant))
    configuringAssistant.value = null
    configuringAssistantConfig.value = null
    updateAssistantJobs(gameStore.s.assistants[idx].id, { value: gameStore.s })
  }

  return {
    availableAssistants: availableFiltered,
    configuringAssistant,
    configuringAssistantConfig,
    firingAssistant,
    hireAssistant,
    editAssistant,
    saveAssistantConfig,
    fireAssistant: (assistant: Assistant) => {
      fireAssistantFn(assistant, { value: gameStore.s })
      firingAssistant.value = null
    },
    confirmFireAssistant: (assistant: Assistant) => {
      firingAssistant.value = assistant
    },
    cancelFiring: () => {
      firingAssistant.value = null
    },
    upgradeAssistant: (assistant: Assistant) =>
      upgradeAssistantFn(assistant, { value: gameStore.s }),
    canHireAssistant: (assistant: Assistant) =>
      gameStore.s.global_variables.max_assistants > gameStore.s.assistants.length &&
      canHireAssistantFn(assistant, { value: gameStore.s }),
    canUpgradeAssistant: (assistant: Assistant) =>
      canHireAssistantFn(assistant, { value: gameStore.s }),
    isAssistantMaxed: (assistant: Assistant) =>
      isAssistantMaxedFn(assistant, { value: gameStore.s }),
    getAssistantUpgradeCost: (assistant: Assistant) =>
      assistant.upgrades.find((u) => u.level === assistant.level + 1)?.cost ?? 0,
    getAssistantUpgradeTitle: (assistant: Assistant) => {
      const nxtLvl = assistant.upgrades.find((u) => u.level === assistant.level + 1)
      if (!nxtLvl) return 'Max'
      let str = 'Requires'
      for (const [k, v] of Object.entries(nxtLvl.requirements)) str += ` ${k}: ${v}`
      return str
    },
    getAssistantJob: (assistant: Assistant) =>
      gameStore.s.assistants.find((a) => a.id === assistant.id)?.skills.join(',') ?? 'N/A',
    getAssistantCost: (assistant: Assistant) => {
      const hired = gameStore.s.assistants.find((a) => a.id === assistant.id)
      if (!hired) return assistant.upgrades[0]?.cost ?? 0
      return hired.upgrades.find((u) => u.level === hired.level + 1)?.cost ?? 0
    },
  }
})
