import type { GameState, Quest } from '@/types';
import { updateInventory } from './inventory';
import { updateXp } from './skills';
import { hireAssistant, generateRandomAssistant } from './assistants';
import { getInventoryItem } from './inventory';

export function checkQuestRequirements(
  quest: Quest,
  stateRef: { value: GameState },
): boolean {
  if (stateRef.value.quests_completed.includes(quest.id)) return false;
  for (const key in quest.requirements) {
    if (key === 'stats') continue;
    if (key === 'levels') {
      for (const lKey in stateRef.value.levels) {
        const req = quest.requirements.levels?.[lKey] ?? 0;
        if (req > stateRef.value.levels[lKey]) return false;
      }
    } else if (key === 'quests') {
      const required = quest.requirements.quests ?? [];
      if (required.length > 0) {
        const completed = required.filter((q) =>
          stateRef.value.quests_completed.includes(q),
        );
        if (completed.length !== required.length) return false;
      }
    }
  }
  return true;
}

export function canCompleteQuest(
  quest: Quest,
  stateRef: { value: GameState },
): boolean {
  const currStep = stateRef.value.quests_started.find(
    (q) => q.quest_id === quest.id,
  );
  if (!currStep) return false;
  return (
    quest.steps[quest.steps.length - 1].id === currStep.step &&
    currStep.complete
  );
}

export function canCompleteQuestStep(
  quest: Quest,
  step: number,
  stateRef: { value: GameState },
): boolean {
  const questStep = quest.steps.find((s) => s.id === step);
  if (!questStep) return false;

  if (
    (questStep.requirements.items ?? []).filter(
      (i) => getInventoryItem(stateRef, i.item_id) < i.value,
    ).length > 0
  ) {
    return false;
  }

  if (
    questStep.requirements.upgrades?.length &&
    stateRef.value.upgrades.filter((pu) =>
      questStep.requirements.upgrades!.find(
        (ru) => ru.upgrade_id === pu.id && ru.value <= pu.level,
      ),
    ).length < questStep.requirements.upgrades.length
  ) {
    return false;
  }

  if (
    questStep.requirements.autoers?.length &&
    stateRef.value.purchased_autoers.filter((pa) =>
      questStep.requirements.autoers!.find(
        (ra) => ra.upgrade_id === pa.id && ra.value <= pa.level,
      ),
    ).length < questStep.requirements.autoers.length
  ) {
    return false;
  }

  return true;
}

export function completeQuestStep(
  quest: Quest,
  step: number,
  stateRef: { value: GameState },
): void {
  if (!canCompleteQuestStep(quest, step, stateRef)) return;

  const idx = stateRef.value.quests_started.findIndex(
    (q) => q.quest_id === quest.id,
  );
  if (idx === -1) return;

  stateRef.value.quests_started[idx].complete = true;

  const questStep = quest.steps.find((s) => s.id === step);
  if (!questStep) return;
  for (const i of (questStep.requirements.items ?? []).filter(
    (i) => i.consumed,
  )) {
    updateInventory(stateRef, i.item_id, i.value * -1);
  }
}

export function startQuest(
  stateRef: { value: GameState },
  quest: Quest,
): boolean {
  if (stateRef.value.quests_started.length) return false;
  if (stateRef.value.quests_completed.includes(quest.id)) return false;
  stateRef.value.quests_started.push({
    quest_id: quest.id,
    step: quest.steps[0].id,
    complete: false,
  });
  return true;
}

export function completeQuest(
  quest: Quest,
  stateRef: { value: GameState },
): void {
  if (!canCompleteQuest(quest, stateRef)) return;

  stateRef.value.quests_started = stateRef.value.quests_started.filter(
    (q) => q.quest_id !== quest.id,
  );
  stateRef.value.quests_completed.push(quest.id);

  for (const reward of quest.rewards) {
    switch (reward.category) {
      case 'experience':
        updateXp(stateRef, reward.affects, reward.value);
        break;
      case 'item':
        updateInventory(stateRef, reward.item_id, reward.value);
        break;
      case 'money':
        stateRef.value.gold += reward.value;
        stateRef.value.stats.lifetime_wealth += reward.value;
        break;
      case 'assistant': {
        const assistant = generateRandomAssistant(stateRef, reward.affects);
        if (reward.item_id !== 'assistant') {
          assistant.name = reward.item_id;
        }
        hireAssistant(assistant, stateRef);
        break;
      }
    }
  }
}
