/**
 * @typedef Item
 * @type {object}
 *
 * @property {string} item_id
 * @property {string} name
 * @property {string} description
 * @property {string} skill
 * @property {number} level
 * @property {number} value
 * @property {number} xp_given
 * @property {number} success_chance
 * @property {boolean} sellable
 * @property {{item_id: string, quantity: number}[]?} ingredients
 * @property {string[]} categories
 */

/** @type {Item[]} */
window.items = [
  {
    item_id: 'copper_ore',
    level: 1,
    value: 1,
    skill: 'mining',
    name: 'Copper Ore',
    success_chance: 1.0,
    xp_given: 10,
    sellable: true,
    categories: ['ore'],
  },
  {
    item_id: 'tin_ore',
    level: 1,
    value: 1,
    skill: 'mining',
    name: 'Tin Ore',
    success_chance: 1.0,
    xp_given: 10,
    sellable: true,
    categories: ['ore'],
  },
  {
    item_id: 'bronze_bar',
    level: 1,
    value: 3,
    skill: 'smithing',
    name: 'Bronze Bar',
    success_chance: 1.0,
    xp_given: 10,
    sellable: true,
    categories: ['bars'],
    ingredients: [
      {
        item_id: 'copper_ore',
        quantity: 1,
      },
      {
        item_id: 'tin_ore',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'bronze_dagger',
    level: 1,
    value: 8,
    name: 'Bronze Dagger',
    skill: 'smithing',
    success_chance: 1.0,
    xp_given: 8,
    categories: ['daggers', 'weapons', 'bronze'],
    ingredients: [
      {
        item_id: 'bronze_bar',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'bronze_sword',
    level: 3,
    value: 24,
    skill: 'smithing',
    name: 'Bronze Sword',
    success_change: 1.0,
    xp_given: 12,
    sellable: true,
    categories: ['swords', 'weapons', 'bronze'],
    ingredients: [
      {
        item_id: 'bronze_bar',
        quantity: 3,
      },
    ],
  },
  {
    item_id: 'bronze_mace',
    level: 3,
    value: 24,
    skill: 'smithing',
    name: 'Bronze Mace',
    success_change: 1.0,
    xp_given: 10,
    sellable: true,
    categories: ['maces', 'weapons', 'bronze'],
    ingredients: [
      {
        item_id: 'bronze_bar',
        quantity: 3,
      },
    ],
  },
  {
    item_id: 'iron_ore',
    level: 10,
    value: 12,
    skill: 'mining',
    name: 'Iron Ore',
    xp_given: 20,
    success_chance: 0.75,
    categories: ['ores'],
  },
  {
    item_id: 'iron_bar',
    level: 10,
    value: 15,
    skill: 'smithing',
    name: 'Iron Bar',
    success_chance: 0.65,
    xp_given: 15,
    categories: ['iron', 'bars'],
    ingredients: [
      {
        item_id: 'iron_ore',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'iron_sword',
    level: 12,
    value: 68,
    skill: 'smithing',
    name: 'Iron Sword',
    description: 'A sword made of iron.',
    success_chance: 1.0,
    xp_given: 45,
    categories: ['iron', 'swords'],
    ingredients: [
      {
        item_id: 'iron_bar',
        quantity: 3,
      },
    ],
  },
  {
    item_id: 'iron_chain_vest',
    level: 14,
    value: 78,
    skill: 'smithing',
    name: 'Iron Chain Vest',
    description:
      'If you like it, you should put a ring on it. Or several thousand.',
    success_chance: 1.0,
    xp_given: 60,
    categories: ['iron', 'armor'],
    ingredients: [
      {
        item_id: 'iron_bar',
        quantity: 4,
      },
    ],
  },
  {
    item_id: 'coal',
    level: 10,
    value: 8,
    skill: 'mining',
    name: 'Coal',
    description: 'A lump-o-coal',
    success_chance: 1.0,
    xp_given: 20,
    categories: ['ore'],
  },
  {
    item_id: 'steel_bar',
    level: 20,
    skill: 'smithing',
    name: 'Steel Bar',
    description: "It's like iron but better.",
    success_chance: 1.0,
    xp_given: 45,
    value: 40,
    categories: ['steel', 'bars'],
    ingredients: [
      {
        item_id: 'iron_ore',
        quantity: 2,
      },
      {
        item_id: 'coal',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'steel_dagger',
    level: 20,
    skill: 'smithing',
    name: 'Steel Dagger',
    description: 'A dagger made of steel.',
    success_chance: 1.0,
    xp_given: 48,
    categories: ['steel', 'weapons', 'dagger'],
    value: 48,
    ingredients: [
      {
        item_id: 'steel_bar',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'steel_sword',
    level: 22,
    skill: 'smithing',
    name: 'Steel Sword',
    description: 'A sword made of steel.',
    success_chance: 1.0,
    xp_given: 96,
    categories: ['steel', 'weapons', 'swords'],
    value: 102,
    ingredients: [
      {
        item_id: 'steel_bar',
        quantity: 2,
      },
    ],
  },
  {
    item_id: 'steel_helmet',
    level: 23,
    skill: 'smithing',
    name: 'Steel Helmet',
    description: 'A helmet made of steel.',
    success_chance: 1.0,
    xp_given: 144,
    categories: ['armor', 'steel', 'helmet'],
    value: 156,
    ingredients: [
      {
        item_id: 'steel_bar',
        quantity: 4,
      },
    ],
  },
];
