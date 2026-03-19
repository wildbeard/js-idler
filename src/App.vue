<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore } from './stores/gameStore'
import { useAssistantStore } from './stores/assistantStore'
import Sidebar from './components/Sidebar.vue'
import MainPanel from './components/MainPanel.vue'
import RightBar from './components/RightBar.vue'
import FireAssistantModal from './components/modals/FireAssistantModal.vue'
import AssistantConfigModal from './components/modals/AssistantConfigModal.vue'
import { useUIStore } from './stores/uiStore'

const gameStore = useGameStore()
const assistantStore = useAssistantStore()
const uiStore = useUIStore()

const { s } = storeToRefs(gameStore)
const { statsShown } = storeToRefs(uiStore)
const { firingAssistant, configuringAssistant, configuringAssistantConfig } = storeToRefs(assistantStore)
</script>

<template>
  <div class="wrapper">
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
      @cancel="() => { configuringAssistant = null }" />

    <!-- Stats overlay -->
    <div v-if="statsShown" class="stats" style="flex: 1 0 100%;">
      <p>Lifetime Gold: {{ s.stats.lifetime_wealth }}</p>

      <p>Gathered Material</p>
      <ul>
        <li v-for="gather in s.stats.gathers" :key="gather.item_id">
          {{ `${gameStore.getItem(gather.item_id)?.name}: ${gather.value}` }}
        </li>
      </ul>

      <p>Crafted Items</p>
      <ul>
        <li v-for="craft in s.stats.crafts" :key="craft.item_id">
          {{ `${gameStore.getItem(craft.item_id)?.name}: ${craft.value}` }}
        </li>
      </ul>

      <p>Gold from Selling</p>
      <ul>
        <li v-for="sale in s.stats.sales" :key="sale.item_id">
          {{ `${gameStore.getItem(sale.item_id)?.name}: ${sale.value}gp` }}
        </li>
      </ul>
    </div>

    <Sidebar />
    <MainPanel />
    <RightBar />
  </div>
</template>
