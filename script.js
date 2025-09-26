/**
 * @typedef Item
 * @type {object}
 * 
 * @property {string} item_id
 * @property {string} name
 * @property {string} skill
 * @property {number} level
 * @property {number} value
 * @property {number} xp_given
 * @property {number} success_chance
 * @property {boolean} sellable
 * @property {{item_id: string, quantity: number}[]?} ingredients
 */

/**
 * @typedef Upgrade
 * @type {object}
 * 
 * @property {string} id
 * @property {string} name
 * @property {number} interval
 * @property {string} affects
 * @property {number} cost
 * @property {string} category
 * @property {{ id: string, level: number, cost: number, value: number }[]} upgrades
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
 * @property {number} mining_level
 * @property {{mining: number, smithing: number}} levels
 * @property {{mining: number, mining_next_leve: number; smithing_next_level: number, smithing: number}} xp
 * @property {PurchasedUpgrade[]} upgrades
 * @property {{[string]: number}} inventory
*/

(function() {
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
            categories: [],
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
            categories: [],
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
            categories: [],
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
            level: 1,
            value: 24,
            skill: 'smithing',
            name: 'Bronze Sword',
            success_change: 1.0,
            xp_given: 10,
            sellable: true,
            categories: [],
            ingredients: [
                {
                    item_id: 'bronze_bar',
                    quantity: 3,
                }
            ]
        },
        {
            item_id: 'iron_ore',
            level: 10,
            value: 12,
            skill: 'mining',
            name: 'Iron Ore',
            xp_given: 20,
            success_chance: 0.75,
        },
        {
            item_id: 'iron_bar',
            level: 10,
            value: 15,
            skill: 'smithing',
            name: 'Iron Bar',
            success_chance: 0.65,
            xp_given: 15,
            ingredients: [
                {
                    item_id: 'iron_ore',
                    quantity: 1,
                }
            ]
        },
        {
            item_id: 'iron_sword',
            level: 12,
            value: 68,
            skill: 'smithing',
            name: 'Iron Sword',
            description: 'A sword made of iron.',
            success_chance: 1.0,
            xp_given: 25,
            ingredients: [{
                item_id: 'iron_bar',
                quantity: 3,
            }]
        }
    ];
    const allUpgrades = [
        {
            id: 'automine_copper',
            name: 'Copper Autominer',
            value: 2000,
            cost: 25,
            affects: 'copper_ore',
            category: 'autoer',
            upgrades: [
                {
                    level: 1,
                    cost: 75,
                    value: 1750,
                },
                {
                    level: 2,
                    cost: 125,
                    value: 1500,
                },
                {
                    level: 3,
                    cost: 175,
                    value: 1250,
                },
                {
                    level: 4,
                    cost: 225,
                    value: 1000,
                }
            ],
            fn: () => userDidMine(items.find((i) => i.item_id === 'copper_ore')),
        },
        {
            id: 'automine_tin',
            name: 'Tin Autominer',
            value: 2000,
            cost: 25,
            affects: 'copper_tin',
            category: 'autoer',
            upgrades: [
                {
                    level: 1,
                    cost: 75,
                    value: 1750,
                },
                {
                    level: 2,
                    cost: 125,
                    value: 1500,
                },
                {
                    level: 3,
                    cost: 175,
                    value: 1250,
                },
                {
                    level: 4,
                    cost: 225,
                    value: 1000,
                }
            ],
            fn: () => userDidMine(items.find((i) => i.item_id === 'tin_ore')),
        },
        {
            id: 'autosmelt_bronze',
            name: 'Bronze Autosmelter',
            value: 2000,
            cost: 100,
            affects: 'bronze_bar',
            category: 'autoer',
            upgrades: [
                {
                    level: 1,
                    cost: 200,
                    value: 1750,
                },
                {
                    level: 2,
                    cost: 350,
                    value: 1500,
                },
                {
                    level: 3,
                    cost: 500,
                    value: 1250,
                },
            ],
            fn: () => userDidSmith(items.find((i) => i.item_id === 'bronze_bar')),
        },
        {
            id: 'autoforge_bronze_sword',
            name: 'Bronze Sword Autohammer',
            value: 2000,
            cost: 200,
            affects: 'bronze_sword',
            category: 'autoer',
            upgrades: [
                {
                    level: 1,
                    cost: 300,
                    value: 1750,
                },
                {
                    level: 2,
                    cost: 450,
                    value: 1500,
                },
                {
                    level: 3,
                    cost: 600,
                    value: 1250,
                },
            ],
            fn: () => userDidSmith(items.find((i) => i.item_id === 'bronze_sword')),
        },
        {
            id: 'copper_mining_excess',
            name: 'Mining: Excess Copper',
            description: 'Chance to get some extra copper',
            cost: 100,
            value: 0.1,
            affects: 'copper_ore',
            category: 'mining_excess',
            upgrades: [
                {
                    id: 'copper_mining_excess',
                    level: 1,
                    value: 0.15,
                    cost: 275,
                },
                {
                    id: 'copper_mining_excess',
                    level: 2,
                    value: 0.25,
                    cost: 350,
                },
                {
                    id: 'copper_mining_excess',
                    level: 3,
                    value: 0.75,
                    cost: 500,
                },
                {
                    id: 'copper_mining_excess',
                    level: 4,
                    value: 1.00,
                    cost: 1000,
                }
            ]
        },
        {
            id: 'tin_mining_excess',
            name: 'Mining: Excess Tin',
            description: 'Chance to get some extra tin',
            cost: 100,
            value: 0.1,
            affects: 'tin_ore',
            category: 'mining_excess',
            upgrades: [
                {
                    id: 'tin_mining_excess',
                    level: 1,
                    value: 0.15,
                    cost: 275,
                },
                {
                    id: 'tin_mining_excess',
                    level: 2,
                    value: 0.25,
                    cost: 350,
                },
                {
                    id: 'tin_mining_excess',
                    level: 3,
                    value: 0.75,
                    cost: 500,
                },
                {
                    id: 'tin_mining_excess',
                    level: 4,
                    value: 1.00,
                    cost: 1000,
                }
            ]
        },
        {
            id: 'iron_mining_mastery',
            name: 'Mining: Iron Mastery',
            cost: 200,
            value: 0.08,
            affects: 'iron_ore',
            category: 'mining_mastery',
            upgrades: [
                {
                    level: 1,
                    cost: 300,
                    value: 0.08,
                },
                {
                    level: 2,
                    cost: 450,
                    value: 0.08,
                },
                {
                    level: 3,
                    cost: 600,
                    value: 0.09,
                },
            ],
        }
    ];

    /** @type {State} */
    const state = {
        gold: 1000,
        levels: {
            mining: 10,
            smithing: 1,
        },
        xp: {
            mining: 0,
            mining_next_level: 100,
            smithing: 0,
            smithing_next_level: 100,
        },
        upgrades: [],
        inventory: {
            copper_ore: 0,
            tin_ore: 0,
            bronze_bar: 0,
            iron_ore: 0,
            iron_bar: 0,
        },
        running_upgrades: {},
    };

    /**
     * @param {Item} item 
     * 
     * @return {bool}
     */
    const hasIngredientsFor = (item) => {
        const ingredients = item.ingredients;
        let hasIngredients = true;

        ingredients.forEach((ingredient) => {
            if (state.inventory[ingredient.item_id] < ingredient.quantity) {
                hasIngredients = false;
                return;
            }
        });

        return hasIngredients;
    };

    /**
     * @param {string} key 
     * @param {number} value 
     */
    const updateXp = (key, value) => {
        const nxtLvlKey = `${key}_next_level`;
        state.xp[key] += value;

        if (state.xp[key] >= state.xp[nxtLvlKey]) {
            state.xp[nxtLvlKey] += Math.floor(state.xp[nxtLvlKey] * 1.025);
            state.levels[key] += 1;
        }
    };

    /**
     * @param {Item} item 
     * 
     * @return {number}
     */
    const mine = (item) => {
        const baseSuccess = item.success_chance;
        const rng = Math.random();
        const bonusYieldChance = state.upgrades.filter((u) => u.affects === item.id && u.category === 'mining_excess')
            .reduce((total, curr) => (total += curr.value), 0);
        const yield = rng < bonusYieldChance ? 2 : 1;
    
        if (baseSuccess === 1.0) {
            console.log(rng, bonusYieldChance, yield);
            return yield;
        }
        
        const bonusSuccess = state.upgrades.filter((u) => u.affects === item.id && u.category === 'mining_mastery')
            .reduce((total, curr) => (total += curr.value), 0);


        return rng < baseSuccess + bonusSuccess ? yield : 0;
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
     * @return {}
     */
    const smith = (item) => {
        // @TODO: Do some fancy maths to get % chance success
        const result = {
            success: true,
            result: [
                { item_id: item.item_id, quantity: 1, },
            ],
        };

        item.ingredients.forEach((ing) => result.result.push({ item_id: ing.item_id, quantity: ing.quantity * -1 }));

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

        result.result.forEach((invUpdate) => updateInventory(invUpdate.item_id, invUpdate.quantity));
        render();
    };

    /**
     * @param {Upgrade} upgrade 
     * @param {{ id: string, const: number, level: number, value: number }} upgraded 
     */
    const upgradeAutoer = (upgrade, upgraded) => {
        if (state.running_upgrades[upgrade.id]) {
            console.log('immediately running current auto op');
            upgrade.fn();
            clearInterval(state.running_upgrades[upgrade.id]);
        }

        console.log(`upgrading ${upgrade.affects} to ${upgraded.value}`);
        state.running_upgrades[upgrade.id] = setInterval(() => {
            console.log(`automining ${upgrade.affects}`);
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
            up = { id: upgrade.id, level: 0, cost: upgrade.cost, value: upgrade.value };
        } else {
            up = upgrade.upgrades.find((u) => u.level === level);
        }

        if (!up) {
            console.log('no upgrade found');
            return;
        }

        if (upgrade.category === 'autoer') {
            upgradeAutoer(upgrade, up);
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
            value: level !== 0 && upgrade.category !== 'autoer' ? up.value + state.upgrades[currIdx].value: up.value,
            category: upgrade.category,
        };
    };

    /**
     * @param {Upgrade} upgrade 
     * 
     * @return {number}
     */
    const getUpgradeCost = (upgrade) => {
        const currUpgrade = state.upgrades.find((u) => u.id === upgrade.id);

        if (!currUpgrade) {
            return upgrade.cost;
        }

        const currPurchased = upgrade.upgrades.find((u) => u.level === currUpgrade.level);
        const cost = upgrade.upgrades.find((u) => u.level === currUpgrade.level + 1);
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
        if (!state.inventory.hasOwnProperty(key)) {
            state.inventory[key] = 0;
        }

        console.log(key, value);
        state.inventory[key] += value;
    };

    /**
     * @param {Item} item 
     */
    const sellItem = (item) => {
        state.gold += item.value;
    };

    const userDidSell = (item) => {
        sellItem(item);
        updateInventory(item.item_id, -1);
        render();
    }

    /**
     * @param {string} key 
     * 
     * @return {number|null}
     */
    const getInventoryItem = (key) => {
        return state.inventory[key] ?? null;
    };

    const renderInventory = () => {
        const parent = document.querySelector('.inventory');
        // hehexdd
        parent.innerHTML = '';

        const goldLi = document.createElement('li');
        goldLi.textContent = `Gold: ${state.gold}`;
        parent.appendChild(goldLi);

        for (const key in state.inventory) {
            const item = items.find((i) => i.item_id === key);

            if (!item || item.level > state.levels[item.skill]) {
                continue;
            }

            const li = document.createElement('li');
            li.textContent = `${item.name}: ${state.inventory[key]}`;
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
    };

    const renderLevels = () => {
        const parent = document.querySelector('.levels');
        parent.innerHTML = null;

        for (const key in state.levels) {
            const li = document.createElement('li');
            const progBar = document.createElement('progress');

            progBar.value = state.xp[key];
            progBar.max = state.xp[`${key}_next_level`];

            li.innerText = key;
            li.appendChild(progBar)
            parent.appendChild(li);
        }
    }

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

    const renderAvailableUpgrades = () => {
        const parent = document.querySelector('.available-upgrades');
        parent.innerHTML = null;

        for (const upgrade of allUpgrades) {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            const currUpgrade = state.upgrades.find((u) => u.id === upgrade.id);
            const maxUpgrade = allUpgrades.find((u) => u.id === upgrade.id)
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
            if (cost > state.gold || (currUpgrade && currUpgrade.level >= maxUpgrade.level)) {
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
        
        if (!state.inventory[item.item_id] || state.inventory[item.item_id] <= 0) {
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

    render();
})();