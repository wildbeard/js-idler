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
 * @typedef Assistant
 * @type {object}
 * 
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string[]} skills
 * @property {{
*   skill: 'mining' | 'smithing' | 'selling',
*   affects: 'xp' | 'yield' | 'interval',
*   value: number,
*   name: string,
*   description: string,
 * }} perk
 * @property {{
 *  level: number,
 *  cost: number,
 *  value: number,
 *  requirements: {
 *    mining: number?,
 *    smithing: number?,
 *  }
 * }[]} upgrades
 * @property {function} fn
 */

/**
 * @TODO Figure out why this doesn't work
 * @typedef PurchasedAssistant
 * @extends Assistant
 *
 * @property {number} level 
 * @property {number} interval_id
 * @property {number} interval
 * @property {{
 *  mining: string[],
 *  smithing: string[],
 *  selling: string[],
 * }} config
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
 * @property {{ 
 *  lifetime_wealth: number,
 *  crafts: { item_id: string, value: number }[],
 *  sales: { item_id: string, value: number }[],
 *  gathers: { item_id: string, value: number }[],
 * }} stats
 * @property {{
 *  max_assistants: number,
 *  max_available_assistants: number,
 *  assistant_refresh_rate: number,
 * }} global_variables
 * @property {{mining: number, smithing: number}} levels
 * @property {{mining: number, mining_next_leve: number; smithing_next_level: number, smithing: number}} xp
 * @property {PurchasedUpgrade[]} upgrades
 * @property {{item_id: string, quantity: number}[]} inventory
 * @property {{ quest_id: number, step: number, complete: bool, }[]} quests_started
 * @property {string[]} quests_completed
 * @property {PurchasedAssistant[]} assistants
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
        fn: (s) => userDidMine(s, items.find((i) => i.item_id === 'copper_ore')),
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
        fn: (s) => userDidMine(s, items.find((i) => i.item_id === 'tin_ore')),
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
              smithing: 1,
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
        fn: (s) => userDidSmith(s, items.find((i) => i.item_id === 'bronze_bar')),
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
        fn: (s) => userDidSmith(s, items.find((i) => i.item_id === 'bronze_sword')),
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
        fn: (s) => {
          const availItems = items.filter(
            (i) =>
              i.categories.includes('weapons') &&
              i.categories.includes('bronze') &&
              getInventoryItem(s, i.item_id) > 0,
          );
          const rng = Math.floor(Math.random() * availItems.length);
          sellItem(s, availItems[rng]);
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
        fn: (s) => userDidMine(s, items.find((i) => i.item_id === 'iron_ore')),
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
        fn: (s) => userDidMine(s, items.find((i) => i.item_id == 'coal')),
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
        fn: (s) => userDidSmith(s, items.find((i) => i.item_id == 'iron_bar')),
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
        fn: (s) => userDidSmith(s, items.find((i) => i.item_id == 'steel_bar')),
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

    /** @type {Assistant[]} */
    const ass = [
      /*
      {
        id: 'mining_assistant',
        name: 'Mining Assistant',
        description: 'This guy right here? He\'ll mine for ya.',
        skills: ['mining'],
        upgrades: [
          {
            level: 0,
            cost: 150,
            value: 2500,
            requirements: {
              mining: 1,
            }
          },
          {
            level: 1,
            cost: 300,
            value: 1750,
            requirements: {
              mining: 5,
            }
          },
          {
            level: 3,
            cost: 600,
            value: 1450,
            requirements: {
              mining: 10,
            }
          },
          {
            level: 4,
            cost: 1200,
            value: 950,
            requirements: {
              mining: 15,
            }
          },
          {
            level: 5,
            cost: 1750,
            value: 850,
            requirements: {
              mining: 25,
            }
          }
        ],
        fn: (config, state) => {
        }
      }
      */
    ];

    /** @type {State} */
    const state = {
      // @TODO: Shit like total bronze swords sold (count + value)
      stats: {
        lifetime_wealth: 500,
        sales: [],
        crafts: [],
        gathers: [],
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
      global_variables: {
        max_assistants: 3,
        max_available_assistants: 2,
        assistant_refresh_rate: 180000,
      },
      upgrades: [],
      assistants: [],
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
     * @param {{ value: State }} state
     * @param {Item} item
     *
     * @returns {bool}
     */
    const hasIngredientsFor = (state, item) => {
      const ingredients = item.ingredients;
      let hasIngredients = true;

      ingredients.forEach((ingredient) => {
        const item = state.value.inventory.find(
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
    const updateXp = (state, key, value) => {
      const nxtLvlKey = `${key}_next_level`;
      state.value.xp[key] += value;
      state.value.xp[`${key}_xp_level`] += value;

      let currXp = state.value.xp[key];

      while (currXp >= state.value.xp[nxtLvlKey]) {
        state.value.levels[key] += 1;
        state.value.xp[`${key}_xp_level`] = Math.abs(
          state.value.xp[nxtLvlKey] - state.value.xp[key],
        );
        state.value.xp[nxtLvlKey] += getXpForLevel(state.value.levels[key] + 1);
      }
    };

    /**
     * @param {{ value: State }} state 
     * @param {Item} item
     *
     * @returns {number}
     */
    const mine = (state, item) => {
      const baseSuccess = item.success_chance;
      const rng = Math.random();
      const bonusYieldChance = state.value.upgrades
        .filter((u) => u.affects === item.id && u.category === 'mining_excess')
        .reduce((total, curr) => (total += curr.value), 0);
      const yield = rng < bonusYieldChance ? 2 : 1;
      const currLvl = state.value.levels.mining;

      if (baseSuccess === 1.0 || currLvl >= item.level * 2) {
        return yield;
      }

      return rng < baseSuccess + (currLvl / (item.level * 2)) ? yield : 0;
    };

    /**
     * @param {{ value: State }} state
     * @param {Item} item
     */
    const userDidMine = (state, item) => {
      const gathered = mine(state, item);

      if (gathered > 0) {
        updateXp(state, 'mining', item.xp_given);
        updateInventory(state, item.item_id, gathered);
        updateStats(state, 'gathers', item, gathered);
      } else {
        // @TODO: Add some visual logs for the user!
      }
    };

    /**
     * @param {{ value: State }} state 
     * @param {PurchasedAssistant} assistant 
     * @param {Item} item 
     */
    const assistantDidMine = (state, assistant, item) => {
      let gathered = mine(state, item);
      let xp = item.xp_given;

      if (gathered === 0) {
        return;
      }

      if (assistant.perk.affects === 'xp') {
        xp = item.xp_given + Math.floor((item.xp_given * assistant.perk.value));
      } else if (assistant.perk.affects === 'yield') {
        if (Math.random() < assistant.perk.value) {
          gathered += Math.floor(Math.random() * (3 - 1 + 1) + 1);
        }
      }

      updateXp(state, 'mining', xp);
      updateInventory(state, item.item_id, gathered);
      updateStats(state, 'gathers', item, gathered);
    };

    /**
     * @param {{ value: State }} state
     * @param {Item} item
     *
     * @returns {{ success: bool, result: {item_id: string, quantity: number}[]}}
     */
    const smith = (state, item) => {
      // @TODO: Do some fancy maths to get % chance success
      // @TODO: Do some fancy maths to get % chance to create extra
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
     * @param {{ value: State }} state
     * @param {object} item
     */
    const userDidSmith = (state, item) => {
      if (!hasIngredientsFor(state, item)) {
        return;
      }

      const result = smith(state, item);

      if (result.success) {
        updateXp(state, 'smithing', item.xp_given);
        let idx = state.value.stats.crafts.findIndex((i) => i.item_id === item.item_id);

        if (idx === -1) {
          state.value.stats.crafts.push({
            item_id: item.item_id,
            value: 0,
          });
          idx = state.value.stats.crafts.length - 1;
        }

        state.value.stats.crafts[idx].value += result.result[0].quantity;
      }

      result.result.forEach((invUpdate) =>
        updateInventory(state, invUpdate.item_id, invUpdate.quantity),
      );
    };

    /**
     * @param {{ value: State }} state 
     * @param {PurchasedAssistant} assistant 
     * @param {Item} item 
     */
    const assistantDidSmith = (state, assistant, item) => {
      if (!hasIngredientsFor(state, item)) {
        return;
      }

      const result = smith(state, item);

      if (result.success) {
        let xp = item.xp_given;

        if (assistant.perk.affects === 'xp') {
          xp = item.xp_given + Math.floor((item.xp_given * assistant.perk.value));
        } else if (assistant.perk.affects === 'yield') {
          if (Math.random() < assistant.perk.value) {
            const extra = Math.floor(Math.random() * (3 - 1 + 1) + 1);
            let total = extra;

            result.result.forEach((i) => {
              if (i.item_id === item.item_id) {
                total += i.quantity;
                i.quantity += extra;
              }
            });
          
            updateStats(state, 'crafts', item, total);
          }
        }
      
        updateXp(state, 'smithing', xp);
        result.result.forEach((invUpdate) => 
          updateInventory(state, invUpdate.item_id, invUpdate.quantity)
        );
      }
    };

    /**
     * @param {Upgrade} upgrade
     * @param {{ id: string, const: number, level: number, value: number }} upgraded
     * @param {{ value: State }} state 
     */
    const upgradeAutoer = (upgrade, upgraded, state) => {
      if (state.value.running_upgrades[upgrade.id]) {
        upgrade.fn(state);
        clearInterval(state.value.running_upgrades[upgrade.id]);
      }

      state.value.running_upgrades[upgrade.id] = setInterval(() => {
        upgrade.fn(state);
      }, upgraded.value);
    };

    /**
     * @TODO Might be good to make Upgrades an object that
     * has some of these functions on them. :)
     *
     * @param {Upgrade} upgrade
     * @param {number} level
     * @param {{ value: State }} state 
     */
    const upgrade = (upgrade, level, state) => {
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
        upgradeAutoer(upgrade, up, state);
      } else if (upgrade.id === 'money_is_time') {
        // @TODO: Finish all running autoers + update their intervals
        // Also create a function to do this rather than repeating code
      }

      if (!state.value.upgrades.find((u) => u.id === upgrade.id)) {
        state.value.upgrades.push({
          id: upgrade.id,
          cost: up.cost,
          level: level,
          value: up.value,
          category: upgrade.category,
        });
      }

      const currIdx = state.value.upgrades.findIndex((u) => u.id === upgrade.id);
      state.value.upgrades[currIdx] = {
        id: upgrade.id,
        cost: up.cost,
        level: up.level,
        value:
          level !== 0 && upgrade.category !== 'autoer'
            ? up.value + state.value.upgrades[currIdx].value
            : up.value,
        category: upgrade.category,
      };
    };

    /**
     * @param {Upgrade} upgrade
     * @param {{ value: State }} state 
     *
     * @returns {number}
     */
    const getUpgradeCost = (upgrade, state) => {
      const currUpgrade = state.value.upgrades.find((u) => u.id === upgrade.id);

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
     * @param {{ value: State }} state 
     */
    const userPurchasedUpgrade = (toUpgrade, state) => {
      // @TODO: Find the upgrade level to purchase
      const currUpgrade = state.value.upgrades.find((u) => u.id === toUpgrade.id);
      let cost = currUpgrade ? getUpgradeCost(toUpgrade, state) : toUpgrade.cost;

      if (currUpgrade) {
        upgrade(toUpgrade, currUpgrade.level + 1, state);
      } else {
        upgrade(toUpgrade, 0, state);
      }

      state.value.gold -= cost;
    };

    /**
     * 
     * @param {{ value: State }} state 
     * @param {'sales' | 'crafts' | 'gathers'} stat 
     * @param {Item?} item 
     * @param {number} value 
     */
    const updateStats = (state, stat, item, value) => {
      if (stat === 'sales') {
        state.value.stats.lifetime_wealth += value;
        return;
      }

      let idx = state.value.stats[stat].findIndex((i) => i.item_id === item.item_id);

      if (idx === -1) {
        state.value.stats[stat].push({
          item_id: item.item_id,
          value: 0,
        });
        idx = state.value.stats[stat].length - 1;
      }

      state.value.stats[stat][idx].value += value;
    };

    /**
     * @param {{ value: State }} state
     * @param {string} key
     * @param {number} value
     */
    const updateInventory = (state, key, value) => {
      let idx = state.value.inventory.findIndex((i) => i.item_id === key);

      if (idx === -1) {
        state.value.inventory.push({ item_id: key, quantity: 0 });
        idx = state.value.inventory.length - 1;
      }

      state.value.inventory[idx].quantity += value;
    };

    /**
     * @param {{ value: State }} state
     * @param {Item} item
     */
    const sellItem = (state, item) => {
      const bonusUpgrade = state.value.upgrades.find(
        (u) => u.category === 'gold_bonus',
      );
      let gold = item.value;

      if (bonusUpgrade) {
        // Round up cuz we're nice
        gold += Math.ceil(gold * bonusUpgrade.value);
      }

      state.value.gold += gold;
      state.value.stats.lifetime_wealth += gold;

      let statIdx = state.value.stats.sales.findIndex((i) => i.item_id === item.item_id);

      if (statIdx === -1) {
        state.value.stats.sales.push({
          item_id: item.item_id,
          value: 0,
        });
        statIdx = state.value.stats.sales.length - 1;
      }

      state.value.stats.sales[statIdx].value += gold;
    };

    /**
     * @param {{ value: State }} state 
     * @param {Item} item 
     */
    const userDidSell = (state, item) => {
      sellItem(state, item);
      updateInventory(state, item.item_id, -1);
    };

    /**
     * @param {{ value: State }} state 
     * @param {PurchasedAssistant} assistant 
     * @param {Item} item 
     */
    const assistantDidSell = (state, assistant, item) => {
      // @TODO: Figure out why getAssistantJobFunctions isn't handling this!!
      if (!state.value.inventory.find((i) => i.item_id === item.item_id && i.quantity > 0)) {
        console.log(`Not enough inventory for assistant to sell ${item.name}`);
        return;
      }

      let gold = item.value;

      if (assistant.perk.affects === 'selling') {
        gold += Math.ceil((gold * assistant.perk.value));
      }

      state.value.gold += gold;
      updateStats(state, 'sales', null, gold);
      updateInventory(state, item.item_id, -1);
    };

    /**
     * @param {{ value: State }} state 
     * @param {string} key
     *
     * @returns {number}
     */
    const getInventoryItem = (state, key) => {
      return state.value.inventory.find((i) => i.item_id === key)?.quantity ?? 0;
    };

    /**
     * @param {Upgrade} upgrade
     *
     * @returns {bool}
     */
    const hasRequirementsForUpgrade = (upgrade, state) => {
      const currLevel =
        state.value.upgrades.find((u) => u.id === upgrade.id)?.level ?? 0;
      const nextLevel = upgrade.upgrades.find(
        (u) => u.level === (currLevel === 0 ? 0 : currLevel + 1),
      );

      if (!nextLevel) {
        return false;
      }

      for (const reqKey in nextLevel.requirements) {
        if (nextLevel.requirements[reqKey] > state.value.levels[reqKey]) {
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
    const canUpgradeUpgrade = (upgrade, state) => {
      const currLevel =
        state.value.upgrades.find((u) => u.id === upgrade.id)?.level ?? 0;
      const nextLevel = upgrade.upgrades.find(
        (u) => u.level === (currLevel === 0 ? 0 : currLevel + 1),
      );

      if (!nextLevel || nextLevel.cost > state.value.gold) {
        return false;
      }

      return hasRequirementsForUpgrade(upgrade, state);
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
          for (const lKey in state.value.levels) {
            if (quest.requirements.levels[lKey] > state.value.levels[lKey]) {
              return false;
            }
          }
        } else if (key === 'quests') {
          const requiredQuests = quest.requirements.quests;

          if (requiredQuests.length !== 0) {
            hasRequirements =
              requiredQuests.filter((q) => state.value.quests_completed.includes(q))
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
    const canCompleteQuest = (quest, state) => {
      const currStep = state.value.quests_started.find(
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
    const canCompleteQuestStep = (quest, step, state) => {
      // I mean technically, we can just do quest.steps[step]; :)
      const questStep = quest.steps.find((s) => s.id === step);

      if (!questStep) {
        console.log('no quest step');
        return false;
      }

      if (
        questStep.requirements.items.filter(
          (i) => getInventoryItem(state, i.item_id) < i.value,
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
    const completeQuestStep = (quest, step, state) => {
      console.log(quest.id, step);
      if (!canCompleteQuestStep(quest, step, state)) {
        return;
      }

      const idx = state.value.quests_started.findIndex((q) => q.quest_id);

      if (idx === -1) {
        console.log(`unable to find ${quest.id}`);
        return;
      }

      const currStep = quest.steps.find((s) => s.id === step);
      state.value.quests_started[idx].complete = true;

      for (const qItemReq of currStep.requirements.items) {
        updateInventory(state, qItemReq.item_id, qItemReq.value * -1);
      }
    };

    /**
     * @param {{ value: State }} state 
     * @param {Quest} quest
     *
     * @returns {bool}
     */
    const startQuest = (state, quest) => {
      if (state.value.quests_started.length) {
        console.log('cannot start quest. one is already in progress');
        return false;
      }

      state.value.quests_started.push({
        quest_id: quest.id,
        step: quest.steps[0].id,
        complete: false,
      });

      return true;
    };

    /**
     * @param {Quest} quest
     */
    const completeQuest = (quest, state) => {
      if (!canCompleteQuest(quest, state)) {
        console.log(`unable to complete quest #${quest.id} - ${quest.name}`);
        return;
      }

      state.value.quests_started = state.value.quests_started.filter(
        (q) => q.quest_id !== quest.id,
      );
      state.value.quests_completed.push(quest.id);

      for (const reward of quest.rewards) {
        switch (reward.category) {
          case 'experience':
            updateXp(state, reward.affects, reward.value);
            break;
          case 'item':
            updateInventory(state, reward.item_id, reward.value);
            break;
          case 'money':
            state.value.gold += reward.value;
            state.value.stats.lifetime_wealth += reward.value;
            break;
          default:
            console.log('unknown reward category', reward);
        }
      }
    };

    /**
     * @param {Assistant} assistant 
     * @param {{ value: State }} state 
     */
    const hireAssistant = (assistant, state) => {
      /** @type {PurchasedAssistant} hiredAssistant */
      const hiredAssistant = {
        ...assistant,
        interval_id: null,
        interval: assistant.upgrades[0].value,
        level: 0,
        config: {
          mining: [],
          smithing: [],
          selling: [],
        },
      };
      
      for (const skill of assistant.skills) {
        let avail = [];

        // Default to doing nothing for selling for now
        if (skill !== 'selling') {
          avail = items.filter((i) => i.skill === skill && i.level <= state.value.levels[skill]);
        }

        hiredAssistant.config[skill] = avail.map((i) => i.item_id);
      }

      if (assistant.perk.affects === 'interval') {
        hiredAssistant.interval -= hiredAssistant.interval * assistant.perk.value;
      }

      state.value.assistants.push(hiredAssistant);
      updateAssistantJobs(hiredAssistant.id, state);
    };

    /**
     * @param {string} assistantId 
     * @param {{ mining: string[], smithing: string[], selling: string[] }} newConfig 
     * @param {{ value: State }} state 
     */
    const updateAssistantConfig = (assistantId, newConfig, state) => {
      const idx = state.value.assistants.find((a) => a.id === assistantId);

      if (idx === -1) {
        return;
      }

      for (const key in newConfig) {
        state.value.assistants[idx].config[key] = newConfig[string]
      }
    };

    /**
     * @param {string} assistantId 
     * @param {{ value: State }} state 
     */
    const updateAssistantJobs = (assistantId, state) => {
      const idx = state.value.assistants.findIndex((a) => a.id === assistantId);

      if (idx === -1) {
        console.log(`assistant (${assistantId}) not found`);
        return;
      }

      const assistant = state.value.assistants[idx];
      const jobs = getAssistantJobFunctions(assistant, state);

      clearInterval(assistant.interval_id);
      assistant.interval_id = setInterval(() => {
        for (const job of jobs) {
          job();
        }
      }, assistant.interval);
    };

    /**
     * @TODO Okay so technically this gives the PLAYER xp for the action of the assistant.
     * 
     * @param {PurchasedAssistant} assistantId 
     * @param {{ value: State }} state 
     * @returns {function[]}
     */
    const getAssistantJobFunctions = (assistant, state) => {
      const jobs = [];

      for (const key in assistant.config) {
        let actionFn;
        let actionableItems;

        switch (key) {
          case 'mining':
            actionFn = assistantDidMine;
            actionableItems = items.filter((i) => i.skill === 'mining' && assistant.config[key].includes(i.item_id));
          break;

          case 'smithing':
            actionFn = assistantDidSmith;
            actionableItems = items.filter((i) => i.skill === 'smithing' && assistant.config[key].includes(i.item_id));
          break;

          case 'selling':
            actionFn = assistantDidSell;
            actionableItems = items.filter((i) => 
              state.value.inventory.find((ii) => ii.item_id === i.item_id && ii.quantity > 0)
              && assistant.config[key].includes(i.item_id)
            );
          break;
        }

        if (actionFn && actionableItems.length) {
          jobs.push(() => {
            const rngA = Math.floor(Math.random() * actionableItems.length);
            const rngB = Math.floor(Math.random() * actionableItems.length);
            const actionItem = actionableItems.sort(() => rngA - rngB)[0];

            if (actionFn && actionItem) {
              actionFn(state, assistant, actionItem);
            }
          });
        }
      }

      return jobs;
    }

    /**
     * @TODO I should honestly standardize upgrades, including assistants, so
     * I don't have to keep re-doing this logic.
     * 
     * @param {Assistant} assistant 
     * @param {{ value: State }} state 
     * @returns {bool}
     */
    const canHireAssistant = (assistant, state) => {
      const currLvl = state.value.assistants.find((a) => a.assistant_id === assistant.id);
      const nextLvl = currLvl ? currLvl.level + 1 : 0;
      const requirements = assistant.upgrades.find((u) => u.level === nextLvl);
      
      return state.value.gold > requirements.cost && hasRequirementsForAssistant(assistant, state);
    };

    /**
     * @param {Assistant} assistant 
     * @param {{ value: State }} state 
     * @returns {bool}
     */
    const hasRequirementsForAssistant = (assistant, state) => {
      const currLvl = state.value.assistants.find((a) => a.assistant_id === assistant.id);
      const nextLvl = currLvl ? currLvl.level + 1 : 0;
      const requirements = assistant.upgrades.find((u) => u.level === nextLvl);

      for (const key in requirements.requirements) {
        if (state.value.levels[key] < requirements.requirements[key]) {
          return false;
        }
      }

      return true;
    }

    /**
     * @param {'mining' | 'smithing' | 'selling'} skill
     * @param {{ value: State }} state 
     * @returns {{
     *  skill: 'mining' | 'smithing' | 'selling',
     *  affects: 'xp' | 'selling' | 'yield' | 'interval',
     *  value: number,
     *  name: string,
     *  description: string,
     * }}
     */
    const generateAssistantPerk = (skill, state) => {
      let opts = [];
      
      // @TODO: Perk of saving items during sales & crafting
      if (skill === 'mining' || skill === 'smithing') {
        opts = ['xp', 'yield', 'interval'];
      } else {
        opts = ['selling', 'interval'];
      }

      const opt = opts.sort(() => Math.floor(Math.random() * 3) - Math.floor(Math.random() * 3))[0];
      // @TODO: Weighted value based on the player's current skill level
      // @TODO: We don't want to randomly pick selling if the assistant can't sell
      const rngAmount = Math.random();
      const percent = Math.floor(rngAmount * 100);
      let name = '';
      let desc = '';

      if (opt === 'selling') {
        name = 'Bonus Gold';
        desc = `Increase gold from sales by ${percent}%`;
      } else if (opt === 'interval') {
        name = 'Faster Assistant Speed';
        desc = `Assistant works ${percent}% faster`;
      } else if (opt === 'xp') {
        name = 'Bonus Experience';
        desc = `Assistant yields ${percent}% more experience`;
      } else if (opt === 'yield') {
        name = 'Bonus Yield';
        desc = `Assistant has a ${percent}% to yield more items`;
      }

      return {
        skill,
        name,
        affects: opt,
        value: rngAmount,
        description: desc,
      };
    };

    /**
     * @param {'mining' | 'smithing' | 'selling'} skill 
     * @param {{
     *  skill: 'mining' | 'smithing' | 'selling',
     *  affects: 'xp' | 'yield' | 'interval',
     *  value: number,
     *  name: string,
     *  description: string,
     * }} perk
     * @param {{ value: State }} state 
     * @returns {}
     */
    const generateAssistantLevels = (skill, perk, state) => {
      const baseValues = [
        2500,
        1750,
        1450,
        950,
        850,
      ];
      const levels = [];

      for (let i = 0; i < 5; i++) {
        // @TODO: Implement selling "store owner" skill
        const currLvl = skill === 'selling' ? 1 : state.value.levels[skill];
        const s = skill === 'selling' ? 'mining' : skill;
        let value = baseValues[i];

        if (perk.affects === 'interval' ) {
          value -= value * perk.value;
        }

        levels.push({
          value,
          level: i,
          cost: Math.ceil(350 + 75 * Math.pow(i, 2) + 175 * i),
          requirements: {
            [perk.skill]:  Math.ceil(currLvl + 0.75 * Math.pow(i, 2) + 1.5 * i),
          }
        });
      }

      return levels;
    };

    /**
     * @param {{ value: State }} state 
     * @returns {Assistant}
     */
    const generateRandomAssistant = (state) => {
      const skills = ['mining', 'smithing', 'selling'];
      const skill = skills.sort(() => Math.floor(Math.random() * 3) - Math.floor(Math.random() * 3))[0];
      const perk = generateAssistantPerk(skill, state);
      const id = Math.floor(Math.random() * 100000);
      /** @type {Assistant} */
      const assistant = {
        id,
        name: `Conehead ${id}`,
        skills: [skill],
        perk: perk,
        upgrades: generateAssistantLevels(perk, skill, state),
      };

      return assistant;
    };

    const { createApp, ref, computed } = Vue;

    createApp({
      setup() {
        /** @type {{ value: State }} s */
        const s = ref({ ...state });
        /** @type {{ value: Assistant[] }} */
        const assistants = ref([generateRandomAssistant(s)]);
        const statsShown = ref(false);
        const currentQuest = ref(null);
        const viewingQuest = ref(null);
        const configuringAssistant = ref(null);
        const availableOreList = computed(() => items.filter((i) => i.skill === 'mining' && i.level <= s.value.levels.mining));
        const availabeSmithableList = computed(() => items.filter((i) => i.skill === 'smithing' && i.level <= s.value.levels.smithing));
        const availableQuests = computed(() => quests.filter((q) => !s.value.quests_completed.includes(q.id)));
        const availableUpgrades = computed(() => allUpgrades.filter((u) => hasRequirementsForUpgrade(u, s)));
        const availableAssistants = computed(() => assistants.value.filter((a) => hasRequirementsForAssistant(a, s)));
        // hehexdd
        window.toggleStats = () => {
          statsShown.value = !statsShown.value;
        };

        // Every 3 minutes give the user a new assistant to hire
        setInterval(() => {
          if (s.value.assistants.length < s.value.global_variables.max_available_assistants) {
            console.log('getting a new assistant');
            assistants.value.push(generateRandomAssistant(s));
          }
        }, s.value.global_variables.assistant_refresh_rate);

        return { 
          s, 
          items,
          statsShown,
          availableOreList,
          availabeSmithableList,
          availableQuests,
          availableUpgrades,
          availableAssistants,
          currentQuest,
          viewingQuest,
          configuringAssistant,
          toggleStats: () => toggleStats,
          /**
           * @param {Item} item 
           */
          userDidMine: (item) => userDidMine(s, item),
          /**
           * @param {Item} item 
           */
          userDidSmith: (item) => userDidSmith(s, item),
          /**
           * @param {Item} item 
           */
          userDidSell: (item) => userDidSell(s, item),
          /**
           * @param {Item} item 
           * @returns {bool}
           */
          hasInventory: (item) => !!s.value.inventory.find((i) => i.item_id === item.item_id && i.quantity > 0),
          /**
           * @param {Item} item 
           * @returns {bool}
           */
          userCanCraft: (item) => hasIngredientsFor(s, item),
          /**
           * @param {Quest} quest 
           */
          updateQuestPanel: (quest) => {
            viewingQuest.value = quest.id === viewingQuest.value?.id ? null : quest;
          },
          /**
           * @param {Quest} quest 
           */
          acceptQuest: (quest) => {
            if (startQuest(s, quest)) {
              currentQuest.value = quest;
            }
          },
          /**
           * @param {Quest} quest 
           * @returns {bool}
           */
          canStartQuest: (quest) => checkQuestRequirements(quest, s),
          /**
           * @returns {number | null}
           */
          getCurrentQuestStep: () => s.value.quests_started.length ? s.value.quests_started[0].step : null,
          canCompleteQuestStep: (quest) => {
            const currentStep = s.value.quests_started[0].step;
            return canCompleteQuestStep(quest, currentStep, s);
          },
          canCompleteQuest: (quest) => canCompleteQuest(quest, s),
          completeQuestStep: () => {
            const currentStep = s.value.quests_started[0].step;
            const hasMoreSteps = currentQuest.value.steps.find((s) => s.id === currentStep + 1);

            completeQuestStep(currentQuest.value, currentStep, s);

            if (!!!hasMoreSteps) {
              completeQuest(currentQuest.value, s);
              currentQuest.value = null;
              viewingQuest.value = null;
            } else {
              s.value.quests_started[0].step = currentStep + 1;
              s.value.quests_started[0].complete = false;
            }
          },
          /**
           * @param {Quest} quest 
           * @returns {bool}
           */
          isQuestStarted: (quest) => !!s.value.quests_started.find((q) => q.quest_id === quest.id),
          xpForSkill: (skill) => {
            return Math.floor((s.value.xp[`${skill}_xp_level`] / getXpForLevel(s.value.levels[skill])) * 100);
          },
          /**
           * @param {string} itemId 
           * @returns {Item | undefined}
           */
          getItem: (itemId) => items.find((i) => i.item_id === itemId),
          /**
           * @param {string} questId 
           * @returns {Quest | undefined}
           */
          getQuest: (questId) => quests.find((q) => q.id === questId),
          /**
           * @param {Upgrade} upgrade 
           * @returns {string}
           */
          getUpgradeText: (upgrade) => {
            const currUpgrade = s.value.upgrades.find((u) => u.id === upgrade.id);
            const maxUpgrade = upgrade.upgrades.sort((a, b) => a.level <= b.level)[0];
            let text = upgrade.name;

            if (currUpgrade?.level === maxUpgrade.level) {
              text += ' | Max Level';
            } else {
              text += ` | ${getUpgradeCost(upgrade, s)}gp`
            }

            return text;
          },
          /**
           * @param {Upgrade} upgrade 
           */
          userPurchasedUpgrade: (upgrade) => userPurchasedUpgrade(upgrade, s),
          /**
           * @param {Upgrade} upgrade 
           * @returns {bool}
           */
          canUpgradeUpgrade: (upgrade) => canUpgradeUpgrade(upgrade, s),
          canHireAssistant: (assistant) => canHireAssistant(assistant, s),
          /**
           * @param {Assistant} assistant 
           * @returns {number}
           */
          getAssistantCost: (assistant) => {
            const hired = s.value.assistants.find((a) => a.id === assistant.id);

            if (!hired) {
              return assistant.upgrades[0].cost;
            }

            const lvl = hired.level + 1;
            return hired.upgrades.find((u) => u.level === lvl)?.cost;
          },
          hireAssistant: (assistant) => {
            hireAssistant(assistant, s);
            assistants.value = assistants.value.filter((a) => a.id !== assistant.value);
            configuringAssistant.value = s.value.assistants[s.value.assistants.length - 1];
          },
          /**
           * @param {PurchasedAssistant} purchasedAssistant 
           */
          editAssistant: (purchasedAssistant) => {
            configuringAssistant.value = purchasedAssistant;
          },
          /**
           * @param {PurchasedAssistant} purchasedAssistant 
           */
          saveAssistantConfig: (purchasedAssistant) => {
            const idx = s.value.assistants.findIndex((a) => a.id === purchasedAssistant.id);

            if (idx === -1) {
              console.log(`unable to update ${purchasedAssistant.id}`);
              return;
            }

            s.value.assistants[idx] = JSON.parse(JSON.stringify(purchasedAssistant));
            configuringAssistant.value = null;

            updateAssistantJobs(s.value.assistants[idx].id, s);
          },
          /**
           * @param {PurchasedAssistant} purchasedAssistant 
           */
          upgradeAssistant: (purchasedAssistant) => {},
          /**
           * @param {PurchasedAssistant} purchasedAssistant 
           * @returns {string}
           */
          getAssistantJob: (purchasedAssistant) => {
            return s.value.assistants.find((a) => a.id === purchasedAssistant.id)?.skills.join(',') ?? 'N/A';
          },
          /**
           * @param {PurchasedAssistant} purchasedAssistant 
           * @param {'mining' | 'smithing' | 'selling'} jobType
           * @param {string} itemId 
           */
          toggleAssistantJob: (purchasedAssistant, jobType, itemId) => {
            if (purchasedAssistant.config[jobType].includes(itemId)) {
              purchasedAssistant.config[jobType] = purchasedAssistant.config[jobType].filter((i) => i !== itemId);
            } else {
              purchasedAssistant.config[jobType].push(itemId);
            }
          }
        };
      }
    })
      .mount('.wrapper');
  }

)();