import type { GameState, Item, Assistant } from '@/types';
import { updateInventory } from './inventory';

export function sellItem(stateRef: { value: GameState }, item: Item): void {
  const bonusUpgrade = stateRef.value.upgrades.find(
    (u) => u.category === 'gold_bonus',
  );
  let gold = item.value ?? 0;

  if (bonusUpgrade) {
    gold += Math.ceil(gold * bonusUpgrade.value);
  }

  stateRef.value.gold += gold;
  stateRef.value.stats.lifetime_wealth += gold;

  let statIdx = stateRef.value.stats.sales.findIndex(
    (i) => i.item_id === item.item_id,
  );
  if (statIdx === -1) {
    stateRef.value.stats.sales.push({ item_id: item.item_id, value: 0 });
    statIdx = stateRef.value.stats.sales.length - 1;
  }
  stateRef.value.stats.sales[statIdx].value += gold;
}

export function userDidSell(
  stateRef: { value: GameState },
  item: Item,
  sellAll = false,
): void {
  if (sellAll) {
    userDidSellAll(stateRef, item);
    return;
  }
  sellItem(stateRef, item);
  updateInventory(stateRef, item.item_id, -1);
}

export function userDidSellAll(
  stateRef: { value: GameState },
  item: Item,
): void {
  const invItem = stateRef.value.inventory.find(
    (i) => i.item_id === item.item_id,
  );
  if (!invItem) return;

  const quantity = invItem.quantity;
  const goldVal = quantity * (item.value ?? 0);
  stateRef.value.gold += goldVal;
  stateRef.value.stats.lifetime_wealth += goldVal;
  updateInventory(stateRef, item.item_id, quantity * -1);
}

export function assistantDidSell(
  stateRef: { value: GameState },
  assistant: Assistant,
  item: Item,
): void {
  const invItem = stateRef.value.inventory.find(
    (i) => i.item_id === item.item_id && i.quantity > 0,
  );
  if (!invItem) return;

  const itemConfig = assistant.config.selling.find(
    (c) => c.item_id === item.item_id,
  );
  if (!itemConfig) return;

  let quantity = 0;
  let gold = item.value ?? 0;

  switch (itemConfig.method) {
    case 'sell_x':
      quantity =
        itemConfig.value > invItem.quantity
          ? invItem.quantity
          : itemConfig.value;
      break;
    case 'keep_x':
      quantity = invItem.quantity - itemConfig.value;
      break;
    case 'all':
      quantity = invItem.quantity;
      break;
  }

  if (quantity <= 0) return;

  if (assistant.perk.affects === 'selling') {
    gold += Math.ceil(gold * assistant.perk.value);
  }

  gold *= quantity;
  stateRef.value.gold += gold;
  stateRef.value.stats.lifetime_wealth += gold;
  updateInventory(stateRef, item.item_id, quantity * -1);
}
