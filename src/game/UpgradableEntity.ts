import type { Autoer, Upgrade, UpgradeLevel, GameState } from '@/types';
import { items } from '@/data/items';
import { resourceNodes } from '@/data/resourceNodes';
import { hasIngredientsFor } from './mining';
import { autoerAction } from './actions';
import { upgrades as upgradeData } from '@/data/upgrades';

// ─── Shared logic (used by both factories) ───────────────────────────────────

function buildSharedMethods(
  properties: (Autoer | Upgrade) & { unique_id: string },
  stateRef: { value: GameState },
) {
  const getUpgradeFromState = () => {
    if (properties.category === 'autoer') {
      return stateRef.value.purchased_autoers.find(
        (u) => u.unique_id === properties.unique_id,
      );
    }
    return stateRef.value.upgrades.find((u) => u.id === properties.id);
  };

  const getCurrentUpgrade = (defaultUpgrade = false): UpgradeLevel | null => {
    const stateValue = getUpgradeFromState();
    if (!stateValue && !defaultUpgrade) return null;
    const currLevel = stateValue?.level ?? 0;
    return properties.upgrades.find((u) => u.level === currLevel) ?? null;
  };

  const getNextLevel = (): UpgradeLevel | null => {
    const curr = getCurrentUpgrade();
    if (!curr) return null;
    return properties.upgrades.find((u) => u.level === curr.level + 1) ?? null;
  };

  const hasRequirementsForUpgrade = (): boolean => {
    const currUpgrade = getCurrentUpgrade();
    const nextLevel = properties.upgrades.find(
      (u) => u.level === (currUpgrade ? currUpgrade.level + 1 : 0),
    );
    if (!nextLevel) return false;
    for (const [key, req] of Object.entries(nextLevel.requirements)) {
      if ((req as number) > (stateRef.value.levels[key] ?? 0)) return false;
    }
    return true;
  };

  const getUpgradeCost = (): number => {
    const stateValue = getUpgradeFromState();
    if (!stateValue) return properties.cost;
    const currPurchased = getCurrentUpgrade();
    const maxLevel = properties.upgrades
      .sort((a, b) => a.level - b.level)
      .at(-1);
    if (maxLevel?.level === currPurchased?.level) return -1;
    const cost = properties.upgrades.find(
      (u) => u.level === (currPurchased?.level ?? 0) + 1,
    );
    return cost?.cost ?? currPurchased?.cost ?? properties.cost;
  };

  const canUpgrade = (): boolean => {
    const currUpgrade = getCurrentUpgrade();
    const nextLevel = properties.upgrades.find(
      (u) => u.level === (currUpgrade ? currUpgrade.level + 1 : 0),
    );
    if (!nextLevel || nextLevel.cost > stateRef.value.gold) return false;
    return hasRequirementsForUpgrade();
  };

  const getValueTextForUpgrade = (nextLevel = false): string => {
    const level = nextLevel ? getNextLevel() : getCurrentUpgrade(true);
    if (!level || !properties.value_description) return '';
    const valueNum = level.value < 1 ? level.value * 100 : level.value;
    return properties.value_description.replace('%{value}', String(valueNum));
  };

  const getUpgradeValueText = (nextLevel = false): string => {
    if (!properties.value_description) return '';
    if (properties.category !== 'autoer')
      return getValueTextForUpgrade(nextLevel);

    const autoer = properties as Autoer;
    const currUpgrade = getCurrentUpgrade(true);
    let str = properties.value_description;

    if (str.includes('%{item}')) {
      const item = items.find((i) => i.item_id === autoer.affects);
      str = str.replace('%{item}', item?.name ?? '');
    }
    if (str.includes('%{interval}') && currUpgrade) {
      str = str.replace('%{interval}', `${currUpgrade.value / 1000}s`);
    }

    if (autoer.xp_upgrade_ref) {
      const xpUpgradeState = stateRef.value.upgrades.find(
        (u) => u.id === autoer.xp_upgrade_ref,
      );
      if (xpUpgradeState) {
        const xpUpgradeData = upgradeData.find(
          (u) => u.id === autoer.xp_upgrade_ref,
        );
        const xpLevel = xpUpgradeData?.upgrades.find(
          (u) => u.level === xpUpgradeState.level,
        );
        if (xpLevel) {
          if (autoer.skill === 'mining') {
            const node = resourceNodes.find((n) => n.id === autoer.affects);
            const yieldItem = node?.yields[0];
            if (yieldItem) {
              str += `<br>${autoer.name} will yield ${Math.floor(xpLevel.value * 100)}% (${Math.floor(yieldItem.xp_given * xpLevel.value)}) xp per action.`;
            }
          } else {
            const item = items.find((i) => i.item_id === autoer.affects);
            if (item) {
              str += `<br>${autoer.name} will yield ${xpLevel.value * 100}% (${Math.floor(item.xp_given * xpLevel.value)}) xp per action.`;
            }
          }
        }
      }
    }

    return str;
  };

  const getUpgradeRequirementText = (): string[] => {
    const currUpgrade = getCurrentUpgrade();
    const maxUpgrade = properties.upgrades.sort((a, b) => b.level - a.level)[0];
    if (currUpgrade?.level === maxUpgrade?.level) return [];
    const nextLevel = properties.upgrades.find(
      (u) => u.level === (currUpgrade ? currUpgrade.level + 1 : 0),
    );
    if (!nextLevel) return [];
    return Object.entries(nextLevel.requirements).map(([k, v]) => `${k}: ${v}`);
  };

  return {
    getCurrentUpgrade,
    hasRequirementsForUpgrade,
    getUpgradeCost,
    canUpgrade,
    getUpgradeValueText,
    getUpgradeRequirementText,
  };
}

// ─── Autoer factory ──────────────────────────────────────────────────────────

export function createAutoerEntity(
  props: Autoer & { unique_id?: string; level?: number },
  stateRef: { value: GameState },
) {
  const properties = { ...props } as Autoer & { unique_id: string };
  if (!properties.unique_id) {
    properties.unique_id = `${properties.id}_${Math.floor(Math.random() * 100000)}`;
  }

  const shared = buildSharedMethods(properties, stateRef);

  const getAutoerFunction = (): void => {
    let eligibleItems: ((typeof items)[0] | (typeof resourceNodes)[0])[];

    if (
      properties.affects.includes('_weapons') ||
      properties.affects.includes('_armor')
    ) {
      const age = properties.affects.split('_')[0];
      const cat = properties.affects.split('_')[1];
      eligibleItems = items.filter(
        (i) => i.categories.includes(cat) && i.categories.includes(age),
      );
    } else if (properties.skill === 'mining') {
      eligibleItems = resourceNodes.filter((i) => i.id === properties.affects);
    } else {
      eligibleItems = items.filter((i) => i.item_id === properties.affects);
    }

    const eligibleItem =
      eligibleItems[Math.floor(Math.random() * eligibleItems.length)];
    if (!eligibleItem) return;

    if (
      properties.skill === 'smithing' &&
      !hasIngredientsFor(stateRef, eligibleItem as (typeof items)[0])
    ) {
      return;
    }

    autoerAction(stateRef, eligibleItem, properties.skill);
  };

  const toggleState = (preferredState?: 'on' | 'off'): void => {
    const startAutoer = () => {
      const upgrade = shared.getCurrentUpgrade();
      if (!upgrade) return;
      stateRef.value.running_autoers[properties.unique_id] = setInterval(
        () => getAutoerFunction(),
        upgrade.value,
      );
    };
    const stopAutoer = () => {
      clearInterval(
        stateRef.value.running_autoers[properties.unique_id] as ReturnType<
          typeof setInterval
        >,
      );
      stateRef.value.running_autoers[properties.unique_id] = null;
    };

    if (!preferredState) {
      stateRef.value.running_autoers[properties.unique_id]
        ? stopAutoer()
        : startAutoer();
    } else if (
      preferredState === 'on' &&
      !stateRef.value.running_autoers[properties.unique_id]
    ) {
      startAutoer();
    } else if (preferredState === 'off') {
      stopAutoer();
    }
  };

  return {
    ...properties,
    ...shared,
    isRunning: () => !!stateRef.value.running_autoers[properties.unique_id],
    toggleState,
    getAutoerFunction,
  };
}

// ─── Upgrade factory ─────────────────────────────────────────────────────────

export function createUpgradeEntity(
  props: Upgrade & { level?: number },
  stateRef: { value: GameState },
) {
  const properties = { ...props } as Upgrade & { unique_id: string };
  if (!properties.unique_id) {
    properties.unique_id = `${properties.id}_${Math.floor(Math.random() * 100000)}`;
  }

  return {
    ...properties,
    ...buildSharedMethods(properties, stateRef),
  };
}

// ─── Convenience types ───────────────────────────────────────────────────────

export type AutoerEntity = ReturnType<typeof createAutoerEntity>;
export type UpgradeEntity = ReturnType<typeof createUpgradeEntity>;
