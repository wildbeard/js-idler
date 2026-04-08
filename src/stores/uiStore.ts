import { ref } from 'vue';
import { defineStore } from 'pinia';

export enum MainTab {
  Skills = 'skills',
  CurrentUpgrades = 'current-upgrades',
  CurrentAssistants = 'current-assistants',
  AvailableUpgrades = 'available-upgrades',
  AvailableAssistants = 'available-assistants',
  Quests = 'quests',
}

export const useUIStore = defineStore('ui', () => {
  const statsShown = ref(false);
  const activeTab = ref<MainTab>(MainTab.Skills);

  const toggleState = ref({
    inventory: true,
    upkeep: true,
    inventory_categories: {
      ores: true,
      bars: true,
      armor: true,
      weapons: true,
      bronze: true,
      iron: true,
      steel: true,
      starmetal: true,
      other: true,
    } as Record<string, boolean>,
  });

  function togglePanel(key: string) {
    const ts = toggleState.value as Record<string, unknown>;
    ts[key] = !ts[key];
  }

  function toggleInventory(key: string) {
    toggleState.value.inventory_categories[key] =
      !toggleState.value.inventory_categories[key];
  }

  function setTab(tab: MainTab) {
    activeTab.value = tab;
  }

  return {
    statsShown,
    activeTab,
    toggleState,
    togglePanel,
    toggleInventory,
    setTab,
  };
});
