import type { GameState, Item } from '@/types';
import { updateInventory, updateStats } from './inventory';
import { updateXp } from './skills';
import { hasIngredientsFor } from './mining';

export function smith(
  _stateRef: { value: GameState },
  item: Item,
): { success: boolean; result: { item_id: string; quantity: number }[] } {
  const result = {
    success: true,
    result: [{ item_id: item.item_id, quantity: 1 }] as {
      item_id: string;
      quantity: number;
    }[],
  };
  if (item.ingredients) {
    for (const ing of item.ingredients) {
      result.result.push({ item_id: ing.item_id, quantity: ing.quantity * -1 });
    }
  }
  return result;
}

export function userDidSmith(stateRef: { value: GameState }, item: Item): void {
  if (!hasIngredientsFor(stateRef, item)) return;

  const result = smith(stateRef, item);
  if (result.success) {
    updateXp(stateRef, 'smithing', item.xp_given);
    let idx = stateRef.value.stats.crafts.findIndex(
      (i) => i.item_id === item.item_id,
    );
    if (idx === -1) {
      stateRef.value.stats.crafts.push({ item_id: item.item_id, value: 0 });
      idx = stateRef.value.stats.crafts.length - 1;
    }
    stateRef.value.stats.crafts[idx].value += result.result[0].quantity;
  }

  for (const inv of result.result) {
    updateInventory(stateRef, inv.item_id, inv.quantity);
  }
}

export function assistantDidSmith(
  stateRef: { value: GameState },
  assistant: { perk: { affects: string; value: number } },
  item: Item,
): void {
  if (!hasIngredientsFor(stateRef, item)) return;

  const result = smith(stateRef, item);
  if (result.success) {
    let xp = item.xp_given;

    if (assistant.perk.affects === 'xp') {
      xp = item.xp_given + Math.floor(item.xp_given * assistant.perk.value);
    } else if (assistant.perk.affects === 'yield') {
      if (Math.random() < assistant.perk.value) {
        const extra = Math.floor(Math.random() * 3 + 1);
        for (const r of result.result) {
          if (r.item_id === item.item_id) {
            r.quantity += extra;
          }
        }
        updateStats(stateRef, 'crafts', item, result.result[0].quantity);
      }
    }

    updateXp(stateRef, 'smithing', xp);
    for (const inv of result.result) {
      updateInventory(stateRef, inv.item_id, inv.quantity);
    }
  }
}
