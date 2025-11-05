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
    item_id: 'uncut_emerald',
    level: 1,
    value: 22,
    name: 'Uncut Emerald',
    success_chance: 1.0,
    xp_given: 0,
    sellable: true,
    categories: ['gem', 'uncut', 'rare'],
  },
  {
    item_id: 'iron_horseshoe',
    level: 10,
    value: 33,
    skill: 'smithing',
    name: 'Iron Horseshoe',
    success_chance: 1.0,
    xp_given: 45,
    categories: ['iron', 'quest_item'],
    ingredients: [
      {
        item_id: 'iron_bar',
        quantity: 3,
      },
    ],
  },
  {
    item_id: 'steel_horseshoe',
    level: 20,
    value: 147,
    skill: 'smithing',
    name: 'Steel Horseshoe',
    success_chance: 1.0,
    xp_given: 145,
    categories: ['steel', 'quest_item'],
    ingredients: [
      {
        item_id: 'steel_bar',
        quantity: 3,
      },
    ],
  },
  {
    item_id: 'copper_ore',
    level: 1,
    value: 1,
    skill: 'mining',
    name: 'Copper Ore',
    success_chance: 1.0,
    xp_given: 10,
    sellable: true,
    categories: ['ore', 'ores'],
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
    categories: ['ore', 'ores'],
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
    item_id: 'bronze_helmet',
    level: 3,
    value: 26,
    skill: 'smithing',
    name: 'Bronze Helmet',
    success_chance: 1.0,
    xp_given: 30,
    sellable: true,
    categories: ['bronze', 'armor'],
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
    categories: ['ores', 'ore'],
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
    categories: ['ore', 'ores'],
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
  {
    item_id: 'poison_necklace',
    level: 20,
    skill: 'smithing',
    name: 'Suspiciously Ornate Necklace',
    description:
      "Wow, this necklace is gorgeous but there's something off about it.",
    xp_given: 85,
    success_chance: 1.0,
    categories: ['jewlery', 'quest_item', 'necklace'],
    ingredients: [
      {
        item_id: 'silver_bar',
        quantity: 2,
      },
      {
        item_id: 'poisoned_betrayal',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'steel_pickaxe',
    level: 23,
    skill: 'smithing',
    name: 'Steel Pickaxe',
    description: 'A pickaxe made of steel.',
    success_chance: 1.0,
    xp_given: 146,
    categories: ['steel', 'tool', 'quest_item'],
    value: 152,
    ingredients: [
      {
        item_id: 'steel_bar',
        quantity: 3,
      },
    ],
  },
  {
    item_id: 'starmetal_bar_rough',
    level: 30,
    skill: 'smithing',
    name: 'Rough Starmetal Bar',
    description: 'A rudimentary starmetal alloy.',
    success_chance: 0.6,
    value: 75,
    categories: ['starmetal', 'bars'],
    xp_given: 135,
    ingredients: [
      {
        item_id: 'starmetal_ore',
        quantity: 1,
      },
      {
        item_id: 'coal',
        quantity: 3,
      },
    ],
  },
  {
    item_id: 'starmetal_bar',
    level: 34,
    skill: 'smithing',
    name: 'Starmetal Bar',
    description: 'A more refined starmetal alloy.',
    success_chance: 0.75,
    value: 175,
    categories: ['starmetal', 'bars'],
    xp_given: 188,
    ingredients: [
      {
        item_id: 'starmetal_bar_rough',
        quantity: 2,
      },
      {
        item_id: 'steel_bar',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'starmetal_sword',
    level: 34,
    skill: 'smithing',
    name: 'Starmetal Sword',
    description: 'A sword made of starmetal.',
    value: 350,
    categories: ['starmetal', 'sword', 'weapons'],
    xp_given: 345,
    ingredients: [
      {
        item_id: 'starmetal_bar',
        quantity: 2,
      },
    ],
  },
  {
    item_id: 'silver_ore',
    level: 20,
    skill: 'mining',
    name: 'Silver Ore',
    description: 'Unrefined silver ore.',
    xp_given: 40,
    success_chance: 1.0,
    value: 100,
    categories: ['ore', 'ores'],
  },
  {
    item_id: 'gold_ore',
    level: 30,
    skill: 'mining',
    name: 'Gold Ore',
    description: 'Precious',
    xp_given: 65,
    success_chance: 1.0,
    value: 121,
    categories: ['ore', 'ores'],
  },
  {
    item_id: 'gold_bar',
    level: 30,
    skill: 'smithing',
    name: 'Gold Bar',
    description: 'A lot heavier than it looks. Worth its weight in..?',
    xp_given: 65,
    value: 121,
    categories: ['bars', 'gold'],
    ingredients: [
      {
        item_id: 'gold_ore',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'silver_bar',
    level: 20,
    skill: 'smithing',
    name: 'Silver Bar',
    description: 'A bar of refined silver ore.',
    xp_given: 28,
    success_chance: 1.0,
    value: 100,
    categories: ['bars'],
    ingredients: [
      {
        item_id: 'silver_ore',
        quantity: 1,
      },
    ],
  },
  {
    item_id: 'wedding_band',
    level: 1,
    skill: 'none',
    name: 'Discarded Wedding Ring',
    description: '',
    xp_given: 0,
    value: 750,
    categories: ['jewlery', 'special', 'valuable', 'ring'],
  },
  {
    item_id: 'starmetal_ore',
    level: 30,
    skill: 'mining',
    name: 'Starmetal Ore',
    description: '',
    xp_given: 50,
    success_chance: 1.0,
    value: 85,
    categories: ['ore', 'ores'],
  },
];
