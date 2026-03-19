import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Quest } from '../types'
import { quests as questData } from '../data/quests'
import {
  checkQuestRequirements,
  canCompleteQuest as canCompleteQuestFn,
  canCompleteQuestStep as canCompleteQuestStepFn,
  completeQuestStep as completeQuestStepFn,
  startQuest,
  completeQuest as completeQuestFn,
} from '../game/questLogic'
import { useGameStore } from './gameStore'

export const useQuestStore = defineStore('quest', () => {
  const gameStore = useGameStore()

  const currentQuest = ref<Quest | null>(null)
  const viewingQuest = ref<Quest | null>(null)

  // Restore in-progress quest from saved state
  if (gameStore.s.quests_started.length) {
    const q = questData.find((q) => q.id === gameStore.s.quests_started[0].quest_id)
    if (q) {
      currentQuest.value = q
      viewingQuest.value = q
    }
  }

  function acceptQuest(quest: Quest) {
    if (startQuest({ value: gameStore.s }, quest)) {
      currentQuest.value = quest
    }
  }

  function completeQuestStep() {
    if (!currentQuest.value) return
    const currentStep = gameStore.s.quests_started[0].step
    const hasMoreSteps = currentQuest.value.steps.find((s) => s.id === currentStep + 1)

    completeQuestStepFn(currentQuest.value, currentStep, { value: gameStore.s })

    if (!hasMoreSteps) {
      completeQuestFn(currentQuest.value, { value: gameStore.s })
      currentQuest.value = null
      viewingQuest.value = null
    } else {
      gameStore.s.quests_started[0].step = currentStep + 1
      gameStore.s.quests_started[0].complete = false
    }
  }

  function updateQuestPanel(quest: Quest) {
    window.scrollTo(0, 0)
    viewingQuest.value = quest.id === viewingQuest.value?.id ? null : quest
  }

  function closeQuestPanel(quest: Quest) {
    if (gameStore.s.quests_started[0]?.quest_id === quest.id) {
      gameStore.s.quests_started = []
    }
    viewingQuest.value = null
  }

  return {
    currentQuest,
    viewingQuest,
    acceptQuest,
    completeQuestStep,
    updateQuestPanel,
    closeQuestPanel,
    canStartQuest: (quest: Quest) => checkQuestRequirements(quest, { value: gameStore.s }),
    canCompleteQuest: (quest: Quest) => canCompleteQuestFn(quest, { value: gameStore.s }),
    canCompleteQuestStep: (quest: Quest) => {
      if (!gameStore.s.quests_started[0]) return false
      return canCompleteQuestStepFn(quest, gameStore.s.quests_started[0].step, { value: gameStore.s })
    },
    isQuestStarted: (quest: Quest) =>
      !!gameStore.s.quests_started.find((q) => q.quest_id === quest.id),
    getCurrentQuestStep: () =>
      gameStore.s.quests_started.length ? gameStore.s.quests_started[0].step : null,
  }
})
