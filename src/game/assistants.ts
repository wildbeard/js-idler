import type { GameState, Assistant, PerkData, Perk } from '@/types';
import { items } from '@/data/items';
import { resourceNodes } from '@/data/resourceNodes';
import {
  perksData,
  assistantFirstNames,
  assistantLastNames,
} from '@/data/perks';
import { hasIngredientsFor } from './mining';
import { assistantDidMine } from './mining';
import { assistantDidSmith } from './smithing';
import { assistantDidSell } from './selling';

export function createPerkFromData(data: PerkData): Perk {
  const value = Math.random();
  return {
    value,
    id: data.id,
    name: data.name,
    description: data.description_template.replace(
      '&',
      String(Math.floor(value * 100)),
    ),
    skills: data.skills,
    affects: data.affects,
  };
}

export function generateAssistantPerk(skill: string): Perk {
  const available = perksData.filter((p) => p.skills.includes(skill));
  const perkData = available.sort(() => Math.random() - Math.random())[0];
  return createPerkFromData(perkData);
}

export function generateAssistantLevels(
  skill: string,
  perk: Perk,
  stateRef: { value: GameState },
) {
  const baseValues = [2500, 1750, 1450, 950, 850];
  const levels = [];
  const resolvedSkill = skill === 'selling' ? 'mining' : skill;
  const currLvl = stateRef.value.levels[resolvedSkill] ?? 1;

  for (let i = 0; i < 5; i++) {
    let value = baseValues[i];
    if (perk.affects === 'interval') {
      value -= value * perk.value;
    }
    levels.push({
      value,
      level: i,
      cost: Math.ceil(350 + 75 * Math.pow(i, 2) + 175 * i),
      requirements: {
        [resolvedSkill]: Math.ceil(currLvl + 0.75 * Math.pow(i, 2) + 1.5 * i),
      },
    });
  }
  return levels;
}

export function generateAssistantName(): string {
  const scramble = (arr: string[]) => arr.sort(() => Math.random() - 0.5);
  const f = scramble([...assistantFirstNames])[0];
  const l = scramble([...assistantLastNames])[0];
  return `${f} ${l}`;
}

export function generateRandomAssistant(
  stateRef: { value: GameState },
  preferredSkill?: string,
): Assistant {
  const skills = ['mining', 'smithing', 'selling'];
  const skill = preferredSkill ?? skills.sort(() => Math.random() - 0.5)[0];
  const perk = generateAssistantPerk(skill);
  const id = Math.floor(Math.random() * 100000);
  const levels = generateAssistantLevels(skill, perk, stateRef);

  const assistant: Assistant = {
    id,
    name: generateAssistantName(),
    cost_per_action: Math.floor(Math.random() * 10),
    skills: [skill],
    perk,
    level: 0,
    interval_id: null,
    interval: levels[0].value,
    upgrades: levels,
    config: { mining: [], smithing: [], selling: [] },
  };

  return assistant;
}

export function hireAssistant(
  assistant: Assistant,
  stateRef: { value: GameState },
): void {
  const hiredAssistant: Assistant = {
    ...assistant,
    interval_id: null,
    interval: assistant.upgrades[0].value,
    level: 0,
    config: { mining: [], smithing: [], selling: [] },
  };

  for (const skill of assistant.skills) {
    if (skill !== 'selling') {
      const avail = items.filter(
        (i) =>
          i.skill === skill && i.level <= (stateRef.value.levels[skill] ?? 1),
      );
      hiredAssistant.config[skill as 'mining' | 'smithing'] = avail.map(
        (i) => i.item_id,
      );
    }
  }

  if (assistant.perk.affects === 'interval') {
    hiredAssistant.interval -= hiredAssistant.interval * assistant.perk.value;
  }

  stateRef.value.assistants.push(hiredAssistant);
  updateAssistantJobs(hiredAssistant.id, stateRef);
}

export function fireAssistant(
  assistant: Assistant,
  stateRef: { value: GameState },
): void {
  clearInterval(assistant.interval_id as ReturnType<typeof setInterval>);
  stateRef.value.assistants = stateRef.value.assistants.filter(
    (a) => a.id !== assistant.id,
  );
}

export function updateAssistantJobs(
  assistantId: number | string,
  stateRef: { value: GameState },
): void {
  const idx = stateRef.value.assistants.findIndex((a) => a.id === assistantId);
  if (idx === -1) return;

  const assistant = stateRef.value.assistants[idx];
  const jobs = getAssistantJobFunctions(assistant, stateRef);

  clearInterval(assistant.interval_id as ReturnType<typeof setInterval>);
  assistant.interval_id = setInterval(() => {
    for (const job of jobs) job();
  }, assistant.interval);
}

export function getAssistantJobFunctions(
  assistant: Assistant,
  stateRef: { value: GameState },
): (() => void)[] {
  const jobs: (() => void)[] = [];

  for (const key of ['mining', 'smithing', 'selling'] as const) {
    jobs.push(() => {
      let actionableItems: ((typeof items)[0] | (typeof resourceNodes)[0])[] =
        [];

      switch (key) {
        case 'mining':
          actionableItems = resourceNodes.filter(
            (i) =>
              i.skill === 'mining' &&
              i.yields.filter((y) =>
                assistant.config.mining.includes(y.item_id),
              ).length > 0,
          );
          break;
        case 'smithing':
          actionableItems = items.filter(
            (i) =>
              i.skill === 'smithing' &&
              assistant.config.smithing.includes(i.item_id) &&
              hasIngredientsFor(stateRef, i),
          );
          break;
        case 'selling':
          actionableItems = items.filter((i) => {
            const config = assistant.config.selling.find(
              (c) => c.item_id === i.item_id,
            );
            const invItem = stateRef.value.inventory.find(
              (ii) => ii.item_id === i.item_id,
            );
            if (!config || !invItem) return false;
            const minQty = config.method === 'keep_x' ? config.value + 1 : 1;
            return invItem.quantity >= minQty;
          });
          break;
      }

      if (!actionableItems.length) return;

      const actionItem =
        actionableItems.length > 1
          ? actionableItems[Math.floor(Math.random() * actionableItems.length)]
          : actionableItems[0];

      if (stateRef.value.gold < assistant.cost_per_action) return;

      stateRef.value.gold -= assistant.cost_per_action;

      switch (key) {
        case 'mining':
          assistantDidMine(
            stateRef,
            assistant,
            actionItem as (typeof resourceNodes)[0],
          );
          break;
        case 'smithing':
          if (hasIngredientsFor(stateRef, actionItem as (typeof items)[0])) {
            assistantDidSmith(
              stateRef,
              assistant,
              actionItem as (typeof items)[0],
            );
          }
          break;
        case 'selling':
          assistantDidSell(
            stateRef,
            assistant,
            actionItem as (typeof items)[0],
          );
          break;
      }
    });
  }

  return jobs;
}

export function canHireAssistant(
  assistant: Assistant,
  stateRef: { value: GameState },
): boolean {
  const currLvl = stateRef.value.assistants.find((a) => a.id === assistant.id);
  const nextLvl = currLvl ? currLvl.level + 1 : 0;
  const requirements = assistant.upgrades.find((u) => u.level === nextLvl);
  if (!requirements) return false;
  return (
    stateRef.value.gold >= requirements.cost &&
    hasRequirementsForAssistant(assistant, stateRef)
  );
}

export function isAssistantMaxed(
  assistant: Assistant,
  stateRef: { value: GameState },
): boolean {
  const currLvl = stateRef.value.assistants.find((a) => a.id === assistant.id);
  const nextLvl = currLvl ? currLvl.level + 1 : 0;
  return !assistant.upgrades.find((u) => u.level === nextLvl);
}

export function hasRequirementsForAssistant(
  assistant: Assistant,
  stateRef: { value: GameState },
): boolean {
  const currLvl = stateRef.value.assistants.find((a) => a.id === assistant.id);
  const nextLvl = currLvl ? currLvl.level + 1 : 0;
  const requirements = assistant.upgrades.find((u) => u.level === nextLvl);
  if (!requirements) return true;
  for (const [key, val] of Object.entries(requirements.requirements)) {
    if ((stateRef.value.levels[key] ?? 0) < (val as number)) return false;
  }
  return true;
}

export function upgradeAssistant(
  purchasedAssistant: Assistant,
  stateRef: { value: GameState },
): void {
  const nxtLvl = purchasedAssistant.upgrades.find(
    (u) => u.level === purchasedAssistant.level + 1,
  );
  if (!nxtLvl || nxtLvl.cost > stateRef.value.gold) return;
  if (!hasRequirementsForAssistant(purchasedAssistant, stateRef)) return;

  stateRef.value.gold -= nxtLvl.cost;
  const currCost = purchasedAssistant.cost_per_action;
  const perkVal = purchasedAssistant.perk.value;

  purchasedAssistant.level = nxtLvl.level;
  purchasedAssistant.interval = nxtLvl.value;
  purchasedAssistant.cost_per_action += Math.floor(
    currCost * (nxtLvl.level + 1 * 0.025) * 0.15 +
      (stateRef.value.levels[purchasedAssistant.skills[0]] ?? 1) * 0.08,
  );
  purchasedAssistant.perk.value +=
    Math.floor(
      perkVal +
        nxtLvl.level * 0.25 +
        (stateRef.value.levels[purchasedAssistant.skills[0]] ?? 1) * 0.15,
    ) / 100;

  const perkTemplate = perksData.find(
    (p) => p.id === purchasedAssistant.perk.id,
  );
  if (perkTemplate) {
    purchasedAssistant.perk.description =
      perkTemplate.description_template.replace(
        '&',
        String(Math.floor(purchasedAssistant.perk.value * 100)),
      );
  }

  updateAssistantJobs(purchasedAssistant.id, stateRef);
}
