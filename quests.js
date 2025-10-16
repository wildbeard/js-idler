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
          autoers: [
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
    id: 'introduction_assistants',
    name: 'Assistant Assitance',
    description:
      "What good is a shop without some hired help? Those autominers and smithers are fancy but ya can't learn nothin' from em. What you need is an assistant.",
    requirements: {
      stats: {},
      levels: {
        mining: 1,
        smithing: 1,
      },
      quests: ['introduction_autoers'],
    },
    rewards: [
      {
        item_id: 'money',
        category: 'money',
        affects: 'gold',
        value: 200,
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
      {
        // Kind of a placeholder to use item_id for the Assistant's name
        item_id: 'Jimothy',
        category: 'assistant',
        affects: 'mining',
        value: 0,
      },
    ],
    steps: [
      {
        id: 0,
        name: 'An Assisted Overview',
        description:
          'Assistants help ya around the shop and can help ya learn a thing or two by sharing what they know. They only downside? Ya gotta pay em.',
        requirements: {
          items: [],
          upgrades: [],
        },
      },
      {
        id: 1,
        name: 'An Assisted Overview',
        description:
          'Assistants have their own set of skills and talents but they come at a cost. Each action they perform, be it mining, smithing, or selling, will cost some gold. The better they are the more it costs.',
        requirements: {
          items: [],
          upgrades: [],
        },
      },
      {
        id: 2,
        name: 'An Assisted Overview',
        description:
          'Assistants can also be trained to be better at their job. They can only get so good, and each time ya train em it will cost ya even more gold.',
        requirements: {
          items: [],
          upgrades: [],
        },
      },
      {
        id: 3,
        name: 'An Assisted Overview',
        description:
          "Don't go on a hiring frenzy. You're only allowed to hire a couple of assistants at a time and if you run out of gold that's it! They stop working!",
        requirements: {
          items: [],
          upgrades: [],
        },
      },
      {
        id: 4,
        name: 'An Assisted Overview',
        description:
          "That's all for now, though. I found this fella named Jimothy on the streets. He'd like to help ya out. I don't know what he's good at but some work is better than no work.",
        requirements: {
          items: [],
          upgrades: [],
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
