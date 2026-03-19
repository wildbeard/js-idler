import type { Ref } from 'vue';
import type { GameState } from '@/types';
import { autoers } from '@/data/autoers';
import { upgrades } from '@/data/upgrades';
import {
  createAutoerEntity,
  createUpgradeEntity,
  type AutoerEntity,
  type UpgradeEntity,
} from './UpgradableEntity';
import { updateAssistantJobs } from './assistants';

const VERSION = '0.2.0';

export const startingState: GameState = {
  version: VERSION,
  stats: {
    lifetime_wealth: 500,
    sales: [],
    crafts: [],
    gathers: [],
  },
  gold: 500,
  levels: { mining: 1, smithing: 1 },
  xp: {
    mining: 0,
    mining_xp_level: 0,
    mining_next_level: 83,
    smithing_xp_level: 0,
    smithing: 0,
    smithing_next_level: 83,
  },
  global_variables: {
    max_assistants: 2,
    max_available_assistants: 3,
    assistant_refresh_rate: 180000,
    upkeep_interval: 300000,
    base_assistant_upkeep: 125,
    tax_rate: 0.08,
  },
  upgrades: [],
  purchased_autoers: [],
  assistants: [],
  inventory: [
    { item_id: 'copper_ore', quantity: 0 },
    { item_id: 'tin_ore', quantity: 0 },
    { item_id: 'bronze_bar', quantity: 10 },
  ],
  running_autoers: {},
  running_upgrades: {},
  quests_started: [],
  quests_completed: [],
};

export function loadState(): GameState {
  const loadedStr = localStorage.getItem('game-state');
  if (!loadedStr) return JSON.parse(JSON.stringify(startingState));

  const loaded = JSON.parse(loadedStr) as GameState & { version?: string };
  const currVer = VERSION.split('.');
  const loadedVer = loaded.version?.split('.');

  if (
    !loadedVer ||
    Number(currVer[0]) > Number(loadedVer[0]) ||
    Number(currVer[1]) > Number(loadedVer[1])
  ) {
    return JSON.parse(JSON.stringify(startingState));
  }

  return loaded;
}

export function applyUpgrade(
  entity: AutoerEntity | UpgradeEntity,
  level: number,
  stateRef: { value: GameState },
  _hydrating = false,
): void {
  let up: { level: number; cost: number; value: number };

  if (level === 0) {
    up = { level: 0, cost: entity.cost, value: entity.value };
  } else {
    const found = entity.upgrades.find((u) => u.level === level);
    if (!found) return;
    up = found;
  }

  if (entity.category === 'autoer') {
    const autoerEntity = entity as AutoerEntity;
    if (stateRef.value.running_autoers[autoerEntity.unique_id]) {
      clearInterval(
        stateRef.value.running_autoers[autoerEntity.unique_id] as ReturnType<
          typeof setInterval
        >,
      );
    }
    stateRef.value.running_autoers[autoerEntity.unique_id] = setInterval(
      () => autoerEntity.getAutoerFunction(),
      up.value,
    );

    const list = stateRef.value.purchased_autoers;
    const currIdx = list.findIndex(
      (a) => a.unique_id === autoerEntity.unique_id,
    );
    const record = {
      id: autoerEntity.id,
      unique_id: autoerEntity.unique_id,
      level: up.level,
    };
    if (currIdx === -1) list.push(record);
    else list[currIdx] = record;
  } else {
    const upgradeEntity = entity as UpgradeEntity;
    if (upgradeEntity.affects.includes('.')) {
      const path = upgradeEntity.affects.split('.');
      let target: Record<string, unknown> = stateRef.value as unknown as Record<
        string,
        unknown
      >;
      while (path.length > 1) {
        const p = path.shift()!;
        if (p in target) target = target[p] as Record<string, unknown>;
        else break;
      }
      const p = path.shift()!;
      if (p in target) target[p] = up.value;
    }

    const list = stateRef.value.upgrades;
    const currIdx = list.findIndex((u) => u.id === upgradeEntity.id);
    const record = {
      id: upgradeEntity.id,
      level: up.level,
      value: up.value,
      affects: upgradeEntity.affects,
      category: upgradeEntity.category,
    };
    if (currIdx === -1) list.push(record);
    else list[currIdx] = record;
  }
}

export function hydrateState(
  loaded: GameState,
  stateRef: Ref<GameState>,
): void {
  const wrapper = { value: stateRef.value };

  if (loaded.purchased_autoers.length) {
    for (const a of loaded.purchased_autoers) {
      const fromData = autoers.find((ae) => ae.id === a.id);
      if (!fromData) continue;

      let unique_id = a.unique_id;
      if (!unique_id) {
        unique_id = `${a.id}_${Math.floor(Math.random() * 100000)}`;
      }

      const entity = createAutoerEntity(
        { ...fromData, unique_id, level: a.level },
        wrapper,
      );
      applyUpgrade(entity, a.level, wrapper);

      if (loaded.running_autoers[unique_id]) {
        entity.toggleState('on');
      } else {
        entity.toggleState('off');
      }
    }
  }

  if (loaded.upgrades.length) {
    for (const up of loaded.upgrades) {
      const fromData = upgrades.find((u) => u.id === up.id);
      if (!fromData) continue;
      const entity = createUpgradeEntity(
        { ...fromData, level: up.level },
        wrapper,
      );
      applyUpgrade(entity, up.level, wrapper, true);
    }
  }

  // Merge missing global_variables
  for (const key in startingState.global_variables) {
    const k = key as keyof typeof startingState.global_variables;
    if (!stateRef.value.global_variables[k]) {
      stateRef.value.global_variables[k] = startingState.global_variables[
        k
      ] as never;
    }
  }

  // Sanitize gold
  if (
    isNaN(stateRef.value.gold) ||
    stateRef.value.gold < 0 ||
    stateRef.value.gold == null
  ) {
    stateRef.value.gold = startingState.gold;
  }

  // Restart assistant jobs
  for (const a of loaded.assistants) {
    updateAssistantJobs(a.id, wrapper);
  }
}

export function saveGameState(stateRef: { value: GameState }): void {
  if (stateRef.value.version !== VERSION) {
    stateRef.value.version = VERSION;
  }
  localStorage.setItem('game-state', JSON.stringify(stateRef.value));
}
