import type { GameState, Item, ResourceNode } from '../types';
import { mine, hasIngredientsFor } from './mining';
import { smith } from './smithing';
import { sellItem } from './selling';
import { updateInventory, updateStats } from './inventory';
import { updateXp } from './skills';
import { items } from '../data/items';
import { upgrades as upgradeData } from '../data/upgrades';

export function autoerAction(
  stateRef: { value: GameState },
  target: Item | ResourceNode,
  action: string,
): void {
  const xpPercentUpgrade = stateRef.value.upgrades.find(
    (u) => u.id === `autoer_${action}_xp`,
  );
  let xpPercent = 0;
  let xp = 0;
  let qty = 0;

  if (xpPercentUpgrade) {
    const staticData = upgradeData.find((u) => u.id === xpPercentUpgrade.id)
    xpPercent = staticData?.upgrades.find((u) => u.level === xpPercentUpgrade.level)?.value ?? 0;
  }

  switch (action) {
    case 'mining': {
      const node = target as ResourceNode;
      for (const m of mine(stateRef, node).filter((m) => m.quantity > 0)) {
        updateInventory(stateRef, m.item_id, m.quantity);
        if (xpPercent > 0) {
          updateXp(stateRef, 'mining', m.xp_given * xpPercent);
          const item = items.find((i) => i.item_id === m.item_id);
          if (item) updateStats(stateRef, 'gathers', item, m.quantity);
        }
      }
      break;
    }
    case 'smithing': {
      const item = target as Item;
      if (hasIngredientsFor(stateRef, item)) {
        const result = smith(stateRef, item);
        qty = result.success ? result.result[0].quantity : 0;
        xp = Math.floor(item.xp_given * xpPercent);
        for (const r of result.result.filter((r) => r.quantity < 0)) {
          updateInventory(stateRef, r.item_id, r.quantity);
        }
      }
      break;
    }
    case 'selling':
      sellItem(stateRef, target as Item);
      break;
  }

  if (xp > 0 && action !== 'selling') {
    updateXp(stateRef, action, xp);
  }

  if (qty > 0 && action !== 'selling' && action !== 'mining') {
    updateInventory(stateRef, (target as Item).item_id, qty);
    updateStats(
      stateRef,
      action === 'mining' ? 'gathers' : 'crafts',
      target as Item,
      qty,
    );
  }
}
