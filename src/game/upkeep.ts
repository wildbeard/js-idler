import type { GameState } from '../types'
import { upgrades as upgradeData } from '../data/upgrades'

export function getUpkeep(stateRef: { value: GameState }): { assistant: number; progress: number } {
  const totalLevel = stateRef.value.levels.mining + stateRef.value.levels.smithing
  const progress = Math.floor(
    totalLevel * Math.pow(1 + totalLevel / 100, 1.25) * 0.25 * 100,
  )
  const assistant = stateRef.value.assistants.reduce((u, a) => {
    return (u += Math.floor(
      Math.max(1, a.level) * stateRef.value.global_variables.base_assistant_upkeep +
        a.cost_per_action * Math.max(1, a.level) * 0.25,
    ))
  }, 0)

  const capitalismUpgrade = stateRef.value.upgrades.find((u) => u.id === 'capitalism')
  let capitalismRate = 0
  if (capitalismUpgrade) {
    const staticData = upgradeData.find((u) => u.id === 'capitalism')
    capitalismRate = staticData?.upgrades.find((u) => u.level === capitalismUpgrade.level)?.value ?? 0
  }

  return {
    assistant: Math.floor(assistant - assistant * capitalismRate),
    progress,
  }
}

export function taxManCometh(stateRef: { value: GameState }): void {
  const upkeep = getUpkeep(stateRef)
  stateRef.value.gold = Math.max(stateRef.value.gold - upkeep.assistant - upkeep.progress, 0)
}

export function getUpkeepDisplayTime(stateRef: { value: GameState }): string {
  const interval = stateRef.value.global_variables.upkeep_interval
  const timeframe = interval > 60000 ? 'minute' : 'second'
  const time =
    timeframe === 'minute' ? (interval / 1000 / 60).toFixed(1) : (interval / 1000).toFixed(2)
  return `${time} ${timeframe}(s)`
}
