/**
 * @typedef Autoer
 * @type {object}
 *
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {'mining' | 'smithing'} skill
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

/** @type {Autoer[]} */
const _autoers = [
  {
    id: 'automine_copper',
    name: 'Autominer: Copper',
    description: 'Automagically mines copper for you!',
    value_description: 'Automatically mines %{item} every %{interval}.',
    value: 2000,
    cost: 25,
    skill: 'mining',
    affects: 'copper_deposit',
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
  },
  {
    id: 'automine_tin',
    name: 'Autominer: Tin',
    description: 'Automagically mines tin for you!',
    value_description: 'Automatically mines %{item} every %{interval}.',
    value: 2000,
    cost: 25,
    skill: 'mining',
    affects: 'tin_deposit',
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
  },
  {
    id: 'autosmelt_bronze',
    name: 'Autosmelter: Bronze',
    description:
      "Imagine having an apprentice smelting bronze for you. It's just like that.",
    value_description: 'Automatically smelts a %{item} every %{interval}.',
    value: 2000,
    skill: 'smithing',
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
  },
  {
    id: 'autoforge_bronze_weapons',
    name: 'Autohammer: Bronze Weapons',
    description:
      "We don't now how to adjust this thing, so it'll just make a random bronze weapon for you.",
    value_description:
      'Automatically smiths a random Bronze weapon every %{interval}.',
    value: 2000,
    cost: 200,
    skill: 'smithing',
    affects: 'bronze_weapons',
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
  },
  {
    id: 'autoforge_bronze_armor',
    name: 'Autohammer: Bronze Armor',
    description:
      "We don't now how to adjust this thing, so it'll just make a random bronze armor for you.",
    value_description:
      'Automatically smiths a piece of Bronze armor every %{interval}.',
    value: 2000,
    cost: 200,
    skill: 'smithing',
    affects: 'bronze_armor',
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
  },
  {
    id: 'automine_iron',
    name: 'Autominer: Iron',
    description: 'Automagically mines iron for you!',
    value_description: 'Automatically mines %{item} every %{interval}.',
    value: 2000,
    cost: 250,
    skill: 'mining',
    affects: 'iron_deposit',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 250,
        value: 2000,
        requirements: {
          mining: 10,
        },
      },
      {
        level: 1,
        cost: 375,
        value: 1750,
        requirements: {
          mining: 12,
        },
      },
      {
        level: 2,
        cost: 500,
        value: 1500,
        requirements: {
          mining: 14,
        },
      },
      {
        level: 3,
        cost: 625,
        value: 1250,
        requirements: {
          mining: 16,
        },
      },
      {
        level: 4,
        cost: 750,
        value: 1000,
        requirements: {
          mining: 18,
        },
      },
      {
        level: 5,
        cost: 1000,
        value: 750,
        requirements: {
          mining: 20,
        },
      },
    ],
  },
  {
    id: 'automine_coal',
    name: 'Autominer: Coal',
    description: 'Automagically mines coal for you!',
    value_description: 'Automatically mines %{item} every %{interval}.',
    value: 2000,
    cost: 250,
    skill: 'mining',
    affects: 'coal_deposit',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 250,
        value: 2000,
        requirements: {
          mining: 10,
        },
      },
      {
        level: 1,
        cost: 375,
        value: 1750,
        requirements: {
          mining: 12,
        },
      },
      {
        level: 2,
        cost: 500,
        value: 1500,
        requirements: {
          mining: 14,
        },
      },
      {
        level: 3,
        cost: 625,
        value: 1250,
        requirements: {
          mining: 16,
        },
      },
      {
        level: 4,
        cost: 750,
        value: 1000,
        requirements: {
          mining: 18,
        },
      },
      {
        level: 5,
        cost: 1000,
        value: 750,
        requirements: {
          mining: 20,
        },
      },
    ],
  },
  {
    id: 'autosmelt_iron',
    name: 'Autosmelter: Iron',
    description: "It'll smelt those iron bars for ya!",
    value_description: 'Automatically smelts %{item} every %{interval}.',
    value: 2000,
    cost: 250,
    skill: 'smithing',
    affects: 'iron_bar',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 250,
        value: 2000,
        requirements: {
          smithing: 10,
        },
      },
      {
        level: 1,
        cost: 375,
        value: 1750,
        requirements: {
          smithing: 12,
        },
      },
      {
        level: 2,
        cost: 500,
        value: 1500,
        requirements: {
          smithing: 14,
        },
      },
      {
        level: 3,
        cost: 625,
        value: 1250,
        requirements: {
          smithing: 16,
        },
      },
      {
        level: 4,
        cost: 750,
        value: 1000,
        requirements: {
          smithing: 18,
        },
      },
      {
        level: 5,
        cost: 1000,
        value: 750,
        requirements: {
          smithing: 20,
        },
      },
    ],
  },
  {
    id: 'autosmelt_steel',
    name: 'Autosmelter: Steel',
    description: "It'll smelt those steel bars for ya!",
    value_description: 'Automatically smelts %{item} every %{interval}.',
    value: 2000,
    cost: 500,
    skill: 'smithing',
    affects: 'steel_bar',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 500,
        value: 2000,
        requirements: {
          smithing: 20,
        },
      },
      {
        level: 1,
        cost: 750,
        value: 1750,
        requirements: {
          smithing: 22,
        },
      },
      {
        level: 2,
        cost: 1000,
        value: 1500,
        requirements: {
          smithing: 24,
        },
      },
      {
        level: 3,
        cost: 1250,
        value: 1250,
        requirements: {
          smithing: 26,
        },
      },
      {
        level: 4,
        cost: 1350,
        value: 1000,
        requirements: {
          smithing: 28,
        },
      },
      {
        level: 5,
        cost: 1750,
        value: 750,
        requirements: {
          smithing: 30,
        },
      },
    ],
  },
  {
    id: 'automine_starmetal',
    name: 'Automine: Starmetal',
    description: 'A magical pickaxe mining a magical rock from the stars.',
    value_description: 'Automatically mines Starmetal Ore every %{interval}.',
    value: 2000,
    cost: 500,
    skill: 'mining',
    affects: 'starmetal_deposit',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 650,
        value: 2000,
        requirements: {
          mining: 30,
        },
      },
      {
        level: 1,
        cost: 850,
        value: 1500,
        requirements: {
          mining: 32,
        },
      },
      {
        level: 2,
        cost: 1200,
        value: 1000,
        requirements: {
          mining: 34,
        },
      },
      {
        level: 3,
        cost: 1650,
        value: 750,
        requirements: {
          mining: 36,
        },
      },
      {
        level: 4,
        cost: 1800,
        value: 500,
        requirements: {
          mining: 38,
        },
      },
      {
        level: 5,
        cost: 2000,
        value: 350,
        requirements: {
          mining: 40,
        },
      },
    ],
  },
  {
    id: 'autosmelt_rough_starmetal',
    name: 'Autosmelt: Rough Starmetal',
    description: 'A magical smelter smelting magical ore from the stars',
    value_description:
      'Automatically smelts a Rough Starmetal Bar every %{interval}.',
    value: 2000,
    cost: 650,
    skill: 'smithing',
    affects: 'starmetal_bar_rough',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 800,
        value: 2000,
        requirements: {
          smithing: 30,
        },
      },
      {
        level: 1,
        cost: 1000,
        value: 1500,
        requirements: {
          smithing: 32,
        },
      },
      {
        level: 2,
        cost: 1350,
        value: 1000,
        requirements: {
          smithing: 34,
        },
      },
      {
        level: 3,
        cost: 1800,
        value: 750,
        requirements: {
          smithing: 36,
        },
      },
      {
        level: 4,
        cost: 1950,
        value: 500,
        requirements: {
          smithing: 38,
        },
      },
      {
        level: 5,
        cost: 2150,
        value: 350,
        requirements: {
          smithing: 40,
        },
      },
    ],
  },
  {
    id: 'autosmelt_starmetal',
    name: 'Autosmelt: Starmetal',
    description: 'A magical smelter smelting magical ore from the stars',
    value_description:
      'Automatically smelts a Starmetal Bar every %{interval}.',
    value: 2000,
    cost: 875,
    skill: 'smithing',
    affects: 'starmetal_bar',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 875,
        value: 2000,
        requirements: {
          smithing: 34,
        },
      },
      {
        level: 1,
        cost: 1075,
        value: 1500,
        requirements: {
          smithing: 36,
        },
      },
      {
        level: 2,
        cost: 1425,
        value: 1000,
        requirements: {
          smithing: 38,
        },
      },
      {
        level: 3,
        cost: 1875,
        value: 750,
        requirements: {
          smithing: 40,
        },
      },
      {
        level: 4,
        cost: 2025,
        value: 500,
        requirements: {
          smithing: 42,
        },
      },
      {
        level: 5,
        cost: 2250,
        value: 350,
        requirements: {
          smithing: 44,
        },
      },
    ],
  },
  {
    id: 'autoforge_starmetal_weapons',
    name: 'Autoforge: Starmetal Weapons',
    description: 'This thing here will forge random weapons from Starmetal.',
    value_description:
      'Automatically forges a random Starmetal weapon every %{interval}.',
    value: 2000,
    cost: 1000,
    skill: 'smithing',
    affects: 'starmetal_weapons',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 1000,
        value: 2000,
        requirements: {
          smithing: 34,
        },
      },
      {
        level: 1,
        cost: 1200,
        value: 1500,
        requirements: {
          smithing: 36,
        },
      },
      {
        level: 2,
        cost: 1550,
        value: 1000,
        requirements: {
          smithing: 38,
        },
      },
      {
        level: 3,
        cost: 2000,
        value: 750,
        requirements: {
          smithing: 40,
        },
      },
      {
        level: 4,
        cost: 2150,
        value: 500,
        requirements: {
          smithing: 42,
        },
      },
      {
        level: 5,
        cost: 2375,
        value: 350,
        requirements: {
          smithing: 44,
        },
      },
    ],
  },
  {
    id: 'autoforge_starmetal_armor',
    name: 'Autoforge: Starmetal Armor',
    description: 'This thing here will forge random weapons from Starmetal.',
    value_description:
      'Automatically forges a random piece of Starmetal armor every %{interval}.',
    value: 2000,
    cost: 1000,
    skill: 'smithing',
    affects: 'starmetal_armor',
    category: 'autoer',
    upgrades: [
      {
        level: 0,
        cost: 1000,
        value: 2000,
        requirements: {
          smithing: 34,
        },
      },
      {
        level: 1,
        cost: 1200,
        value: 1500,
        requirements: {
          smithing: 36,
        },
      },
      {
        level: 2,
        cost: 1550,
        value: 1000,
        requirements: {
          smithing: 38,
        },
      },
      {
        level: 3,
        cost: 2000,
        value: 750,
        requirements: {
          smithing: 40,
        },
      },
      {
        level: 4,
        cost: 2150,
        value: 500,
        requirements: {
          smithing: 42,
        },
      },
      {
        level: 5,
        cost: 2375,
        value: 350,
        requirements: {
          smithing: 44,
        },
      },
    ],
  },
];
