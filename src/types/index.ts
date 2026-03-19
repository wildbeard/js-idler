export type Skill = 'mining' | 'smithing'
export type SellMethod = 'all' | 'sell_x' | 'keep_x'
export type RewardCategory = 'money' | 'item' | 'experience' | 'assistant'
export type PerkAffects = 'xp' | 'selling' | 'yield' | 'interval'

export interface Ingredient {
  item_id: string
  quantity: number
}

export interface Item {
  item_id: string
  name: string
  description?: string
  skill?: string
  level: number
  value?: number
  xp_given: number
  success_chance?: number
  success_change?: number // typo exists in original data
  sellable?: boolean
  ingredients?: Ingredient[]
  categories: string[]
}

export interface UpgradeLevel {
  id?: string
  level: number
  cost: number
  value: number
  requirements: Partial<Record<string, number>>
}

export interface Autoer {
  id: string
  name: string
  description: string
  value_description?: string
  value: number
  cost: number
  skill: Skill
  affects: string
  category: 'autoer'
  upgrades: UpgradeLevel[]
  xp_upgrade_ref?: string
}

export interface Upgrade {
  id: string
  name: string
  description: string
  value_description?: string
  cost: number
  value: number
  affects: string
  category: string
  upgrades: UpgradeLevel[]
}

export interface QuestRequirements {
  stats?: Record<string, number>
  levels?: Partial<Record<string, number>>
  quests?: string[]
}

export interface QuestItemRequirement {
  item_id: string
  value: number
  consumed: boolean
}

export interface QuestAutoerRequirement {
  upgrade_id: string
  value: number
  consumed: boolean
}

export interface QuestStepRequirements {
  items?: QuestItemRequirement[]
  upgrades?: { upgrade_id: string; value: number; consumed: boolean }[]
  autoers?: QuestAutoerRequirement[]
}

export interface QuestStep {
  id: number
  name: string
  description: string
  requirements: QuestStepRequirements
}

export interface QuestReward {
  item_id: string
  category: RewardCategory
  affects: string
  value: number
}

export interface Quest {
  id: string
  name: string
  description: string
  requirements: QuestRequirements
  rewards: QuestReward[]
  steps: QuestStep[]
}

export interface ResourceNodeYield {
  item_id: string
  xp_given: number
  success_chance?: number
  success_change?: number // typo in original data
  quantity: number
  is_rare: boolean
}

export interface ResourceNode {
  id: string
  name: string
  description: string
  skill: Skill
  level_requirements: Partial<Record<string, number>>
  yields: ResourceNodeYield[]
}

export interface PerkData {
  id: string
  name: string
  description_template: string
  skills: string[]
  affects: PerkAffects
}

export interface Perk {
  id: string
  name: string
  description: string
  value: number
  skills: string[]
  affects: PerkAffects
}

export interface AssistantUpgradeLevel {
  level: number
  cost: number
  value: number
  requirements: Partial<Record<string, number>>
}

export interface AssistantSellConfig {
  item_id: string
  method: SellMethod
  value: number
}

export interface AssistantConfig {
  mining: string[]
  smithing: string[]
  selling: AssistantSellConfig[]
}

export interface Assistant {
  id: number | string
  name: string
  description?: string
  cost_per_action: number
  skills: string[]
  perk: Perk
  level: number
  interval_id: ReturnType<typeof setInterval> | null
  interval: number
  upgrades: AssistantUpgradeLevel[]
  config: AssistantConfig
}

export interface InventoryItem {
  item_id: string
  quantity: number
}

export interface StatEntry {
  item_id: string
  value: number
}

export interface Stats {
  lifetime_wealth: number
  sales: StatEntry[]
  crafts: StatEntry[]
  gathers: StatEntry[]
}

export interface GlobalVariables {
  max_assistants: number
  max_available_assistants: number
  assistant_refresh_rate: number
  upkeep_interval: number
  base_assistant_upkeep: number
  tax_rate: number
}

export interface XP extends Record<string, number> {
  mining: number
  mining_xp_level: number
  mining_next_level: number
  smithing: number
  smithing_xp_level: number
  smithing_next_level: number
}

export interface QuestStarted {
  quest_id: string
  step: number
  complete: boolean
}

// Plain serializable state — no functions
export interface GameState {
  version: string
  gold: number
  stats: Stats
  global_variables: GlobalVariables
  levels: Record<string, number>
  xp: XP
  purchased_autoers: PurchasedAutoer[]
  upgrades: PurchasedUpgrade[]
  inventory: InventoryItem[]
  running_autoers: Record<string, ReturnType<typeof setInterval> | null>
  running_upgrades: Record<string, unknown>
  quests_started: QuestStarted[]
  quests_completed: string[]
  assistants: Assistant[]
}

// Only the fields needed at runtime — static display data & upgrade definitions
// are always looked up from the data files.
export interface PurchasedAutoer {
  id: string
  unique_id: string
  level: number
}

export interface PurchasedUpgrade {
  id: string
  level: number
  value: number
  affects: string
  category: string
}
