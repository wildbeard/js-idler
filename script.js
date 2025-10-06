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

/**
 * @typedef Quest
 * @type {object}
 *
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {{
 *  stats: State['stats'],
 *  levels: State['levels'],
 *  quests: string[],
 * }} requirements
 * @property {{
 *  item_id: string,
 *  category: ('money'|'item'|'experience')
 *  affects: string,
 *  value: number,
 * }[]} rewards
 * @property {{
 *  id: number,
 *  name: string,
 *  description: string,
 *  requirements: { items: { item_id: string, value: number }[] }
 * }[]} steps
 */

/**
 * @typedef Upgrade
 * @type {object}
 *
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} interval
 * @property {string} affects
 * @property {number} cost
 * @property {string} category
 * @property {{
 *  id: string,
 *  level: number,
 *  cost: number,
 *  value: number,
 *  requirements: {
 *    smithing: number,
 *    mining: number,
 * }
 * }[]} upgrades
 */

/**
 * @typedef PurchasedUpgrade
 * @type {object}
 *
 * @property {string} id
 * @property {number} level
 * @property {number} interval
 */

/**
 * @typedef State
 * @type {object}
 *
 * @property {number} gold
 * @property {{ lifetime_wealth: number }} stats
 * @property {{mining: number, smithing: number}} levels
 * @property {{mining: number, mining_next_leve: number; smithing_next_level: number, smithing: number}} xp
 * @property {PurchasedUpgrade[]} upgrades
 * @property {{item_id: string, quantity: number}[]} inventory
 * @property {{ quest_id: number, step: number, complete: bool, }[]} quests_started
 * @property {string[]} quests_completed
 */

(
  function () {
    /** @type Item[] */
    const items = [
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
        item_id: 'bronze_sword',
        level: 3,
        value: 24,
        skill: 'smithing',
        name: 'Bronze Sword',
        success_change: 1.0,
        xp_given: 10,
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
        ]
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
        ]
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
          }
        ]
      }
    ];
    /** @type  Upgrade[] */
    const allUpgrades = [
      {
        id: 'automine_copper',
        name: 'Copper Autominer',
        description: 'Automagically mines copper for you!',
        value: 2000,
        cost: 25,
        affects: 'copper_ore',
        category: 'autoer',
        upgrades: [
          {
            level: 0,
            cost: 25,
            value: 2000,
            requirements: {
              mining: 1,
            },
          },
          {
            level: 1,
            cost: 75,
            value: 1750,
            requirements: {
              mining: 2,
            },
          },
          {
            level: 2,
            cost: 125,
            value: 1500,
            requirements: {
              mining: 4,
            },
          },
          {
            level: 3,
            cost: 175,
            value: 1250,
            requirements: {
              mining: 6,
            },
          },
          {
            level: 4,
            cost: 225,
            value: 1000,
            requirements: {
              mining: 6,
            },
          },
        ],
        fn: () => userDidMine(items.find((i) => i.item_id === 'copper_ore')),
      },
      {
        id: 'automine_tin',
        name: 'Tin Autominer',
        description: 'Automagically mines tin for you!',
        value: 2000,
        cost: 25,
        affects: 'copper_tin',
        category: 'autoer',
        upgrades: [
          {
            level: 0,
            cost: 25,
            value: 2000,
            requirements: {
              mining: 1,
            },
          },
          {
            level: 1,
            cost: 75,
            value: 1750,
            requirements: {
              mining: 2,
            },
          },
          {
            level: 2,
            cost: 125,
            value: 1500,
            requirements: {
              mining: 4,
            },
          },
          {
            level: 3,
            cost: 175,
            value: 1250,
            requirements: {
              mining: 6,
            },
          },
          {
            level: 4,
            cost: 225,
            value: 1000,
            requirements: {
              mining: 6,
            },
          },
        ],
        fn: () => userDidMine(items.find((i) => i.item_id === 'tin_ore')),
      },
      {
        id: 'autosmelt_bronze',
        name: 'Bronze Autosmelter',
        description:
          "Imagine having an apprentice smelting bronze for you. It's just like that.",
        value: 2000,
        cost: 100,
        affects: 'bronze_bar',
        category: 'autoer',
        upgrades: [
          {
            level: 0,
            cost: 100,
            value: 2000,
            requirements: {
              smithing: 3,
            },
          },
          {
            level: 1,
            cost: 200,
            value: 1750,
            requirements: {
              smithing: 4,
            },
          },
          {
            level: 2,
            cost: 350,
            value: 1500,
            requirements: {
              smithing: 4,
            },
          },
          {
            level: 3,
            cost: 500,
            value: 1250,
            requirements: {
              smithing: 6,
            },
          },
          {
            level: 4,
            cost: 1000,
            value: 1000,
            requirements: {
              smithing: 6,
            },
          },
        ],
        fn: () => userDidSmith(items.find((i) => i.item_id === 'bronze_bar')),
      },
      {
        id: 'autoforge_bronze_sword',
        name: 'Bronze Sword Autohammer',
        description:
          "Remember your bronze bar apprentice? Well they're good enough to make swords now.",
        value: 2000,
        cost: 200,
        affects: 'bronze_sword',
        category: 'autoer',
        upgrades: [
          {
            level: 0,
            cost: 200,
            value: 2000,
            requirements: {
              smithing: 2,
            },
          },
          {
            level: 1,
            cost: 300,
            value: 1750,
            requirements: {
              smithing: 3,
            },
          },
          {
            level: 2,
            cost: 450,
            value: 1500,
            requirements: {
              smithing: 5,
            },
          },
          {
            level: 3,
            cost: 600,
            value: 1250,
            requirements: {
              smithing: 6,
            },
          },
          {
            level: 4,
            cost: 1200,
            value: 1000,
            requirements: {
              smithing: 6,
            },
          },
        ],
        fn: () => userDidSmith(items.find((i) => i.item_id === 'bronze_sword')),
      },
      {
        id: 'copper_mining_excess',
        name: 'Mining: Excess Copper',
        description: 'Lady luck is on your side but she prefers copper.',
        cost: 100,
        value: 0.1,
        affects: 'copper_ore',
        category: 'mining_excess',
        upgrades: [
          {
            level: 0,
            value: 0.1,
            cost: 200,
            requirements: {
              mining: 8,
            },
          },
          {
            id: 'copper_mining_excess',
            level: 1,
            value: 0.15,
            cost: 350,
            requirements: {
              mining: 9,
            },
          },
          {
            id: 'copper_mining_excess',
            level: 2,
            value: 0.25,
            cost: 450,
            requirements: {
              mining: 11,
            },
          },
          {
            id: 'copper_mining_excess',
            level: 3,
            value: 0.75,
            cost: 750,
            requirements: {
              mining: 13,
            },
          },
          {
            id: 'copper_mining_excess',
            level: 4,
            value: 1.0,
            cost: 1000,
            requirements: {
              mining: 15,
            },
          },
        ],
      },
      {
        id: 'tin_mining_excess',
        name: 'Mining: Excess Tin',
        description:
          'Lady luck is back, but this time she fancies tin. Or is it ten? Tin ten?',
        cost: 100,
        value: 0.1,
        affects: 'tin_ore',
        category: 'mining_excess',
        upgrades: [
          {
            level: 0,
            cost: 200,
            value: 0.1,
            requirements: {
              mining: 8,
            },
          },
          {
            id: 'tin_mining_excess',
            level: 1,
            value: 0.15,
            cost: 350,
            requirements: {
              mining: 9,
            },
          },
          {
            id: 'tin_mining_excess',
            level: 2,
            value: 0.25,
            cost: 450,
            requirements: {
              mining: 11,
            },
          },
          {
            id: 'tin_mining_excess',
            level: 3,
            value: 0.75,
            cost: 750,
            requirements: {
              mining: 13,
            },
          },
          {
            id: 'tin_mining_excess',
            level: 4,
            value: 1.0,
            cost: 1000,
            requirements: {
              mining: 15,
            },
          },
        ],
      },
      {
        id: 'bronze_sword_store',
        name: 'Shopfront: Bronze Weapon',
        description: "Automatically sells a random bronze weapon you've made.",
        cost: 250,
        affects: 'weapons',
        category: 'autoer',
        value: 2000,
        upgrades: [
          {
            level: 0,
            cost: 250,
            value: 2000,
            requirements: {
              smithing: 5,
            },
          },
          {
            level: 1,
            cost: 350,
            value: 1750,
            requirements: {
              smithing: 5,
            },
          },
          {
            level: 2,
            cost: 450,
            value: 1500,
            requirements: {
              smithing: 8,
            },
          },
          {
            level: 3,
            cost: 550,
            value: 1250,
            requirements: {
              smithing: 8,
            },
          },
          {
            level: 4,
            cost: 650,
            value: 1000,
            requirements: {
              smithing: 10,
            },
          },
          {
            level: 5,
            cost: 750,
            value: 750,
            requirements: {
              smithing: 10,
            },
          },
          {
            level: 6,
            cost: 850,
            value: 500,
            requirements: {
              smithing: 10,
            },
          },
        ],
        fn: () => {
          const availItems = items.filter(
            (i) =>
              i.categories.includes('weapons') &&
              i.categories.includes('bronze') &&
              getInventoryItem(i.item_id) > 0,
          );
          const rng = Math.floor(Math.random() * availItems.length);
          sellItem(availItems[rng]);
        },
      },
      {
        id: 'time_is_money',
        name: 'Time is Money',
        description: 'Increase gold gained from sales.',
        cost: 1000,
        affects: 'sales',
        value: 0.1,
        category: 'gold_bonus',
        upgrades: [
          {
            level: 0,
            cost: 1000,
            value: 0.1,
            requirements: {
              mining: 10,
              smithing: 10,
            },
          },
          {
            level: 1,
            cost: 2500,
            value: 0.15,
            requirements: {
              mining: 20,
              smithing: 20,
            },
          },
          {
            level: 2,
            cost: 2750,
            value: 0.25,
            requirements: {
              mining: 25,
              smithing: 25,
            },
          },
          {
            level: 3,
            cost: 3500,
            value: 0.35,
            requirements: {
              mining: 30,
              smithing: 30,
            },
          },
          {
            level: 4,
            cost: 4000,
            value: 0.45,
            requirements: {
              mining: 40,
              smithing: 40,
            },
          },
          {
            level: 5,
            cost: 4000,
            value: 0.6,
            requirements: {
              mining: 50,
              smithing: 50,
            },
          },
          {
            level: 6,
            cost: 4000,
            value: 0.8,
            requirements: {
              mining: 60,
              smithing: 60,
            },
          },
          {
            level: 7,
            cost: 4000,
            value: 1.0,
            requirements: {
              mining: 70,
              smithing: 70,
            },
          },
        ],
      },
      {
        id: 'money_is_time',
        name: 'Money is Time',
        description:
          'Increases rate of all auto miners, smelters, forges, and sellers.',
        cost: 1000,
        affects: 'rates',
        value: 0.1,
        category: 'autoer_speed',
        upgrades: [
          {
            level: 0,
            cost: 1000,
            value: 0.1,
            requirements: {
              mining: 10,
              smithing: 10,
            },
          },
          {
            level: 1,
            cost: 2500,
            value: 0.15,
            requirements: {
              mining: 20,
              smithing: 20,
            },
          },
          {
            level: 2,
            cost: 2750,
            value: 0.25,
            requirements: {
              mining: 25,
              smithing: 25,
            },
          },
          {
            level: 3,
            cost: 3500,
            value: 0.35,
            requirements: {
              mining: 30,
              smithing: 30,
            },
          },
          {
            level: 4,
            cost: 4000,
            value: 0.45,
            requirements: {
              mining: 40,
              smithing: 40,
            },
          },
          {
            level: 5,
            cost: 4000,
            value: 0.6,
            requirements: {
              mining: 50,
              smithing: 50,
            },
          },
          {
            level: 6,
            cost: 4000,
            value: 0.8,
            requirements: {
              mining: 60,
              smithing: 60,
            },
          },
          {
            level: 7,
            cost: 4000,
            value: 1.0,
            requirements: {
              mining: 70,
              smithing: 70,
            },
          },
        ],
      },
      {
        id: 'automine_iron',
        name: 'Iron Autominer',
        description: 'Automagically mines iron for you!',
        value: 2000,
        cost: 250,
        affects: 'iron_ore',
        category: 'autoer',
        upgrades: [
          {
            level: 0,
            cost: 250,
            value: 2000,
            requirements: {
              mining: 10,
            }
          },
          {
            level: 1,
            cost: 375,
            value: 1750,
            requirements: {
              mining: 12,
            }
          },
          {
            level: 2,
            cost: 500,
            value: 1500,
            requirements: {
              mining: 14,
            }
          },
          {
            level: 3,
            cost: 625,
            value: 1250,
            requirements: {
              mining: 16,
            }
          },
          {
            level: 4,
            cost: 750,
            value: 1000,
            requirements: {
              mining: 18,
            }
          },
          {
            level: 5,
            cost: 1000,
            value: 750,
            requirements: {
              mining: 20,
            }
          }
        ],
        fn: () => userDidMine(items.find((i) => i.item_id === 'iron_ore')),
      },
      {
        id: 'automine_coal',
        name: 'Coal Autominer',
        description: 'Automagically mines coal for you!',
        value: 2000,
        cost: 250,
        affects: 'coal',
        category: 'autoer',
        upgrades: [
          {
            level: 0,
            cost: 250,
            value: 2000,
            requirements: {
              mining: 10,
            }
          },
          {
            level: 1,
            cost: 375,
            value: 1750,
            requirements: {
              mining: 12,
            }
          },
          {
            level: 2,
            cost: 500,
            value: 1500,
            requirements: {
              mining: 14,
            }
          },
          {
            level: 3,
            cost: 625,
            value: 1250,
            requirements: {
              mining: 16,
            }
          },
          {
            level: 4,
            cost: 750,
            value: 1000,
            requirements: {
              mining: 18,
            }
          },
          {
            level: 5,
            cost: 1000,
            value: 750,
            requirements: {
              mining: 20,
            }
          }
        ],
        fn: () => userDidMine(items.find((i) => i.item_id == 'coal')),
      },
      {
        id: 'autosmelt_iron',
        name: 'Iron Autosmelter',
        description: 'It\'ll smelt those iron bars for ya!',
        value: 2000,
        cost: 250,
        affects: 'iron_bar',
        category: 'autoer',
        upgrades: [
          {
            level: 0,
            cost: 250,
            value: 2000,
            requirements: {
              smithing: 10,
            }
          },
          {
            level: 1,
            cost: 375,
            value: 1750,
            requirements: {
              smithing: 12,
            }
          },
          {
            level: 2,
            cost: 500,
            value: 1500,
            requirements: {
              smithing: 14,
            }
          },
          {
            level: 3,
            cost: 625,
            value: 1250,
            requirements: {
              smithing: 16,
            }
          },
          {
            level: 4,
            cost: 750,
            value: 1000,
            requirements: {
              smithing: 18,
            }
          },
          {
            level: 5,
            cost: 1000,
            value: 750,
            requirements: {
              smithing: 20,
            }
          }
        ],
        fn: () => userDidSmith(items.find((i) => i.item_id == 'iron_bar')),
      },
      {
        id: 'autosmelt_steel',
        name: 'Steel Autosmelter',
        description: 'It\'ll smelt those steel bars for ya!',
        value: 2000,
        cost: 500,
        affects: 'steel_bar',
        category: 'autoer',
        upgrades: [
          {
            level: 0,
            cost: 500,
            value: 2000,
            requirements: {
              smithing: 20,
            }
          },
          {
            level: 1,
            cost: 750,
            value: 1750,
            requirements: {
              smithing: 22,
            }
          },
          {
            level: 2,
            cost: 1000,
            value: 1500,
            requirements: {
              smithing: 24,
            }
          },
          {
            level: 3,
            cost: 1250,
            value: 1250,
            requirements: {
              smithing: 26,
            }
          },
          {
            level: 4,
            cost: 1350,
            value: 1000,
            requirements: {
              smithing: 28,
            }
          },
          {
            level: 5,
            cost: 1750,
            value: 750,
            requirements: {
              smithing: 30,
            }
          }
        ],
        fn: () => userDidSmith(items.find((i) => i.item_id == 'steel_bar')),
      }
    ];

    /** @type {Quest[]} */
    const quests = [
      {
        id: 'test',
        name: 'Test Quest',
        description: 'Description',
        requirements: {
          stats: {
            lifetime_wealth: 0,
          },
          levels: {
            mining: 1,
            smithing: 1,
          },
          quests: [],
        },
        rewards: [
          {
            item_id: 'money',
            category: 'money',
            affects: 'gold',
            value: 250,
          },
          {
            item_id: 'exp',
            category: 'experience',
            affects: 'mining',
            value: 250,
          },
          {
            item_id: 'exp',
            category: 'experience',
            affects: 'smithing',
            value: 250,
          },
        ],
        steps: [
          {
            id: 0,
            name: 'Do the thing',
            description: 'I need to deliver 10 bronze bars.',
            requirements: {
              items: [{ item_id: 'bronze_bar', value: 10 }],
            },
          },
        ],
      },
      {
        id: 'test_two',
        name: 'Test Quest but Harder',
        description: 'Description',
        requirements: {
          stats: {
            lifetime_wealth: 0,
          },
          levels: {
            mining: 10,
            smithing: 10,
          },
          quests: ['test'],
        },
        rewards: [
          {
            item_id: 'money',
            category: 'money',
            affects: 'gold',
            value: 375,
          },
          {
            item_id: 'exp',
            category: 'experience',
            affects: 'mining',
            value: 500,
          },
          {
            item_id: 'exp',
            category: 'experience',
            affects: 'smithing',
            value: 500,
          },
        ],
        steps: [
          {
            id: 0,
            name: 'Iron Bars',
            description:
              'The bum down the street wants 10 iron bars. Go figured.',
            requirements: {
              items: [{ item_id: 'iron_bar', value: 10 }],
            },
          },
          {
            id: 1,
            name: 'Steel Bars',
            description:
              "Well wouldn't ya know it? That damn bum wants 15 steel bars now. What's up with this guy?",
            requirements: {
              items: [{ item_id: 'steel_bar', value: 15 }],
            },
          },
        ],
      },
    ];

    /** @type {State} */
    const state = {
      // @TODO: Shit like total bronze swords sold (count + value)
      stats: {
        lifetime_wealth: 500,
      },
      gold: 500,
      levels: {
        mining: 1,
        smithing: 1,
      },
      xp: {
        mining: 0,
        mining_xp_level: 0,
        mining_next_level: 83,
        smithing_xp_level: 0,
        smithing: 0,
        smithing_next_level: 83,
      },
      upgrades: [],
      inventory: [
        {
          item_id: 'copper_ore',
          quantity: 0,
        },
        {
          item_id: 'tin_ore',
          quantity: 0,
        },
        {
          item_id: 'bronze_bar',
          quantity: 10,
        },
      ],
      running_upgrades: {},
      quests_started: [],
      quests_completed: [],
    };

    /**
     * @param {Item} item
     *
     * @returns {bool}
     */
    const hasIngredientsFor = (item) => {
      const ingredients = item.ingredients;
      let hasIngredients = true;

      ingredients.forEach((ingredient) => {
        const item = state.inventory.find(
          (i) => i.item_id === ingredient.item_id,
        );

        if (!item || item.quantity < ingredient.quantity) {
          hasIngredients = false;
          return;
        }
      });

      return hasIngredients;
    };

    /**
     * @param {number} level
     *
     * @returns {number}
     */
    const getXpForLevel = (level) => {
      return Math.floor((level + 300 * Math.pow(2, level / 7)) / 4);
    };

    /**
     * @param {string} key
     * @param {number} value
     */
    const updateXp = (key, value) => {
      const nxtLvlKey = `${key}_next_level`;
      state.xp[key] += value;
      state.xp[`${key}_xp_level`] += value;

      let currXp = state.xp[key];

      while (currXp >= state.xp[nxtLvlKey]) {
        state.levels[key] += 1;
        state.xp[`${key}_xp_level`] = Math.abs(
          state.xp[nxtLvlKey] - state.xp[key],
        );
        state.xp[nxtLvlKey] += getXpForLevel(state.levels[key] + 1);
      }
    };

    /**
     * @param {Item} item
     *
     * @returns {number}
     */
    const mine = (item) => {
      const baseSuccess = item.success_chance;
      const rng = Math.random();
      const bonusYieldChance = state.upgrades
        .filter((u) => u.affects === item.id && u.category === 'mining_excess')
        .reduce((total, curr) => (total += curr.value), 0);
      const yield = rng < bonusYieldChance ? 2 : 1;
      const currLvl = state.levels.mining;

      if (baseSuccess === 1.0 || currLvl >= item.level * 2) {
        return yield;
      }

      return rng < baseSuccess + (currLvl / (item.level * 2)) ? yield : 0;
    };

    /**
     * @param {Item} item
     */
    const userDidMine = (item) => {
      const gathered = mine(item);

      if (gathered > 0) {
        updateXp('mining', item.xp_given);
        updateInventory(item.item_id, gathered);
      } else {
        // @TODO: Add some visual logs for the user!
      }

      render();
    };

    /**
     * @param {Item} item
     *
     * @returns {{ success: bool, result: {item_id: string, quantity: number}[]}}
     */
    const smith = (item) => {
      // @TODO: Do some fancy maths to get % chance success
      const result = {
        success: true,
        result: [{ item_id: item.item_id, quantity: 1 }],
      };

      item.ingredients.forEach((ing) =>
        result.result.push({
          item_id: ing.item_id,
          quantity: ing.quantity * -1,
        }),
      );

      return result;
    };

    /**
     * @param {object} item
     */
    const userDidSmith = (item) => {
      if (!hasIngredientsFor(item)) {
        return;
      }

      const result = smith(item);

      if (result.success) {
        updateXp('smithing', item.xp_given);
      }

      result.result.forEach((invUpdate) =>
        updateInventory(invUpdate.item_id, invUpdate.quantity),
      );
      render();
    };

    /**
     * @param {Upgrade} upgrade
     * @param {{ id: string, const: number, level: number, value: number }} upgraded
     */
    const upgradeAutoer = (upgrade, upgraded) => {
      if (state.running_upgrades[upgrade.id]) {
        upgrade.fn();
        clearInterval(state.running_upgrades[upgrade.id]);
      }

      state.running_upgrades[upgrade.id] = setInterval(() => {
        upgrade.fn();
      }, upgraded.value);
    };

    /**
     * @TODO Might be good to make Upgrades an object that
     * has some of these functions on them. :)
     *
     * @param {Upgrade} upgrade
     * @param {number} level
     */
    const upgrade = (upgrade, level) => {
      let up;

      if (level === 0) {
        up = {
          id: upgrade.id,
          level: 0,
          cost: upgrade.cost,
          value: upgrade.value,
        };
      } else {
        up = upgrade.upgrades.find((u) => u.level === level);
      }

      if (!up) {
        console.log('no upgrade found');
        return;
      }

      if (upgrade.category === 'autoer') {
        upgradeAutoer(upgrade, up);
      } else if (upgrade.id === 'money_is_time') {
        // @TODO: Finish all running autoers + update their intervals
        // Also create a function to do this rather than repeating code
      }

      if (!state.upgrades.find((u) => u.id === upgrade.id)) {
        state.upgrades.push({
          id: upgrade.id,
          cost: up.cost,
          level: level,
          value: up.value,
          category: upgrade.category,
        });
      }

      const currIdx = state.upgrades.findIndex((u) => u.id === upgrade.id);
      state.upgrades[currIdx] = {
        id: upgrade.id,
        cost: up.cost,
        level: up.level,
        value:
          level !== 0 && upgrade.category !== 'autoer'
            ? up.value + state.upgrades[currIdx].value
            : up.value,
        category: upgrade.category,
      };
    };

    /**
     * @param {Upgrade} upgrade
     *
     * @returns {number}
     */
    const getUpgradeCost = (upgrade) => {
      const currUpgrade = state.upgrades.find((u) => u.id === upgrade.id);

      if (!currUpgrade) {
        return upgrade.cost;
      }

      const currPurchased = upgrade.upgrades.find(
        (u) => u.level === currUpgrade.level,
      );
      const cost = upgrade.upgrades.find(
        (u) => u.level === currUpgrade.level + 1,
      );
      return cost?.cost ?? currPurchased.cost;
    };

    /**
     * @param {Upgrade} toUpgrade
     */
    const userPurchasedUpgrade = (toUpgrade) => {
      // @TODO: Find the upgrade level to purchase
      const currUpgrade = state.upgrades.find((u) => u.id === toUpgrade.id);
      let cost = currUpgrade ? getUpgradeCost(toUpgrade) : toUpgrade.cost;

      if (currUpgrade) {
        upgrade(toUpgrade, currUpgrade.level + 1);
      } else {
        upgrade(toUpgrade, 0);
      }

      state.gold -= cost;

      render();
    };

    /**
     * @param {string} key
     * @param {number} value
     */
    const updateInventory = (key, value) => {
      let idx = state.inventory.findIndex((i) => i.item_id === key);

      if (idx === -1) {
        state.inventory.push({ item_id: key, quantity: value });
        idx = state.inventory.length - 1;
      }

      state.inventory[idx].quantity += value;
    };

    /**
     * @param {Item} item
     */
    const sellItem = (item) => {
      const bonusUpgrade = state.upgrades.find(
        (u) => u.category === 'gold_bonus',
      );
      let gold = item.value;

      if (bonusUpgrade) {
        // Round up cuz we're nice
        gold += Math.ceil(gold * bonusUpgrade.value);
      }

      state.gold += gold;
      state.stats.lifetime_wealth += gold;
    };

    const userDidSell = (item) => {
      sellItem(item);
      updateInventory(item.item_id, -1);
      render();
    };

    /**
     * @param {string} key
     *
     * @returns {number}
     */
    const getInventoryItem = (key) => {
      return state.inventory.find((i) => i.item_id === key)?.quantity ?? 0;
    };

    const renderInventory = () => {
      const parent = document.querySelector('.inventory');
      // hehexdd
      parent.innerHTML = '';

      const goldLi = document.createElement('li');
      goldLi.textContent = `Gold: ${state.gold}`;
      parent.appendChild(goldLi);

      for (const invItem of state.inventory) {
        const item = items.find((i) => i.item_id === invItem.item_id);

        if (!item || invItem.level > state.levels[invItem.skill]) {
          continue;
        }

        const li = document.createElement('li');
        li.textContent = `${item.name}: ${invItem.quantity}`;
        parent.appendChild(li);
      }
    };

    // Currently acting as our entire renderer
    const render = () => {
      console.log(state);
      renderLevels();
      renderInventory();
      renderMineButtons();
      renderSmithingButtons();
      renderAvailableUpgrades();
      renderAvailableQuests();

      // And this is where this render system starts to break down :)
      if (state.quests_started.length) {
        const quest = quests.find(
          (q) => q.id === state.quests_started[0].quest_id,
        );
        renderCurrentQuest(quest);
      }
    };

    const renderLevels = () => {
      const parent = document.querySelector('.levels');
      parent.innerHTML = null;

      for (const key in state.levels) {
        const li = document.createElement('li');
        const progBar = document.createElement('progress');
        const curr = state.xp[`${key}_xp_level`];
        const needed = getXpForLevel(state.levels[key]);

        progBar.value = Math.floor((curr / needed) * 100);
        progBar.max = 100;

        li.innerHTML = `${key} (${state.levels[key]})<br>`;
        li.appendChild(progBar);
        parent.appendChild(li);
      }
    };

    const renderMineButtons = () => {
      const parent = document.querySelector('.ore-list');
      parent.innerHTML = null;

      for (const item of items) {
        if (item.skill !== 'mining' || state.levels.mining < item.level) {
          continue;
        }

        const li = document.createElement('li');
        li.append(...createItemActionButtons(item));
        parent.appendChild(li);
      }
    };

    const renderSmithingButtons = () => {
      const parent = document.querySelector('.smithing-list');
      parent.innerHTML = null;

      // @TODO: Do we just want to create a category system rather than iterating
      // over _every_ item?
      for (const item of items) {
        if (item.skill !== 'smithing' || state.levels.smithing < item.level) {
          continue;
        }

        const li = document.createElement('li');
        li.append(...createItemActionButtons(item));
        parent.appendChild(li);
      }
    };

    /**
     * @param {Upgrade} upgrade
     *
     * @returns {bool}
     */
    const hasRequirementsForUpgrade = (upgrade) => {
      const currLevel =
        state.upgrades.find((u) => u.id === upgrade.id)?.level ?? 0;
      const nextLevel = upgrade.upgrades.find(
        (u) => u.level === (currLevel === 0 ? 0 : currLevel + 1),
      );

      if (!nextLevel) {
        return false;
      }

      for (const reqKey in nextLevel.requirements) {
        if (nextLevel.requirements[reqKey] > state.levels[reqKey]) {
          return false;
        }
      }

      return true;
    };

    /**
     * @param {Upgrade} upgrade
     *
     * @returns {bool}
     */
    const canUpgradeUpgrade = (upgrade) => {
      const currLevel =
        state.upgrades.find((u) => u.id === upgrade.id)?.level ?? 0;
      const nextLevel = upgrade.upgrades.find(
        (u) => u.level === (currLevel === 0 ? 0 : currLevel + 1),
      );

      if (!nextLevel || nextLevel.cost > state.gold) {
        return false;
      }

      return hasRequirementsForUpgrade(upgrade);
    };

    const renderAvailableUpgrades = () => {
      const parent = document.querySelector('.available-upgrades');
      parent.innerHTML = null;

      for (const upgrade of allUpgrades.filter((u) =>
        hasRequirementsForUpgrade(u),
      )) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        const currUpgrade = state.upgrades.find((u) => u.id === upgrade.id);
        const maxUpgrade = allUpgrades
          .find((u) => u.id === upgrade.id)
          .upgrades.sort((a, b) => a.level <= b.level)[0];
        let btnText = upgrade.name;
        let cost = upgrade.cost;

        if (currUpgrade && currUpgrade.level === maxUpgrade.level) {
          btnText += ' | Max Level';
        } else {
          cost = getUpgradeCost(upgrade);
          btnText += ` | ${cost}gp`;
        }

        btn.innerText = btnText;
        btn.title = upgrade.description ?? 'An upgrade';
        btn.onclick = () => userPurchasedUpgrade(upgrade);

        // @TODO: We also need to check if they've maxxed out the upgrade
        if (!canUpgradeUpgrade(upgrade)) {
          btn.setAttribute('disabled', true);
        }

        li.appendChild(btn);
        parent.appendChild(li);
      }
    };

    /**
     * @param {Item} item
     */
    const createItemActionButtons = (item) => {
      const actionBtn = document.createElement('button');
      const sellBtn = document.createElement('button');

      sellBtn.innerText = '$';
      sellBtn.onclick = () => userDidSell(item);

      if (getInventoryItem(item.item_id) <= 0) {
        sellBtn.setAttribute('disabled', true);
      }

      actionBtn.innerText = item.name;

      if (item.skill === 'smithing') {
        actionBtn.onclick = () => userDidSmith(item);

        if (!hasIngredientsFor(item)) {
          actionBtn.setAttribute('disabled', true);
        }
      } else if (item.skill === 'mining') {
        actionBtn.onclick = () => userDidMine(item);
      }

      return [actionBtn, sellBtn];
    };

    /**
     * @param {Quest} quest
     * @param {State} state
     *
     * @returns {bool}
     */
    const checkQuestRequirements = (quest, state) => {
      let hasRequirements = true;

      for (const key in quest.requirements) {
        if (key === 'stats') {
          // @TODO: Maybe we don't care about this
          continue;
        } else if (key === 'levels') {
          for (const lKey in state.levels) {
            if (quest.requirements.levels[lKey] > state.levels[lKey]) {
              return false;
            }
          }
        } else if (key === 'quests') {
          const requiredQuests = quest.requirements.quests;

          if (requiredQuests.length !== 0) {
            hasRequirements =
              requiredQuests.filter((q) => state.quests_completed.includes(q))
                .length === requiredQuests.length;

            if (!hasRequirements) {
              return false;
            }
          }
        }
      }

      return hasRequirements;
    };

    /**
     * @param {Quest} quest
     */
    const canCompleteQuest = (quest) => {
      const currStep = state.quests_started.find(
        (q) => q.quest_id === quest.id,
      );

      if (!currStep) {
        return false;
      }

      return (
        quest.steps[quest.steps.length - 1].id === currStep.step &&
        currStep.complete
      );
    };

    /**
     * @param {Quest} quest
     * @param {number} step
     *
     * @returns {bool}
     */
    const canCompleteQuestStep = (quest, step) => {
      // I mean technically, we can just do quest.steps[step]; :)
      const questStep = quest.steps.find((s) => s.id === step);

      if (!questStep) {
        console.log('no quest step');
        return false;
      }

      if (
        questStep.requirements.items.filter(
          (i) => getInventoryItem(i.item_id) < i.value,
        ).length
      ) {
        console.log('do not meet item reqs');
        return false;
      }

      return true;
    };

    /**
     * @param {Quest} quest
     * @param {number} step
     */
    const completeQuestStep = (quest, step) => {
      console.log(quest.id, step);
      if (!canCompleteQuestStep(quest, step)) {
        return;
      }

      const idx = state.quests_started.findIndex((q) => q.quest_id);

      if (idx === -1) {
        console.log(`unable to find ${quest.id}`);
        return;
      }

      const currStep = quest.steps.find((s) => s.id === step);
      state.quests_started[idx].complete = true;

      for (const qItemReq of currStep.requirements.items) {
        updateInventory(qItemReq.item_id, qItemReq.value * -1);
      }

      const hasMoreSteps = quest.steps.find((s) => s.id === step + 1);

      if (!!!hasMoreSteps) {
        completeQuest(quest);
      } else {
        state.quests_started[idx].step = step + 1;
        renderCurrentQuest(quest);
      }

      // Technically a double render from the above else
      render();
    };

    /**
     * @param {Quest} quest
     */
    const populateQuestBox = (quest) => {
      const parent = document.querySelector('.quest-panel');

      parent.querySelector('.quest-title').innerText = `Title: ${quest.name}`;
      parent.querySelector('.quest-desc').innerText =
        `Description: ${quest.description}`;

      for (const key in quest.requirements) {
        if (key === 'levels') {
          const levelReqs = document.querySelector('.level-reqs');
          levelReqs.innerHTML = null;
          parent.querySelector('.quest-level-requirements').style.display =
            Object.keys(quest.requirements.levels).length ? null : 'none';

          for (const lKey in quest.requirements.levels) {
            const li = document.createElement('li');
            const span = document.createElement('span');

            span.innerText = `${lKey}: ${quest.requirements.levels[lKey]}`;
            span.style.color =
              state.levels[lKey] < quest.requirements.levels[lKey]
                ? 'red'
                : 'green';

            li.append(span);
            levelReqs.append(li);
          }
        } else if (key === 'quests') {
          const questReqs = document.querySelector('.quest-reqs');
          questReqs.innerHTML = null;
          parent.querySelector('.quest-quest-requirements').style.display =
            quest.requirements.quests.length ? null : 'none';

          for (const qKey of quest.requirements.quests) {
            const li = document.createElement('li');
            const span = document.createElement('span');

            span.innerText = quests.find((q) => q.id === qKey)?.name;
            span.style.color = state.quests_completed.includes(qKey)
              ? 'green'
              : 'red';

            li.append(span);
            questReqs.append(li);
          }
        }
      }

      const rewardsParent = parent.querySelector('.quest-rewards');
      rewardsParent.innerHTML = null;

      for (const reward of quest.rewards) {
        const li = document.createElement('li');

        if (reward.category === 'experience') {
          li.innerText = `${reward.value} ${reward.affects} xp`;
        } else if (reward.category === 'item') {
          const item = items.find((i) => i.item_id === reward.item_id);

          if (!item) {
            continue;
          }

          li.innerText = `${reward.value} ${item.name}`;
        } else if (reward.category === 'money') {
          li.innerText = `${reward.value} gold`;
        }

        rewardsParent.append(li);
      }

      // Buttons
      const startBtn = parent.querySelector('.start-quest');
      const completeBtn = parent.querySelector('.complete-quest');
      // Ugh, reset because manual state management is a bitch
      completeBtn.style.display = null;
      startBtn.style.display = null;

      if (!state.quests_started.find((q) => q.quest_id === quest.id)) {
        completeBtn.style.display = 'none';
      } else {
        startBtn.style.display = 'none';
      }

      startBtn.onclick = () => startQuest(quest);
      completeBtn.onclick = () => completeQuest(quest);

      if (!checkQuestRequirements(quest, state)) {
        startBtn.setAttribute('disabled', true);
      } else {
        startBtn.removeAttribute('disabled');
      }

      parent.style.display = null;
    };

    /**
     * @param {Quest} quest
     */
    const renderCurrentQuest = (quest) => {
      const parent = document.querySelector('.current-quest');
      const currentQuest = state.quests_started.find(
        (q) => q.quest_id === quest.id,
      );
      const steps = quest.steps.filter((s) => s.id <= currentQuest.step);
      const stepList = parent.querySelector('.quest-steps');
      stepList.innerHTML = null;

      parent.querySelector('.quest-title').innerText = quest.name;

      for (const step of steps) {
        const li = document.createElement('li');
        li.innerText = step.description;

        if (step.id < currentQuest.step) {
          li.style.textDecoration = 'line-through';
        }

        stepList.append(li);
      }

      const stepBtn = parent.querySelector('.complete-step');
      stepBtn.removeAttribute('disabled');
      stepBtn.onclick = () => completeQuestStep(quest, currentQuest.step);

      if (!canCompleteQuestStep(quest, currentQuest.step)) {
        stepBtn.setAttribute('disabled', true);
      } else {
        stepBtn.removeAttribute('disabled');
      }

      parent.style.display = null;
    };

    /**
     * @param {Quest} quest
     *
     * @returns {bool}
     */
    const startQuest = (quest) => {
      if (state.quests_started.length) {
        console.log('cannot start quest. one is already in progress');
        return false;
      }

      state.quests_started.push({
        quest_id: quest.id,
        step: quest.steps[0].id,
        complete: false,
      });

      renderCurrentQuest(quest);
      populateQuestBox(quest);
      return true;
    };

    /**
     * @param {Quest} quest
     */
    const completeQuest = (quest) => {
      if (!canCompleteQuest(quest)) {
        console.log(`unable to complete quest #${quest.id} - ${quest.name}`);
        return;
      }

      state.quests_started = state.quests_started.filter(
        (q) => q.quest_id !== quest.id,
      );
      state.quests_completed.push(quest.id);
      document.querySelector('.current-quest').style.display = 'none';

      for (const reward of quest.rewards) {
        switch (reward.category) {
          case 'experience':
            updateXp(reward.affects, reward.value);
            break;
          case 'item':
            updateInventory(reward.item_id, reward.value);
            break;
          case 'money':
            state.gold += reward.value;
            state.stats.lifetime_wealth += reward.value;
            break;
          default:
            console.log('unknown reward category', reward);
        }
      }

      document.querySelector('.quest-panel').style.display = 'none';
      document.querySelector('.current-quest').style.display = 'none';

      // Ugh
      render();
    };

    const renderAvailableQuests = () => {
      const parent = document.querySelector('.available-quests');
      const available = quests.filter(
        (q) => !state.quests_completed.includes(q.id),
      );
      // hehexd
      parent.innerHTML = null;

      available.forEach((q) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const reqMet = checkQuestRequirements(q, state);

        span.innerText = q.name;
        span.style.color = reqMet ? 'black' : 'red';
        li.onclick = () => populateQuestBox(q);

        li.append(span);
        parent.appendChild(li);
      });
    };

    render();
  }
)();
