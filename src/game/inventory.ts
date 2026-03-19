import type { GameState, Item } from '@/types';

export function updateInventory(
  stateRef: { value: GameState },
  key: string,
  value: number,
): void {
  let idx = stateRef.value.inventory.findIndex((i) => i.item_id === key);
  if (idx === -1) {
    stateRef.value.inventory.push({ item_id: key, quantity: 0 });
    idx = stateRef.value.inventory.length - 1;
  }
  stateRef.value.inventory[idx].quantity += value;
}

export function getInventoryItem(
  stateRef: { value: GameState },
  key: string,
): number {
  return stateRef.value.inventory.find((i) => i.item_id === key)?.quantity ?? 0;
}

export function updateStats(
  stateRef: { value: GameState },
  stat: 'sales' | 'crafts' | 'gathers',
  item: Item | null,
  value: number,
): void {
  if (stat === 'sales') {
    stateRef.value.stats.lifetime_wealth += value;
    return;
  }
  if (!item) return;

  let idx = stateRef.value.stats[stat].findIndex(
    (i) => i.item_id === item.item_id,
  );
  if (idx === -1) {
    stateRef.value.stats[stat].push({ item_id: item.item_id, value: 0 });
    idx = stateRef.value.stats[stat].length - 1;
  }
  stateRef.value.stats[stat][idx].value += value;
}
