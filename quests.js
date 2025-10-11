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
 *  category: ('money' | 'item' | 'experience' | 'assistant')
 *  affects: string,
 *  value: number,
 * }[]} rewards
 * @property {{
 *  id: number,
 *  name: string,
 *  description: string,
 *  requirements: {
 *    items: {
 *      item_id: string,
 *      value: number,
 *      consumed: bool,
 *    }[],
 *    upgrades: {
 *      upgrade_id: string,
 *      value: number,
 *      consumed: bool,
 *    }[]
 *  }
 * }[]} steps
 */

/** @type {Quest[]} */
window.quests = [
  {
    id: 'getting_started',
    name: 'Introduction: Mining & Smithing',
    description: "Listen, it ain't that kind of game, kid.",
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
        value: 100,
      },
      {
        item_id: 'exp',
        category: 'experience',
        affects: 'mining',
        value: 100,
      },
      {
        item_id: 'exp',
        category: 'experience',
        affects: 'smithing',
        value: 100,
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
  {
    id: 'introduction_autoers',
    name: 'Automation',
    description:
      'Listen, the engineers have attached pickaxes and hammers to cogwheels. Now jobs complete themselves? Ha! Those damn whatcha-ma-call-its will never take our jobs.',
    requirements: {
      stats: {},
      levels: {
        mining: 1,
        smithing: 1,
      },
      quests: ['getting_started'],
    },
    rewards: [
      {
        item_id: 'money',
        category: 'money',
        affects: 'gold',
        value: 150,
      },
      {
        item_id: 'exp',
        category: 'experience',
        affects: 'mining',
        value: 100,
      },
      {
        item_id: 'exp',
        category: 'experience',
        affects: 'smithing',
        value: 100,
      },
    ],
    steps: [
      {
        id: 0,
        name: 'Purchase an Autominer',
        description:
          "Sure, you get some ore, but you get no experience from the work they do. What good is that? Why don't you test out the tin and copper autominers?",
        requirements: {
          items: [],
          upgrades: [
            {
              upgrade_id: 'automine_copper',
              value: 1,
              consumed: false,
            },
            {
              upgrade_id: 'automine_tin',
              value: 1,
              consumed: false,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'helpless_chef',
    name: 'The Helpless Chef',
    description:
      "The castle chef is a hopeless fool. He's always losing things. This time? His kitchen utensils.",
    requirements: {
      stats: {},
      levels: {
        mining: 1,
        smithing: 1,
      },
      quests: ['getting_started'],
    },
    rewards: [
      {
        item_id: 'money',
        category: 'money',
        affects: 'gold',
        value: 100,
      },
      {
        item_id: 'exp',
        category: 'experience',
        affects: 'smithing',
        value: 100,
      },
      {
        item_id: 'exp',
        category: 'experience',
        affects: 'mining',
        value: 100,
      },
    ],
    steps: [
      {
        id: 0,
        name: '',
        description:
          "While a dagger isn't quite a knife, it'll do the job for that damn chef.",
        requirements: {
          items: [
            {
              item_id: 'bronze_dagger',
              quantity: 1,
              consumed: true,
            },
          ],
        },
      },
    ],
  },
];
