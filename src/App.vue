<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
import { useAssistantStore } from '@/stores/assistantStore';
import Sidebar from '@/components/Sidebar.vue';
import MainPanel from '@/components/MainPanel.vue';
import FireAssistantModal from '@/components/modals/FireAssistantModal.vue';
import AssistantConfigModal from '@/components/modals/AssistantConfigModal.vue';
import { useUIStore } from '@/stores/uiStore';

const gameStore = useGameStore();
const assistantStore = useAssistantStore();
const uiStore = useUIStore();

const { s } = storeToRefs(gameStore);
const { statsShown } = storeToRefs(uiStore);
const { firingAssistant, configuringAssistant, configuringAssistantConfig } =
  storeToRefs(assistantStore);
</script>

<template>
  <div
    class="flex flex-col lg:flex-row h-screen overflow-hidden bg-osrs-bg text-osrs-text">
    <!-- Fire confirmation modal -->
    <FireAssistantModal
      v-if="firingAssistant"
      :assistant="firingAssistant"
      @fire="assistantStore.fireAssistant"
      @cancel="assistantStore.cancelFiring" />

    <!-- Assistant config modal -->
    <AssistantConfigModal
      v-if="configuringAssistant && configuringAssistantConfig"
      :assistant="configuringAssistant"
      :config="configuringAssistantConfig"
      @save="assistantStore.saveAssistantConfig"
      @cancel="
        () => {
          configuringAssistant = null;
        }
      " />

    <!-- Stats overlay -->
    <div
      v-if="statsShown"
      class="fixed inset-0 z-40 overflow-y-auto bg-osrs-surface/95 p-6 text-osrs-text">
      <p class="text-osrs-gold font-bold text-xl mb-4">
        Statistics
      </p>

      <p class="font-bold mb-1">
        Lifetime Gold: {{ s.stats.lifetime_wealth }}
      </p>

      <p class="text-osrs-gold font-semibold mt-4 mb-1">
        Gathered Material
      </p>
      <ul class="text-sm space-y-0.5">
        <li
          v-for="gather in s.stats.gathers"
          :key="gather.item_id">
          {{ `${gameStore.getItem(gather.item_id)?.name}: ${gather.value}` }}
        </li>
      </ul>

      <p class="text-osrs-gold font-semibold mt-4 mb-1">
        Crafted Items
      </p>
      <ul class="text-sm space-y-0.5">
        <li
          v-for="craft in s.stats.crafts"
          :key="craft.item_id">
          {{ `${gameStore.getItem(craft.item_id)?.name}: ${craft.value}` }}
        </li>
      </ul>

      <p class="text-osrs-gold font-semibold mt-4 mb-1">
        Gold from Selling
      </p>
      <ul class="text-sm space-y-0.5">
        <li
          v-for="sale in s.stats.sales"
          :key="sale.item_id">
          {{ `${gameStore.getItem(sale.item_id)?.name}: ${sale.value}gp` }}
        </li>
      </ul>
    </div>

    <Sidebar />
    <MainPanel />
  </div>
</template>
