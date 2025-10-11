window.quests = [
  {
    id: 'getting_started',
    name: 'Introduction: Mining & Smithing',
    description: 'Uh, sure',
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
      {
        item_id: 'assistant',
        category: 'assistant',
        affects: 'mining',
        value: 1,
      },
    ],
    steps: [
      {
        id: 0,
        name: 'Mine some Copper',
        description:
          'Mining is easy. But prove you can do it. Mine 10 copper and tin.',
        requirements: {
          items: [
            {
              item_id: 'copper_ore',
              value: 10,
              consumed: false,
            },
            {
              item_id: 'tin_ore',
              value: 10,
              consumed: false,
            },
          ],
        },
      },
      {
        id: 1,
        name: 'Bronze Bars',
        description: 'See? Not hard. Not turn those ores into 10 bronze bars.',
        requirements: {
          items: [
            {
              item_id: 'bronze_bar',
              value: 10,
              consumed: true,
            },
          ],
        },
      },
    ],
  },
];
