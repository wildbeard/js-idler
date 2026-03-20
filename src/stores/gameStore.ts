import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { GameState, Item, ResourceNode } from '@/types';
import { items } from '@/data/items';
import { autoers as autoerData } from '@/data/autoers';
import { upgrades as upgradeData } from '@/data/upgrades';
import { quests as questData } from '@/data/quests';
import { resourceNodes } from '@/data/resourceNodes';
import {
  createAutoerEntity,
  createUpgradeEntity,
  type AutoerEntity,
  type UpgradeEntity,
} from '@/game/UpgradableEntity';
import { userDidMine } from '@/game/mining';
import { userDidSmith } from '@/game/smithing';
import { userDidSell } from '@/game/selling';
import { hasIngredientsFor } from '@/game/mining';
import { getXpForLevel } from '@/game/skills';
import {
  applyUpgrade,
  hydrateState,
  loadState,
  saveGameState,
} from '@/game/persistence';
import { getUpkeep, getUpkeepDisplayTime, taxManCometh } from '@/game/upkeep';

export const useGameStore = defineStore('game', () => {
  const baseState = loadState();
  const s = ref<GameState>(JSON.parse(JSON.stringify(baseState)));
  hydrateState(baseState, s);

  window.addEventListener('beforeunload', () => saveGameState(s));
  setInterval(() => saveGameState(s), 15000);
  setInterval(() => taxManCometh(s), s.value.global_variables.upkeep_interval);

  // Computed
  const upkeep = computed(() => getUpkeep(s));
  const availableOreList = computed(() =>
    resourceNodes.filter(
      (i) =>
        i.skill === 'mining' &&
        (i.level_requirements.mining ?? 1) <= s.value.levels.mining,
    ),
  );
  const availableSmithableList = computed(() => {
    const tiers = ['bronze', 'iron', 'steel', 'starmetal', 'other'];
    const output: Record<string, Item[]> = {};
    for (const t of tiers) {
      if (t !== 'other') {
        output[t] = items.filter(
          (i) =>
            i.skill === 'smithing' &&
            i.level <= s.value.levels.smithing &&
            i.categories.includes(t) &&
            !i.categories.includes('quest_item'),
        );
      } else {
        output[t] = items.filter(
          (i) =>
            i.skill === 'smithing' &&
            i.level <= s.value.levels.smithing &&
            !i.categories.some((c) =>
              tiers.filter((a) => a !== 'other').includes(c),
            ) &&
            !i.categories.includes('quest_item'),
        );
      }
    }
    return output;
  });
  const availableQuests = computed(() =>
    questData.filter((q) => !s.value.quests_completed.includes(q.id)),
  );
  const availableUpgrades = computed(() =>
    upgradeData
      .filter((u) => !s.value.upgrades.find((uu) => uu.id === u.id))
      .map((u) => createUpgradeEntity(u, s))
      .filter((u) => u.hasRequirementsForUpgrade()),
  );
  const availableAutoers = computed(() =>
    autoerData
      .map((a) => createAutoerEntity(a, s))
      .filter((a) => {
        const firstLevel = a.upgrades.sort(
          (x: { level: number }, y: { level: number }) => x.level - y.level,
        )[0];
        if (!firstLevel) return false;
        for (const [key, val] of Object.entries(firstLevel.requirements)) {
          if ((s.value.levels[key] ?? 0) < (val as number)) return false;
        }
        return true;
      }),
  );
  const autoerGroups = computed(() => {
    const groups: { id: string; name: string }[] = [];
    for (const pa of s.value.purchased_autoers) {
      if (!groups.find((g) => g.id === pa.id)) {
        groups.push({
          id: pa.id,
          name: autoerData.find((a) => a.id === pa.id)?.name ?? pa.id,
        });
      }
    }
    return groups;
  });
  const purchasedAutoerEntities = computed(() =>
    s.value.purchased_autoers
      .map((a) => {
        const fromData = autoerData.find((ae) => ae.id === a.id);
        if (!fromData) return null;
        return createAutoerEntity(
          { ...fromData, unique_id: a.unique_id, level: a.level },
          s,
        );
      })
      .filter(Boolean),
  );
  const purchasedUpgradeEntities = computed(() =>
    s.value.upgrades
      .map((u) => {
        const fromData = upgradeData.find((ud) => ud.id === u.id);
        if (!fromData) return null;
        return createUpgradeEntity({ ...fromData, level: u.level }, s);
      })
      .filter(Boolean),
  );

  // User Actions
  function userPurchasedUpgrade(entity: AutoerEntity | UpgradeEntity) {
    let level = 0;
    if (entity.category === 'autoer') {
      const curr = s.value.purchased_autoers.find(
        (u) => u.unique_id === entity.unique_id,
      );
      level = curr ? curr.level + 1 : 0;
    } else {
      const curr = s.value.upgrades.find((u) => u.id === entity.id);
      level = curr ? curr.level + 1 : 0;
    }
    const cost = entity.getUpgradeCost();
    applyUpgrade(entity, level, s);
    s.value.gold -= cost;
  }

  function xpForSkill(skill: string): number {
    const xpLevel = (s.value.xp as Record<string, number>)[`${skill}_xp_level`];
    return Math.floor((xpLevel / getXpForLevel(s.value.levels[skill])) * 100);
  }

  function getBankSaleValue(): number {
    return s.value.inventory.reduce((curr, inv) => {
      const item = items.find((i) => i.item_id === inv.item_id);
      return curr + inv.quantity * (item?.value ?? 0);
    }, 0);
  }

  function bankSale() {
    const total = getBankSaleValue();
    for (const inv of s.value.inventory) inv.quantity = 0;
    s.value.gold += total;
    s.value.stats.lifetime_wealth += total;
  }

  return {
    s,
    items,
    // Computed
    upkeep,
    availableOreList,
    availableSmithableList,
    availableQuests,
    availableUpgrades,
    availableAutoers,
    autoerGroups,
    purchasedAutoerEntities,
    purchasedUpgradeEntities,
    // Actions
    userDidMine: (node: ResourceNode) => userDidMine(s, node),
    userDidSmith: (item: Item) => userDidSmith(s, item),
    userDidSell: (item: Item, all = false) => userDidSell(s, item, all),
    hasInventory: (item: Item) =>
      !!s.value.inventory.find(
        (i) => i.item_id === item.item_id && i.quantity > 0,
      ),
    userCanCraft: (item: Item) => hasIngredientsFor(s, item),
    userPurchasedUpgrade,
    bankSale,
    getBankSaleValue,
    xpForSkill,
    getItem: (itemId: string) => items.find((i) => i.item_id === itemId),
    getQuest: (questId: string) => questData.find((q) => q.id === questId),
    getUpkeepDisplayTime: () => getUpkeepDisplayTime(s),
  };
});
