/**
 * @typedef {object} ResourceNode
 *
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {'mining' | 'smithing'} skill
 * @property {{ mining: number }} level_requirements
 * @property {{
 *  item_id: string,
 *  quantity: number,
 *  xp_given: number,
 *  success_chance: number,
 *  is_rare: number,
 * }[]} yields
 */

/** @type {ResourceNode[]} */
window.resourceNodes = [
  {
    id: 'copper_deposit',
    name: 'Copper Deposit',
    description: 'A deposit of copper that will yield Copper Ore.',
    skill: 'mining',
    level_requirements: {
      mining: 1,
    },
    yields: [
      {
        item_id: 'copper_ore',
        xp_given: 10,
        success_chance: 1.0,
        quantity: 1,
        is_rare: false, // @TODO: Move to item?
      },
      {
        item_id: 'uncut_emerald',
        xp_given: 0,
        success_change: 0.02,
        quantity: 1,
        is_rare: true,
      },
    ],
  },
  {
    id: 'tin_deposit',
    name: 'Tin Deposit',
    description: 'A deposit of tin that will yield Tin Ore.',
    skill: 'mining',
    level_requirements: {
      mining: 1,
    },
    yields: [
      {
        item_id: 'tin_ore',
        xp_given: 10,
        success_chance: 1.0,
        quantity: 1,
        is_rare: false,
      },
      {
        item_id: 'uncut_emerald',
        xp_given: 0,
        success_change: 0.02,
        quantity: 1,
        is_rare: true,
      },
    ],
  },
  {
    id: 'iron_deposit',
    name: 'Iron Deposit',
    description: 'A deposit of iron that will yield Iron Ore.',
    skill: 'mining',
    level_requirements: {
      mining: 10,
    },
    yields: [
      {
        item_id: 'iron_ore',
        xp_given: 20,
        success_chance: 0.75,
        quantity: 1,
        is_rare: false,
      },
      {
        item_id: 'uncut_emerald',
        xp_given: 0,
        success_change: 0.04,
        quantity: 1,
        is_rare: true,
      },
    ],
  },
  {
    id: 'coal_deposit',
    name: 'Coal Deposit',
    description: 'A deposit of coal that will yield Coal.',
    skill: 'mining',
    level_requirements: {
      mining: 10,
    },
    yields: [
      {
        item_id: 'coal',
        xp_given: 20,
        success_chance: 1.0,
        quantity: 1,
        is_rare: false,
      },
    ],
  },
  {
    id: 'silver_deposit',
    name: 'Silver Deposit',
    skill: 'mining',
    description: 'A deposit of precious silver metal.',
    level_requirements: {
      mining: 20,
    },
    yields: [
      {
        item_id: 'silver_ore',
        xp_given: 24,
        success_chance: 1.0,
        quantity: 1,
        is_rare: false,
      },
    ],
  },
  {
    id: 'gold_deposit',
    name: 'Gold Deposit',
    skill: 'mining',
    description: '',
    level_requirements: {
      mining: 30,
    },
    yields: [
      {
        item_id: 'gold_ore',
        xp_given: 65,
        success_chance: 1.0,
        quantity: 1,
        is_rare: false,
      },
    ],
  },
  {
    id: 'starmetal_deposit',
    name: 'Starmetal Deposit',
    description: 'A deposit at the bottom of a crater with a slight shimmer.',
    skill: 'mining',
    level_requirements: {
      mining: 30,
    },
    yields: [
      {
        item_id: 'starmetal_ore',
        xp_given: 38,
        success_chance: 0.65,
        quantity: 1,
        is_rare: false,
      },
    ],
  },
];
