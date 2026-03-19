import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const statsShown = ref(false)
  const toggleState = ref({
    quest: false,
    inventory: true,
    upkeep: true,
    mining: false,
    smithing: false,
    purchased_upgrades: false,
    purchased_autoers: false,
    hired_assistants: false,
    inventory_categories: {
      ores: true,
      bars: true,
      armor: true,
      weapons: true,
      bronze: true,
      iron: true,
      steel: true,
      starmetal: true,
      other: true,
    } as Record<string, boolean>,
  })

  function togglePanel(key: string) {
    const ts = toggleState.value as Record<string, unknown>
    ts[key] = !ts[key]
  }

  function toggleInventory(key: string) {
    toggleState.value.inventory_categories[key] = !toggleState.value.inventory_categories[key]
  }

  return { statsShown, toggleState, togglePanel, toggleInventory }
})
