window.upgrades = [
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
    fn: (s) =>
      autoerAction(
        s,
        items.find((i) => i.item_id === 'copper_ore'),
        'mining',
      ),
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
    fn: (s) =>
      autoerAction(
        s,
        items.find((i) => i.item_id === 'tin_ore'),
        'mining',
      ),
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
    fn: (s) =>
      autoerAction(
        s,
        items.find((i) => i.item_id === 'bronze_bar'),
        'smithing',
      ),
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
    fn: (s) =>
      autoerAction(
        s,
        items.find((i) => i.item_id === 'bronze_sword'),
        'smithing',
      ),
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
      autoerAction(s, availItems[rng], 'selling');
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
    fn: (s) =>
      autoerAction(
        s,
        items.find((i) => i.item_id === 'iron_ore'),
        'mining',
      ),
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
    fn: (s) =>
      autoerAction(
        s,
        items.find((i) => i.item_id == 'coal'),
        'mining',
      ),
  },
  {
    id: 'autosmelt_iron',
    name: 'Iron Autosmelter',
    description: "It'll smelt those iron bars for ya!",
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
    fn: (s) =>
      autoerAction(
        s,
        items.find((i) => i.item_id == 'iron_bar'),
        'smithing',
      ),
  },
  {
    id: 'autosmelt_steel',
    name: 'Steel Autosmelter',
    description: "It'll smelt those steel bars for ya!",
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
    fn: (s) =>
      autoerAction(
        s,
        items.find((i) => i.item_id == 'steel_bar'),
        'smithing',
      ),
  },
];
