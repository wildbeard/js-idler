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
 *
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
 *    }[]
 *    upgrades: {
 *      upgrade_id: string,
 *      value: number,
 *      consumed: false,
 *    }[],
 *  }
 * }[]} steps
 *
 * @typedef Upgrade
 * @type {object}
 *
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} interval
 * @property {string} affects
 * @property {number} cost
 * @property {number} level
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
 *
 * @typedef {Upgrade} Autoer
 *
 * @typedef PurchasedAutoerProps
 * @type {object}
 *
 * @property {number} interval_id
 * @property {function} fn
 *
 * @typedef {Autoer & PurchasedAutoerProps} PurchasedAutoer
 *
 * @typedef Assistant
 * @type {object}
 *
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} cost_per_action
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
 *
 * @typedef PurchasedAssistantProps
 * @type {object}
 *
 * @property {number} level
 * @property {number} interval_id
 * @property {number} interval
 * @property {{
 *  mining: string[],
 *  smithing: string[],
 *  selling: string[],
 * }} config
 *
 * @typedef {Assistant & PurchasedAssistantProps} PurchasedAssistant
 *
 * @typedef {Upgrade} PurchasedUpgrade
 *
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
 * @property {PurchasedAutoer[]} purchased_autoers
 * @property {PurchasedUpgrade[]} upgrades
 * @property {{item_id: string, quantity: number}[]} inventory
 * @property {{ quest_id: number, step: number, complete: bool, }[]} quests_started
 * @property {string[]} quests_completed
 * @property {PurchasedAssistant[]} assistants
 *
 * @function canUpgrade
 * @param {{ value: State }} state
 * @returns {bool}
 *
 * @typedef {UpgradableEntity}
 * @type {object}
 *
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} interval
 * @property {number} level
 * @property {number} cost
 * @property {string} affects
 * @property {'autoer' | 'upgrade'} category
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
 * @property {function} fn Will be defined if the entity is an Autoer
 * @property {function} canUpgrade
 * @property {function} getUpgradeCost
 * @property {function} getCurrentUpgrade
 * @property {function} getUpgradeValueText
 * @property {function} hasRequirementsForUpgrade
 * @property {function} getUpgradeRequirementText
 *
 * @typedef {object} ResourceNode
 *
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {'mining' | 'smithing'} skill
 * @property {{ mining: number }} level_requirements
 * @property {{
 *  item_id: string,
 *  quantity: number,
 *  xp_given: number,
 *  success_chance: number,
 *  is_rare: number,
 * }[]} yields
 */

(
  function () {
    /**
     * @param {Upgrade | Autoer} props
     * @returns {UpgradableEntity}
     */
    function UpgradableEntity(props) {
      /** @type {Autoer | Upgrade} */
      const properties = {
        ...props,
      };

      /**
       * @param {{ value: State }} state
       * @returns {(PurchasedAutoer | Upgrade) | undefined}
       */
      const getUpgradeFromState = (state) => {
        const key =
          properties.category === 'autoer' ? 'purchased_autoers' : 'upgrades';
        return state.value[key].find((u) => u.id === properties.id);
      };

      /**
       * @param {{ value: State }} state
       * @param {bool} defaultUpgrade
       * @returns {(Autoer['upgrades'][0] | Upgrade['upgrades'][0]) | null}
       */
      const getCurrentUpgrade = (state, defaultUpgrade = false) => {
        const stateValue = getUpgradeFromState(state);

        if (!stateValue && !defaultUpgrade) {
          return null;
        }

        const currLevel = stateValue?.level ?? 0;
        return properties.upgrades.find((u) => u.level === currLevel) ?? null;
      };

      /**
       * Returns the cost of the next upgrade, or -1 if at max level.
       * @param {{ value: State }} state
       * @returns {number}
       */
      const getUpgradeCost = (state) => {
        const stateValue = getUpgradeFromState(state);

        if (!stateValue) {
          return properties.cost;
        }

        const currPurchased = getCurrentUpgrade(state);

        if (
          properties.upgrades.sort((a, b) => a.level <= b.level)[0].level ===
          currPurchased?.level
        ) {
          return -1;
        }

        const cost = properties.upgrades.find(
          (u) => u.level === currPurchased.level + 1,
        );
        return cost?.cost ?? currPurchased.cost;
      };

      /**
       * Returns an HTML string
       * @param {{ value: State }} state
       * @returns {string}
       */
      const getUpgradeValueText = (state) => {
        if (properties.category !== 'autoer' || !properties.value_description) {
          return '';
        }

        const flags = ['%{item}', '%{interval}'];
        const currUpgrade = getCurrentUpgrade(state, true);
        let str = properties.value_description;

        flags.forEach((f) => {
          // @TODO: Better way?
          if (f.includes('item')) {
            // Okay I am not a big fan of accessing a global variable here.
            const item = items.find((i) => i.item_id === properties.affects);

            if (item) {
              str = str.replace(f, item.name);
            } else {
              str = str.replace(f, '');
            }
          }

          if (f.includes('interval') && currUpgrade) {
            if (currUpgrade) {
              str = str.replace(f, `${currUpgrade.value / 1000}s`);
            } else {
              str = str.replace(f, '');
            }
          }
        });

        if (properties.category === 'autoer') {
          if (
            properties.id.includes('automine') &&
            state.value.upgrades.find((u) => u.id === 'autoer_mining_xp')
          ) {
            const minerUpgrade = state.value.upgrades.find(
              (u) => u.id === 'autoer_mining_xp',
            );

            if (minerUpgrade) {
              const minerUpgradeLevel = getCurrentUpgrade(state);
              const item = items.find((i) => i.item_id === properties.affects);

              str += `<br>${properties.name} will yield ${
                minerUpgradeLevel.value * 100
              }% (${Math.floor(
                item.xp_given * minerUpgradeLevel.value,
              )}) xp per action.`;
            }
          }

          if (
            properties.id.includes('autosmelt') &&
            state.value.upgrades.find((u) => u.id === 'autoer_smithing_xp')
          ) {
            const smelterUpgrade = state.value.upgrades.find(
              (u) => u.id === 'autoer_smithing_xp',
            );

            if (smelterUpgrade) {
              const smelterUpgradeLevel = getCurrentUpgrade(state);
              const item = items.find((i) => i.item_id === properties.affects);

              str += `<br>${properties.name} will yield ${
                smelterUpgradeLevel.value * 100
              }% (${Math.floor(
                item.xp_given * smelterUpgradeLevel.value,
              )}) xp per action.`;
            }
          }
        }

        return str;
      };

      /**
       * Returns an array of level requirements.
       * @param {{ value: State }} state
       * @returns {string[]}
       */
      const getUpgradeRequirementText = (state) => {
        const currUpgrade = getCurrentUpgrade(state);
        const maxUpgrade = properties.upgrades.sort(
          (a, b) => a.level <= b.level,
        )[0];

        if (currUpgrade?.level === maxUpgrade.level) {
          return [];
        }

        const nextLevel = properties.upgrades.find(
          (u) => u.level === currUpgrade.level + 1,
        );
        const txt = [];

        for (let skillKey in nextLevel.requirements) {
          txt.push(`${skillKey}: ${nextLevel.requirements[skillKey]}`);
        }

        return txt;
      };

      /**
       * @param {{ value: State }} state
       * @returns {bool}
       */
      const hasRequirementsForUpgrade = (state) => {
        const currUpgrade = getCurrentUpgrade(state);
        const nextLevel = properties.upgrades.find(
          (u) => u.level === (currUpgrade ? currUpgrade.level + 1 : 0),
        );

        if (!nextLevel) {
          return false;
        }

        for (const skillKey in nextLevel.requirements) {
          if (nextLevel.requirements[skillKey] > state.value.levels[skillKey]) {
            return false;
          }
        }

        return true;
      };

      /**
       * @param {{ value: State }} state
       * @returns {bool}
       */
      const canUpgrade = (state) => {
        const currUpgrade = getCurrentUpgrade(state);
        const nextLevel = properties.upgrades.find(
          (u) => u.level === (currUpgrade ? currUpgrade.level + 1 : 0),
        );

        if (!nextLevel || nextLevel.cost > state.value.gold) {
          return false;
        }

        return hasRequirementsForUpgrade(state);
      };

      return {
        ...properties,
        //
        canUpgrade,
        getUpgradeCost,
        getCurrentUpgrade,
        getUpgradeValueText,
        hasRequirementsForUpgrade,
        getUpgradeRequirementText,
      };
    }
    /** @type ResourceNode[] */
    const resourceNodes = [
      {
        id: 'copper_deposit',
        name: 'Copper Deposit',
        description: 'A deposit of copper that will yield Copper Ore.',
        skill: 'mining',
        level_requirements: {
          mining: 1,
        },
        yields: [
          {
            item_id: 'copper_ore',
            xp_given: 10,
            success_chance: 1.0,
            quantity: 1,
            is_rare: false, // @TODO: Move to item?
          },
          {
            item_id: 'uncut_emerald',
            xp_given: 0,
            success_change: 0.02,
            quantity: 1,
            is_rare: true,
          },
        ],
      },
      {
        id: 'tin_deposit',
        name: 'Tin Deposit',
        description: 'A deposit of tin that will yield Tin Ore.',
        skill: 'mining',
        level_requirements: {
          mining: 1,
        },
        yields: [
          {
            item_id: 'tin_ore',
            xp_given: 10,
            success_chance: 1.0,
            quantity: 1,
            is_rare: false,
          },
          {
            item_id: 'uncut_emerald',
            xp_given: 0,
            success_change: 0.02,
            quantity: 1,
            is_rare: true,
          },
        ],
      },
      {
        id: 'iron_deposit',
        name: 'Iron Deposit',
        description: 'A deposit of iron that will yield Iron Ore.',
        skill: 'mining',
        level_requirements: {
          mining: 10,
        },
        yields: [
          {
            item_id: 'iron_ore',
            xp_given: 20,
            success_chance: 0.75,
            quantity: 1,
            is_rare: false,
          },
          {
            item_id: 'uncut_emerald',
            xp_given: 0,
            success_change: 0.04,
            quantity: 1,
            is_rare: true,
          },
        ],
      },
      {
        id: 'coal_deposit',
        name: 'Coal Deposit',
        description: 'A deposit of coal that will yield Coal.',
        skill: 'mining',
        level_requirements: {
          mining: 10,
        },
        yields: [
          {
            item_id: 'coal',
            xp_given: 20,
            success_chance: 1.0,
            quantity: 1,
            is_rare: false,
          },
        ],
      },
    ];
    const assistantFirstNames = [
      'Pebble',
      'Retch',
      'Smudge',
      'Pikwik',
      'Crum',
      'Skip',
      'Chatopher',
      'Squelch',
      'Crank',
      'Jarnathan',
      'Chonk',
      'Jough',
    ];
    const assistantLastNames = [
      'Toast',
      'Groundscore',
      'Muhhog',
      'Dingus',
      'Grubcoal',
      'Mudbritches',
      'Rubble',
      'Spitwik',
      'Jippity',
      'Grumble',
      'Wungo',
      'Dimwit',
      'Pizzle',
      'Stinkerton',
      'Rudeboy',
    ];
    /** @type Item[] */
    const items = window.items;
    /** @type Autoer[] */
    const autoers = _autoers;
    /** @type  Upgrade[] */
    const allUpgrades = _upgrades;
    /** @type {Quest[]} */
    const quests = window.quests;

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
        max_assistants: 1,
        max_available_assistants: 2,
        assistant_refresh_rate: 180000,
      },
      upgrades: [],
      purchased_autoers: [],
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
      running_autoers: {},
      running_upgrades: {},
      quests_started: [],
      quests_completed: [],
    };

    /**
     * @typedef PerkData
     * @type {object}
     * @property {string} id
     * @property {string} name
     * @property {string} description_template
     * @property {string[]} skills
     * @property {'xp' | 'selling' | 'yield' | 'interval' } affects
     *
     * @typedef Perk
     * @type {object}
     * @property {string} id
     * @property {string} name
     * @property {string} description
     * @property {number} value
     * @property {string[]} skills
     * @property {'xp' | 'selling' | 'yield' | 'interval' } affects
     */

    /**
     * @type {PerkData[]}
     */
    const perksData = [
      {
        id: 'bonus_experience',
        name: 'Bonus Experience',
        description_template: 'Assistant yields &% more experience.',
        skills: ['mining', 'smithing'],
        affects: 'xp',
      },
      {
        id: 'bonus_yield',
        name: 'Bonus Yield',
        description_template: 'Assistant has a &% chance to yield more items.',
        skills: ['mining', 'smithing'],
        affects: 'xp',
      },
      {
        id: 'bonus_gold',
        name: 'Bonus Gold',
        description_template: "Assistant's gains &% more gold from sales.",
        skills: ['selling'],
        affects: 'selling',
      },
      {
        id: 'faster_interval',
        name: 'Faster Assistant Speed',
        description_template: 'Assistant works &% faster.',
        skills: ['mining', 'smithing', 'selling'],
        affects: 'interval',
      },
    ];

    /**
     * @param {PerkData} data
     * @param {{ value: State }} state
     *
     * @returns {Perk}
     */
    const createPerkFromData = (data, state) => {
      // @TODO: Weight and scale this value based on the player's levels
      const value = Math.random();

      return {
        value,
        id: data.id,
        name: data.name,
        description: data.description_template.replace(
          '&',
          Math.floor(value * 100),
        ),
        skills: data.skills,
        affects: data.affects,
      };
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
     * @param {ResourceNode} node
     *
     * @returns {{
     *  item_id: string,
     *  quantity: number,
     *  xp_given: number,
     * }[]}
     */
    const mine = (state, node) => {
      const itemYield = [];

      node.yields.forEach((y) => {
        const baseSuccess = y.success_chance;
        const rng = Math.random();
        const bonusYieldChance = state.value.upgrades
          // @TODO: Update Upgrades to look at nodes not items
          .filter(
            (u) => u.affects === node.id && u.category === 'mining_excess',
          )
          .reduce((total, curr) => (total += curr.value), 0);
        const currLvl = state.value.levels.mining;
        let yield = 0;

        if (y.is_rare) {
          yield = rng < baseSuccess ? 1 : 0;
        } else if (
          baseSuccess === 1.0 ||
          currLvl >= node.level_requirements.mining * 2 ||
          rng < baseSuccess + currLvl / (node.level_requirements.mining * 2)
        ) {
          yield = 1;
        }

        // @TODO: We want the bonus chance to scale down if the level is not 2x required level.
        if (rng < bonusYieldChance && yield > 0) {
          yield += 1;
        }

        itemYield.push({
          item_id: y.item_id,
          quantity: yield,
          xp_given: y.xp_given,
        });
      });

      return itemYield;
    };

    /**
     * @param {{ value: State }} state
     * @param {ResourceNode} node
     */
    const userDidMine = (state, node) => {
      const gathered = mine(state, node);

      gathered
        .filter((g) => g.quantity > 0)
        .forEach((g) => {
          updateXp(state, 'mining', g.xp_given);
          updateInventory(state, g.item_id, g.quantity);
          // updateStats(state, 'gathers', node, gathered);
        });
    };

    /**
     * @param {{ value: State }} state
     * @param {ResourceNode | Item} target
     * @param {'mining' | 'smithing' | 'selling'} action
     */
    const autoerAction = (state, target, action) => {
      const xpPercentUpgrade = state.value.upgrades.find(
        (u) => u.id === `autoer_${action}_xp`,
      );
      let xpPercent = 0;
      let xp = 0;
      let yield = 0;

      if (xpPercentUpgrade) {
        xpPercent = xpPercentUpgrade.upgrades.find(
          (u) => u.level === xpPercentUpgrade.level,
        )?.value;
      }

      switch (action) {
        case 'mining':
          mine(state, target)
            .filter((m) => m.quantity > 0)
            .forEach((m) => {
              updateInventory(state, m.item_id, m.quantity);

              if (xpPercent > 0) {
                updateXp(state, 'mining', m.xp_given * xpPercent);
                updateStats(
                  state,
                  'gathers',
                  items.find((i) => i.item_id === m.item_id),
                  m.quantity,
                );
              }
            });
          break;

        case 'smithing':
          // @TODO: Figure out race condition that forces this to be necessary
          if (hasIngredientsFor(state, target)) {
            const result = smith(state, target);
            yield = result.success ? result.result[0].quantity : 0;
            xp = Math.floor(target.xp_given * xpPercent);

            result.result
              .filter((r) => r.quantity < 0)
              .forEach((r) => updateInventory(state, r.item_id, r.quantity));
          }
          break;

        case 'selling':
          sellItem(state, target);
          break;
      }

      if (xp > 0 && action !== 'selling') {
        updateXp(state, action, xp);
      }

      if (yield > 0 && action === 'selling') {
        updateStats(state, 'sales', null, yield);
      } else if (yield > 0) {
        updateStats(
          state,
          action === 'mining' ? 'gathers' : 'crafts',
          target,
          yield,
        );
      }

      if (target && action !== 'mining') {
        updateInventory(state, target.item_id, yield);
      }
    };

    /**
     * @param {{ value: State }} state
     * @param {PurchasedAssistant} assistant
     * @param {ResourceNode} node
     */
    const assistantDidMine = (state, assistant, node) => {
      let xp = 0;

      mine(state, node)
        .filter((m) => m.quantity)
        .forEach((m) => {
          let gathered = m.quantity;
          let xpGained = m.xp_given;

          if (assistant.perk.affects === 'xp') {
            xpGained =
              m.xp_given + Math.floor(m.xp_given * assistant.perk.value);
          } else if (assistant.perk.affects === 'yield') {
            if (Math.random() < assistant.perk.value) {
              gathered += Math.floor(Math.random() * (3 - 1 + 1) + 1);
            }
          }

          xp += xpGained;
          updateInventory(state, m.item_id, gathered);
          updateStats(
            state,
            'gathers',
            items.find((i) => i.item_id === m.item_id),
            gathered,
          );
        });

      updateXp(state, 'mining', xp);
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
        let idx = state.value.stats.crafts.findIndex(
          (i) => i.item_id === item.item_id,
        );

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
          xp = item.xp_given + Math.floor(item.xp_given * assistant.perk.value);
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
          updateInventory(state, invUpdate.item_id, invUpdate.quantity),
        );
      }
    };

    /**
     * @param {Upgrade} autoer
     * @param {{ id: string, const: number, level: number, value: number }} upgraded
     * @param {{ value: State }} state
     */
    const upgradeAutoer = (autoer, upgraded, state) => {
      if (state.value.running_autoers[autoer.id]) {
        autoer.fn(state);
        clearInterval(state.value.running_autoers[autoer.id]);
      }

      state.value.running_autoers[autoer.id] = setInterval(() => {
        autoer.fn(state);
      }, upgraded.value);
    };

    /**
     * @TODO Might be good to make Upgrades an object that
     * has some of these functions on them. :)
     *
     * @param {Upgrade | Autoer} upgrade
     * @param {number} level
     * @param {{ value: State }} state
     */
    const upgrade = (upgrade, level, state) => {
      let targetStateKey = 'upgrades';
      let up;

      if (level === 0) {
        up = {
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
        targetStateKey = 'purchased_autoers';
        upgrade.fn = () => {
          let eligibleItems;

          if (
            upgrade.affects.includes('_weapons') ||
            upgrade.affects.includes('_armor')
          ) {
            const age = upgrade.affects.split('_')[0];
            const cat = upgrade.affects.split('_')[1];
            eligibleItems = items.filter(
              (i) => i.categories.includes(cat) && i.categories.includes(age),
            );
          } else if (upgrade.skill === 'mining') {
            eligibleItems = resourceNodes.filter(
              (i) => i.id === upgrade.affects,
            );
          } else {
            eligibleItems = items.filter((i) => i.item_id === upgrade.affects);
          }

          const eligibleItem =
            eligibleItems[Math.floor(Math.random() * eligibleItems.length)];

          if (
            upgrade.skill === 'smithing' &&
            !hasIngredientsFor(state, eligibleItem)
          ) {
            return;
          }

          autoerAction(state, eligibleItem, upgrade.skill);
        };
        upgradeAutoer(upgrade, up, state);
      } else if (upgrade.id === 'money_is_time') {
        // @TODO: Finish all running autoers + update their intervals
        // Also create a function to do this rather than repeating code
      } else if (upgrade.category === 'shop') {
        // Bleh
        const path = upgrade.affects.split('.');
        let p = '';
        let target = state.value;

        while (path.length > 1) {
          p = path.shift();

          if (target.hasOwnProperty(p)) {
            target = target[p];
          } else {
            break;
          }
        }

        // I don't particularly like abusing JS like this but
        // itiswhatitis.jpg
        p = path.shift();

        if (target.hasOwnProperty(p)) {
          target[p] = up.value;
        }
      }

      const currIdx = state.value[targetStateKey].findIndex(
        (u) => u.id === upgrade.id,
      );

      if (currIdx === -1) {
        state.value[targetStateKey].push({
          ...upgrade,
          ...up,
        });
      } else {
        state.value[targetStateKey][currIdx] = {
          ...upgrade,
          cost: up.cost,
          level: up.level,
          value:
            level !== 0 && upgrade.category !== 'autoer'
              ? up.value + state.value[targetStateKey][currIdx].value
              : up.value,
        };
      }
    };

    /**
     * @param {Upgrade} toUpgrade
     * @param {{ value: State }} state
     */
    const userPurchasedUpgrade = (toUpgrade, state) => {
      // @TODO: Find the upgrade level to purchase
      const key =
        toUpgrade.category === 'autoer' ? 'purchased_autoers' : 'upgrades';
      let currUpgrade = state.value[key].find((u) => u.id === toUpgrade.id);
      let level = 0;

      if (currUpgrade) {
        level = currUpgrade.level + 1;
      }

      if (!currUpgrade) {
        currUpgrade = new UpgradableEntity(toUpgrade);
      }

      const cost = currUpgrade.getUpgradeCost(state);

      if (level !== 0) {
        upgrade(currUpgrade, currUpgrade.level + 1, state);
      } else {
        upgrade(currUpgrade, 0, state);
      }

      state.value.gold -= cost;
    };

    /**
     * @param {Autoer} autoer
     * @param {{ value: State }} state
     */
    const userPurchasedAutoer = (autoer, state) => {};

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

      let idx = state.value.stats[stat].findIndex(
        (i) => i.item_id === item.item_id,
      );

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

      let statIdx = state.value.stats.sales.findIndex(
        (i) => i.item_id === item.item_id,
      );

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
      if (
        !state.value.inventory.find(
          (i) => i.item_id === item.item_id && i.quantity > 0,
        )
      ) {
        console.log(`Not enough inventory for assistant to sell ${item.name}`);
        return;
      }

      let gold = item.value;

      if (assistant.perk.affects === 'selling') {
        gold += Math.ceil(gold * assistant.perk.value);
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
      return (
        state.value.inventory.find((i) => i.item_id === key)?.quantity ?? 0
      );
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
              requiredQuests.filter((q) =>
                state.value.quests_completed.includes(q),
              ).length === requiredQuests.length;

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
     * @param {{ value: State }} state
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
        questStep.requirements.items?.filter(
          (i) =>
            getInventoryItem(state, i.item_id) < i.value ||
            getInventoryItem(state, i.item_id) === 0,
        ).length > 0
      ) {
        return false;
      }

      if (
        questStep.requirements.upgrades?.length &&
        state.value.upgrades.filter((u) =>
          questStep.requirements.upgrades.find(
            (uu) => uu.upgrade_id === u.id && uu.value > u.level,
          ),
        ).length < questStep.requirements.upgrades.length
      ) {
        return false;
      }

      // @TODO: Zzzz this is redundant from the above
      if (
        questStep.requirements.autoers?.length &&
        state.value.purchased_autoers.filter((u) =>
          questStep.requirements.autoers.find(
            (uu) => uu.upgrade_id === u.id && uu.value > u.level,
          ),
        ).length < questStep.requirements.autoers.length
      ) {
        return false;
      }

      return true;
    };

    /**
     * @param {Quest} quest
     * @param {number} step
     */
    const completeQuestStep = (quest, step, state) => {
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

      currStep.requirements.items
        .filter((i) => i.consumed)
        .forEach((i) => updateInventory(state, i.item_id, i.value * -1));
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
     * @param {{ value: State }} state
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
          case 'assistant':
            const assistant = generateRandomAssistant(state, reward.affects);

            if (reward.item_id !== 'assistant') {
              // Kind of a placeholder
              assistant.name = reward.item_id;
            }

            hireAssistant(assistant, state);
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
          avail = items.filter(
            (i) => i.skill === skill && i.level <= state.value.levels[skill],
          );
        }

        hiredAssistant.config[skill] = avail.map((i) => i.item_id);
      }

      if (assistant.perk.affects === 'interval') {
        hiredAssistant.interval -=
          hiredAssistant.interval * assistant.perk.value;
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
        state.value.assistants[idx].config[key] = newConfig[string];
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
     * @param {PurchasedAssistant} assistant
     * @param {{ value: State }} state
     * @returns {function[]}
     */
    const getAssistantJobFunctions = (assistant, state) => {
      const jobs = [];

      for (const key in assistant.config) {
        let actionFn;
        let actionableItems;

        jobs.push(() => {
          switch (key) {
            case 'mining':
              actionFn = assistantDidMine;
              actionableItems = resourceNodes.filter(
                (i) =>
                  i.skill === 'mining' &&
                  i.yields.filter((y) =>
                    assistant.config[key].includes(y.item_id),
                  ).length,
              );
              break;

            case 'smithing':
              actionFn = assistantDidSmith;
              actionableItems = items.filter(
                (i) =>
                  i.skill === 'smithing' &&
                  assistant.config[key].includes(i.item_id) &&
                  hasIngredientsFor(state, i),
              );
              break;

            case 'selling':
              actionFn = assistantDidSell;
              actionableItems = items.filter(
                (i) =>
                  state.value.inventory.find(
                    (ii) => ii.item_id === i.item_id && ii.quantity > 0,
                  ) && assistant.config[key].includes(i.item_id),
              );
              break;
          }

          if (!actionableItems.length) {
            return;
          }

          let actionItem = actionableItems[0];

          if (actionableItems.length > 1) {
            actionItem =
              actionableItems[
                Math.floor(Math.random() * actionableItems.length)
              ];
          }

          if (
            actionFn === assistantDidSmith &&
            !hasIngredientsFor(state, actionItem)
          ) {
            return;
          }

          if (
            actionFn &&
            actionItem &&
            state.value.gold >= assistant.cost_per_action
          ) {
            state.value.gold -= assistant.cost_per_action;
            actionFn(state, assistant, actionItem);
          }
        });
      }

      return jobs;
    };

    /**
     * @TODO I should honestly standardize upgrades, including assistants, so
     * I don't have to keep re-doing this logic.
     *
     * @param {Assistant} assistant
     * @param {{ value: State }} state
     * @returns {bool}
     */
    const canHireAssistant = (assistant, state) => {
      const currLvl = state.value.assistants.find((a) => a.id === assistant.id);
      const nextLvl = currLvl ? currLvl.level + 1 : 0;
      const requirements = assistant.upgrades.find((u) => u.level === nextLvl);

      return (
        state.value.gold >= requirements.cost &&
        hasRequirementsForAssistant(assistant, state)
      );
    };

    /**
     * @param {Assistant} assistant
     * @param {{ value: State }} state
     * @returns {bool}
     */
    const hasRequirementsForAssistant = (assistant, state) => {
      const currLvl = state.value.assistants.find((a) => a.id === assistant.id);
      const nextLvl = currLvl ? currLvl.level + 1 : 0;
      const requirements = assistant.upgrades.find((u) => u.level === nextLvl);

      if (!requirements) {
        return true;
      }

      for (const key in requirements.requirements) {
        if (state.value.levels[key] < requirements.requirements[key]) {
          return false;
        }
      }

      return true;
    };

    /**
     * @param {'mining' | 'smithing' | 'selling'} skill
     * @param {{ value: State }} state
     * @returns {Perk}
     */
    const generateAssistantPerk = (skill, state) => {
      const available = perksData.filter((p) => p.skills.includes(skill));
      const perkData = available.sort(
        () =>
          Math.random() * available.length - Math.random() * available.length,
      )[0];
      return createPerkFromData(perkData, state);
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
      const baseValues = [2500, 1750, 1450, 950, 850];
      const levels = [];

      for (let i = 0; i < 5; i++) {
        // @TODO: Implement selling "store owner" skill
        // Yeah yeah overriding a param is bad. Sue me
        if (skill === 'selling') {
          skill = 'mining';
        }

        const currLvl = state.value.levels[skill];
        let value = baseValues[i];

        if (perk.affects === 'interval') {
          value -= value * perk.value;
        }

        levels.push({
          value,
          level: i,
          cost: Math.ceil(350 + 75 * Math.pow(i, 2) + 175 * i),
          requirements: {
            [skill]: Math.ceil(currLvl + 0.75 * Math.pow(i, 2) + 1.5 * i),
          },
        });
      }

      return levels;
    };

    /**
     * @returns {string}
     */
    const generateAssistantName = () => {
      function scrambleArray(arr) {
        const a = Math.floor(Math.random() * arr.length);
        const b = Math.floor(Math.random() * arr.length);
        return arr.sort(() => a - b);
      }

      const f =
        scrambleArray(assistantFirstNames)[
          Math.floor(Math.random() * assistantFirstNames.length)
        ];
      const l =
        scrambleArray(assistantLastNames)[
          Math.floor(Math.random() * assistantLastNames.length)
        ];

      return `${f} ${l}`;
    };

    /**
     * @param {{ value: State }} state
     * @param {('mining' | 'smithing' | 'selling')?} preferredSkill
     * @returns {Assistant}
     */
    const generateRandomAssistant = (state, preferredSkill) => {
      const skills = ['mining', 'smithing', 'selling'];
      const skill =
        preferredSkill ??
        skills.sort(
          () => Math.floor(Math.random() * 3) - Math.floor(Math.random() * 3),
        )[0];
      const perk = generateAssistantPerk(skill, state);
      const id = Math.floor(Math.random() * 100000);
      /** @type {Assistant} */
      const assistant = {
        id,
        name: generateAssistantName(),
        // @TODO Add scaling for cost per action
        cost_per_action: Math.floor(Math.random() * 10),
        skills: [skill],
        perk: perk,
        upgrades: generateAssistantLevels(skill, perk, state),
      };

      return assistant;
    };

    const { createApp, ref, computed } = Vue;

    createApp({
      setup() {
        /** @type {{ value: State }} s */
        const s = ref({ ...state });
        /** @type {{ value: Assistant[] }} */
        const assistants = ref([]);
        const statsShown = ref(false);
        const currentQuest = ref(null);
        const viewingQuest = ref(null);
        const questMinimized = ref(false);
        const configuringAssistant = ref(null);
        /** @type {{ value: PurchasedAssistant }} */
        const firingAssistant = ref(null);
        const availableOreList = computed(() =>
          resourceNodes.filter(
            (i) =>
              i.skill === 'mining' &&
              i.level_requirements.mining <= s.value.levels.mining,
          ),
        );
        const availabeSmithableList = computed(() =>
          items.filter(
            (i) => i.skill === 'smithing' && i.level <= s.value.levels.smithing,
          ),
        );
        const availableQuests = computed(() =>
          quests.filter((q) => !s.value.quests_completed.includes(q.id)),
        );
        const availableUpgrades = computed(() =>
          allUpgrades
            .filter((u) => !s.value.upgrades.find((uu) => uu.id === u.id))
            .map((u) => new UpgradableEntity(u))
            .filter((u) => u.hasRequirementsForUpgrade(s)),
        );
        const availableAutoers = computed(() =>
          autoers
            .filter(
              (a) => !s.value.purchased_autoers.find((aa) => aa.id === a.id),
            )
            .map((a) => new UpgradableEntity(a))
            .filter((a) => a.hasRequirementsForUpgrade(s)),
        );
        const availableAssistants = computed(() =>
          assistants.value.filter((a) => hasRequirementsForAssistant(a, s)),
        );
        // hehexdd
        window.toggleStats = () => {
          statsShown.value = !statsShown.value;
        };
        window.generateAssistantName = generateAssistantName;

        // Every 3 minutes give the user a new assistant to hire
        setInterval(() => {
          // Don't generate assistants if they haven't completed the quest
          if (!s.value.quests_completed.includes('introduction_assistants')) {
            return;
          }

          const assistant = generateRandomAssistant(s);

          if (
            assistants.value.length >
            s.value.global_variables.max_available_assistants
          ) {
            assistants.value.shift();
          }

          assistants.value.push(assistant);
        }, s.value.global_variables.assistant_refresh_rate);

        return {
          s,
          items,
          statsShown,
          availableOreList,
          availabeSmithableList,
          availableQuests,
          availableUpgrades,
          availableAutoers,
          availableAssistants,
          currentQuest,
          viewingQuest,
          questMinimized,
          configuringAssistant,
          firingAssistant,
          currentAutoers: computed(() => {
            return s.value.purchased_autoers.map((a) => {
              return autoers.find((aa) => aa.id === a.id);
            });
          }),
          toggleStats: () => toggleStats,
          /**
           * @param {ResourceNode} node
           */
          userDidMine: (node) => userDidMine(s, node),
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
          hasInventory: (item) =>
            !!s.value.inventory.find(
              (i) => i.item_id === item.item_id && i.quantity > 0,
            ),
          /**
           * @param {Item} item
           * @returns {bool}
           */
          userCanCraft: (item) => hasIngredientsFor(s, item),
          toggleQuestBody: () => (questMinimized.value = !questMinimized.value),
          /**
           * @param {Quest} quest
           */
          updateQuestPanel: (quest) => {
            // le`sigh
            window.scrollTo(0, 0);
            viewingQuest.value =
              quest.id === viewingQuest.value?.id ? null : quest;
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
          getCurrentQuestStep: () =>
            s.value.quests_started.length
              ? s.value.quests_started[0].step
              : null,
          canCompleteQuestStep: (quest) => {
            const currentStep = s.value.quests_started[0].step;
            return canCompleteQuestStep(quest, currentStep, s);
          },
          canCompleteQuest: (quest) => canCompleteQuest(quest, s),
          completeQuestStep: () => {
            const currentStep = s.value.quests_started[0].step;
            const hasMoreSteps = currentQuest.value.steps.find(
              (s) => s.id === currentStep + 1,
            );

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
          isQuestStarted: (quest) =>
            !!s.value.quests_started.find((q) => q.quest_id === quest.id),
          closeQuestPanel: () => (viewingQuest.value = null),
          xpForSkill: (skill) => {
            return Math.floor(
              (s.value.xp[`${skill}_xp_level`] /
                getXpForLevel(s.value.levels[skill])) *
                100,
            );
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
           */
          userPurchasedUpgrade: (upgrade) => userPurchasedUpgrade(upgrade, s),
          /**
           * @param {Assistant} assistant
           * @returns {bool}
           */
          canHireAssistant: (assistant) => {
            return (
              s.value.global_variables.max_assistants >
                s.value.assistants.length && canHireAssistant(assistant, s)
            );
          },
          /**
           * @param {PurchasedAssistant} assistant
           * @returns {bool}
           */
          canUpgradeAssistant: (assistant) => canHireAssistant(assistant, s),
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
          /**
           * @param {PurchasedAssistant} assistant
           */
          hireAssistant: (assistant) => {
            hireAssistant(assistant, s);
            assistants.value = assistants.value.filter(
              (a) => a.id !== assistant.id,
            );
            configuringAssistant.value =
              s.value.assistants[s.value.assistants.length - 1];
          },
          /**
           * @param {PurchasedAssistant} assistant
           */
          confirmFireAssistant: (assistant) => {
            firingAssistant.value = assistant;
          },
          cancelFiring: () => {
            firingAssistant.value = null;
          },
          /**
           * @param {PurchasedAssistant} assistant
           */
          fireAssistant: (assistant) => {
            clearInterval(firingAssistant.value.interval_id);
            s.value.assistants = s.value.assistants.filter(
              (a) => a.id !== assistant.id,
            );
            firingAssistant.value = null;
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
            const idx = s.value.assistants.findIndex(
              (a) => a.id === purchasedAssistant.id,
            );

            if (idx === -1) {
              console.log(`unable to update ${purchasedAssistant.id}`);
              return;
            }

            s.value.assistants[idx] = JSON.parse(
              JSON.stringify(purchasedAssistant),
            );
            configuringAssistant.value = null;

            updateAssistantJobs(s.value.assistants[idx].id, s);
          },
          /**
           * @param {PurchasedAssistant} purchasedAssistant
           */
          upgradeAssistant: (purchasedAssistant) => {
            const nxtLvl = purchasedAssistant.upgrades.find(
              (u) => u.level === purchasedAssistant.level + 1,
            );

            if (!nxtLvl) {
              return;
            }

            const { cost } = nxtLvl;

            if (cost > s.value.gold) {
              return;
            }

            if (!hasRequirementsForAssistant(purchasedAssistant, s)) {
              return;
            }

            s.value.gold -= cost;
            let currCost = purchasedAssistant.cost_per_action;
            let perkVal = purchasedAssistant.perk.value;
            purchasedAssistant.level = nxtLvl.level;
            purchasedAssistant.interval = nxtLvl.value;
            purchasedAssistant.cost_per_action += Math.floor(
              currCost * (nxtLvl.level + 1 * 0.025) * 0.15 +
                s.value.levels[purchasedAssistant.skills[0]] * 0.08,
            );
            purchasedAssistant.perk.value +=
              Math.floor(
                perkVal +
                  nxtLvl.level * 0.25 +
                  s.value.levels[purchasedAssistant.skills[0]] * 0.15,
              ) / 100;
            purchasedAssistant.perk.description = perksData
              .find((p) => p.id === purchasedAssistant.perk.id)
              ?.description_template.replace(
                '&',
                Math.floor(purchasedAssistant.perk.value * 100),
              );
            updateAssistantJobs(purchasedAssistant.id, s);
          },
          /**
           * @param {PurchasedAssistant} purchasedAssistant
           * @returns {number}
           */
          getAssistantUpgradeCost: (purchasedAssistant) => {
            const nxtLvl = purchasedAssistant.upgrades.find(
              (u) => u.level === purchasedAssistant.level + 1,
            );

            if (!nxtLvl) {
              return 0;
            }

            return nxtLvl.cost;
          },
          /**
           * @param {PurchasedAssistant} assistant
           * @returns {string}
           */
          getAssistantUpgradeTitle: (assistant) => {
            const nxtLvl = assistant.upgrades.find(
              (u) => u.level === assistant.level + 1,
            );

            if (!nxtLvl) {
              return 'Max';
            }

            let str = 'Requires';

            for (const skillKey in nxtLvl.requirements) {
              str += ` ${skillKey}: ${nxtLvl.requirements[skillKey]}`;
            }

            return str;
          },
          /**
           * @param {PurchasedAssistant} purchasedAssistant
           * @returns {string}
           */
          getAssistantJob: (purchasedAssistant) => {
            return (
              s.value.assistants
                .find((a) => a.id === purchasedAssistant.id)
                ?.skills.join(',') ?? 'N/A'
            );
          },
          /**
           * @param {PurchasedAssistant} purchasedAssistant
           * @param {'mining' | 'smithing' | 'selling'} jobType
           * @param {string} itemId
           */
          toggleAssistantJob: (purchasedAssistant, jobType, itemId) => {
            if (purchasedAssistant.config[jobType].includes(itemId)) {
              purchasedAssistant.config[jobType] = purchasedAssistant.config[
                jobType
              ].filter((i) => i !== itemId);
            } else {
              purchasedAssistant.config[jobType].push(itemId);
            }
          },
          getBankSaleValue: () => {
            return s.value.inventory.reduce((curr, inv) => {
              return (curr +=
                inv.quantity *
                items.find((i) => i.item_id === inv.item_id).value);
            }, 0);
          },
          bankSale: () => {
            const total = s.value.inventory.reduce((curr, inv) => {
              return (curr +=
                inv.quantity *
                items.find((i) => i.item_id === inv.item_id).value);
            }, 0);

            s.value.inventory.forEach((inv) => {
              inv.quantity = 0;
            });
            s.value.gold += total;
            s.value.stats.lifetime_wealth += total;
          },
        };
      },
    }).mount('.wrapper');
  }
)();
