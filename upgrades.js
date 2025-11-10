const _upgrades = [
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
          mining: 1,
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
    id: 'store_max_assistants',
    name: 'Shop: Max Assistants',
    description: 'Upgrading your shop allows you to hire more assistants.',
    value_description:
      'Increases total number of hireable assistants to %{value}.',
    cost: 750,
    affects: 'global_variables.max_assistants',
    category: 'upgrade',
    value: 2,
    upgrades: [
      {
        level: 0,
        cost: 750,
        value: 4,
        requirements: {
          mining: 10,
          smithing: 10,
        },
      },
      {
        level: 1,
        cost: 1200,
        value: 6,
        requirements: {
          mining: 22,
          smithing: 22,
        },
      },
      {
        level: 2,
        cost: 1800,
        value: 8,
        requirements: {
          mining: 34,
          smithing: 34,
        },
      },
    ],
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
    id: 'autoer_mining_xp',
    name: 'Mining Autoer: XP',
    description:
      'Mining Autoers now give a small portion of xp for each action performed.',
    cost: 1200,
    value: 0.1,
    affects: 'xp',
    category: 'xp',
    upgrades: [
      {
        level: 0,
        cost: 1200,
        value: 0.1,
        requirements: {
          mining: 15,
        },
      },
      {
        level: 1,
        cost: 1650,
        value: 0.2,
        requirements: {
          mining: 30,
        },
      },
      {
        level: 2,
        cost: 2200,
        value: 0.3,
        requirements: {
          mining: 50,
        },
      },
      {
        level: 3,
        cost: 2450,
        value: 0.45,
        requirements: {
          mining: 60,
        },
      },
      {
        level: 4,
        cost: 2600,
        value: 0.6,
        requirements: {
          mining: 72,
        },
      },
    ],
  },
  {
    id: 'autoer_smithing_xp',
    name: 'Smithing Autoer: XP',
    description:
      'Smithing Autoers now give a small portion of xp for each action performed.',
    cost: 1200,
    value: 0.1,
    affects: 'xp',
    category: 'xp',
    upgrades: [
      {
        level: 0,
        cost: 1200,
        value: 0.1,
        requirements: {
          mining: 15,
        },
      },
      {
        level: 1,
        cost: 1650,
        value: 0.2,
        requirements: {
          mining: 30,
        },
      },
      {
        level: 2,
        cost: 2200,
        value: 0.3,
        requirements: {
          mining: 50,
        },
      },
      {
        level: 3,
        cost: 2450,
        value: 0.45,
        requirements: {
          mining: 60,
        },
      },
      {
        level: 4,
        cost: 2600,
        value: 0.6,
        requirements: {
          mining: 72,
        },
      },
    ],
  },
  /*
  {
    id: 'tax_avoidance',
    name: 'Tax Avoidance',
    description:
      'Tie up your precious gold in assets, preventing Big Tax from taking your hard earned gold.',
    value_description: 'Reduces taxes by %{value}%.',
    cost: 25000,
    value: 0.05,
    affects: 'upkeep',
    category: 'upgrade',
    upgrades: [
      {
        level: 0,
        cost: 25000,
        value: 0.05,
        requirements: {
          mining: 25,
          smithing: 25,
        },
      },
      {
        level: 1,
        cost: 50000,
        value: 0.075,
        requirements: {
          mining: 32,
          smithing: 32,
        },
      },
      {
        level: 2,
        cost: 55000,
        value: 0.1,
        requirements: {
          mining: 40,
          smithing: 40,
        },
      },
      {
        level: 3,
        cost: 75000,
        value: 0.12,
        requirements: {
          mining: 55,
          smithing: 55,
        },
      },
      {
        level: 0,
        cost: 25000,
        value: 0.15,
        requirements: {
          mining: 65,
          smithing: 65,
        },
      },
    ],
  },
  */
  {
    id: 'capitalism',
    name: 'Capitalism',
    description:
      'Pocket more profit by keeping the upkeep on your Assistants down!',
    value_description: 'Reduces Assistant upkeep by %{value}%.',
    cost: 12000,
    value: 0.08,
    affects: 'upkeep',
    category: 'upgrade',
    upgrades: [
      {
        level: 0,
        cost: 12000,
        value: 0.08,
        requirements: {
          mining: 25,
          smithing: 25,
        },
      },
      {
        level: 1,
        cost: 17500,
        value: 0.11,
        requirements: {
          mining: 32,
          smithing: 32,
        },
      },
      {
        level: 2,
        cost: 20000,
        value: 0.16,
        requirements: {
          mining: 40,
          smithing: 40,
        },
      },
      {
        level: 3,
        cost: 28750,
        value: 0.2,
        requirements: {
          mining: 55,
          smithing: 55,
        },
      },
      {
        level: 4,
        cost: 32000,
        value: 0.25,
        requirements: {
          mining: 65,
          smithing: 65,
        },
      },
    ],
  },
];
