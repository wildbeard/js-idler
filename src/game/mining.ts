import type { GameState, Item, ResourceNode } from '@/types';
import { updateInventory, updateStats } from './inventory';
import { updateXp } from './skills';
import { items } from '@/data/items';

export function hasIngredientsFor(
  stateRef: { value: GameState },
  item: Item,
): boolean {
  if (!item.ingredients) return false;
  for (const ingredient of item.ingredients) {
    const inv = stateRef.value.inventory.find(
      (i) => i.item_id === ingredient.item_id,
    );
    if (!inv || inv.quantity < ingredient.quantity) return false;
  }
  return true;
}

export function mine(
  stateRef: { value: GameState },
  node: ResourceNode,
): { item_id: string; quantity: number; xp_given: number }[] {
  const itemYield: { item_id: string; quantity: number; xp_given: number }[] =
    [];

  for (const y of node.yields) {
    const baseSuccess = y.success_chance ?? y.success_change ?? 0;
    const rng = Math.random();
    const bonusYieldChance = stateRef.value.upgrades
      .filter((u) => u.affects === node.id && u.category === 'mining_excess')
      .reduce((total, curr) => total + curr.value, 0);
    const currLvl = stateRef.value.levels.mining;
    let qty = 0;

    if (y.is_rare) {
      qty = rng < baseSuccess ? 1 : 0;
    } else if (
      baseSuccess === 1.0 ||
      currLvl >= (node.level_requirements.mining ?? 1) * 2 ||
      rng < baseSuccess + currLvl / ((node.level_requirements.mining ?? 1) * 2)
    ) {
      qty = 1;
    }

    if (bonusYieldChance && rng < bonusYieldChance && qty > 0) {
      qty += 1;
    }

    itemYield.push({ item_id: y.item_id, quantity: qty, xp_given: y.xp_given });
  }

  return itemYield;
}

export function userDidMine(
  stateRef: { value: GameState },
  node: ResourceNode,
): void {
  const gathered = mine(stateRef, node);
  for (const g of gathered.filter((g) => g.quantity > 0)) {
    updateXp(stateRef, 'mining', g.xp_given);
    updateInventory(stateRef, g.item_id, g.quantity);
  }
}

export function assistantDidMine(
  stateRef: { value: GameState },
  assistant: { perk: { affects: string; value: number } },
  node: ResourceNode,
): void {
  let xp = 0;
  for (const m of mine(stateRef, node).filter((m) => m.quantity > 0)) {
    let gathered = m.quantity;
    let xpGained = m.xp_given;

    if (assistant.perk.affects === 'xp') {
      xpGained = m.xp_given + Math.floor(m.xp_given * assistant.perk.value);
    } else if (assistant.perk.affects === 'yield') {
      if (Math.random() < assistant.perk.value) {
        gathered += Math.floor(Math.random() * 3 + 1);
      }
    }

    xp += xpGained;
    updateInventory(stateRef, m.item_id, gathered);
    const item = items.find((i) => i.item_id === m.item_id);
    if (item) updateStats(stateRef, 'gathers', item, gathered);
  }
  updateXp(stateRef, 'mining', xp);
}
