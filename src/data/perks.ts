import type { PerkData } from '@/types';

export const perksData: PerkData[] = [
  {
    id: 'bonus_experience',
    name: 'Bonus Experience',
    description_template: 'Assistant yields &% more experience.',
    skills: ['mining', 'smithing'],
    affects: 'xp',
  },
  {
    id: 'bonus_yield',
    name: 'Bonus Yield',
    description_template: 'Assistant has a &% chance to yield more items.',
    skills: ['mining', 'smithing'],
    affects: 'xp',
  },
  {
    id: 'bonus_gold',
    name: 'Bonus Gold',
    description_template: "Assistant's gains &% more gold from sales.",
    skills: ['selling'],
    affects: 'selling',
  },
  {
    id: 'faster_interval',
    name: 'Faster Assistant Speed',
    description_template: 'Assistant works &% faster.',
    skills: ['mining', 'smithing', 'selling'],
    affects: 'interval',
  },
];

export const assistantFirstNames = [
  'Pebble',
  'Retch',
  'Smudge',
  'Pikwik',
  'Crum',
  'Skip',
  'Chatopher',
  'Squelch',
  'Crank',
  'Jarnathan',
  'Chonk',
  'Jough',
];

export const assistantLastNames = [
  'Toast',
  'Groundscore',
  'Muhhog',
  'Dingus',
  'Grubcoal',
  'Mudbritches',
  'Rubble',
  'Spitwik',
  'Jippity',
  'Grumble',
  'Wungo',
  'Dimwit',
  'Pizzle',
  'Stinkerton',
  'Rudeboy',
];
