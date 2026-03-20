import type { GameState } from '@/types';

export function getXpForLevel(level: number): number {
  return Math.floor((level + 300 * Math.pow(2, level / 7)) / 4);
}

export function updateXp(
  stateRef: { value: GameState },
  key: string,
  value: number,
): void {
  const nxtLvlKey = `${key}_next_level` as keyof typeof stateRef.value.xp;
  stateRef.value.xp[key as keyof typeof stateRef.value.xp] += value as never;
  (stateRef.value.xp as Record<string, number>)[`${key}_xp_level`] += value;

  let currXp = (stateRef.value.xp as Record<string, number>)[key];

  while (
    currXp >= (stateRef.value.xp as Record<string, number>)[`${key}_next_level`]
  ) {
    stateRef.value.levels[key] += 1;
    (stateRef.value.xp as Record<string, number>)[`${key}_xp_level`] = Math.abs(
      (stateRef.value.xp as Record<string, number>)[`${key}_next_level`] -
        currXp,
    );
    (stateRef.value.xp as Record<string, number>)[`${key}_next_level`] +=
      getXpForLevel(stateRef.value.levels[key] + 1);
    currXp = (stateRef.value.xp as Record<string, number>)[key];
  }
}

export function xpPercentForSkill(
  stateRef: { value: GameState },
  skill: string,
): number {
  const xpLevel = (stateRef.value.xp as Record<string, number>)[
    `${skill}_xp_level`
  ];
  const nextLevel = (stateRef.value.xp as Record<string, number>)[
    `${skill}_next_level`
  ];
  return Math.floor(
    (xpLevel / getXpForLevel(stateRef.value.levels[skill])) * 100,
  );
}
