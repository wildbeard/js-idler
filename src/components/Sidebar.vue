<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
import { useUIStore } from '@/stores/uiStore';
import TogglePanel from './TogglePanel.vue';

const gameStore = useGameStore();
const uiStore = useUIStore();

const { s, upkeep } = storeToRefs(gameStore);
const { toggleState } = storeToRefs(uiStore);

function sellItem(itemId: string, all = false) {
  const item = gameStore.getItem(itemId);
  if (item) gameStore.userDidSell(item, all);
}

function hasItem(itemId: string) {
  const item = gameStore.getItem(itemId);
  return item ? gameStore.hasInventory(item) : false;
}
</script>

<template>
  <div
    id="sidebar"
    class="flex-none w-full lg:w-64 flex flex-col overflow-y-auto border-b-2 lg:border-b-0 lg:border-r-2 border-osrs-border bg-osrs-surface max-h-56 lg:max-h-none"
  >
    <!-- Levels -->
    <div class="p-3 border-b border-osrs-border flex-shrink-0">
      <div class="flex items-center justify-between mb-2">
        <p class="text-osrs-gold font-bold text-sm uppercase tracking-wide">
          Levels
        </p>
        <p class="text-osrs-gold font-bold text-sm">{{ s.gold }}gp</p>
      </div>
      <!-- 2-col on mobile, stacked on desktop -->
      <div class="grid grid-cols-2 lg:grid-cols-1 gap-3">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-osrs-text">Mining {{ s.levels.mining }}</span>
            <span class="text-osrs-muted text-xs"
              >{{ gameStore.xpForSkill('mining') }}%</span
            >
          </div>
          <div
            class="h-2 rounded overflow-hidden bg-osrs-bg border border-osrs-border/40"
          >
            <div
              class="h-full bg-osrs-green transition-all duration-300"
              :style="{ width: gameStore.xpForSkill('mining') + '%' }"
            ></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-osrs-text">Smithing {{ s.levels.smithing }}</span>
            <span class="text-osrs-muted text-xs"
              >{{ gameStore.xpForSkill('smithing') }}%</span
            >
          </div>
          <div
            class="h-2 rounded overflow-hidden bg-osrs-bg border border-osrs-border/40"
          >
            <div
              class="h-full bg-osrs-green transition-all duration-300"
              :style="{ width: gameStore.xpForSkill('smithing') + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upkeep -->
    <TogglePanel
      title="Upkeep"
      :open="toggleState.upkeep"
      @toggle="uiStore.togglePanel('upkeep')"
    >
      <template #header-right>
        <span class="text-xs text-osrs-muted"
          >{{ upkeep.progress + upkeep.assistant }}gp</span
        >
      </template>
      <div class="text-sm space-y-1.5 py-1">
        <p class="text-osrs-muted text-xs">
          Paid every {{ gameStore.getUpkeepDisplayTime() }}
        </p>
        <div class="flex justify-between">
          <span class="font-semibold">Shop</span>
          <span>{{ upkeep.progress }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Assistants</span>
          <span>{{ upkeep.assistant }}</span>
        </div>
        <hr class="border-osrs-border/50" />
        <div class="flex justify-between font-bold">
          <span>Total</span>
          <span>{{ upkeep.progress + upkeep.assistant }}</span>
        </div>
      </div>
    </TogglePanel>

    <!-- Inventory -->
    <TogglePanel
      title="Inventory"
      :open="toggleState.inventory"
      @toggle="uiStore.togglePanel('inventory')"
    >
      <div class="text-sm py-1">
        <div
          v-for="category in ['ores', 'bars', 'armor', 'weapons']"
          :key="category"
          class="mb-2"
        >
          <div
            class="flex justify-between items-center py-1 border-b border-osrs-border/40 cursor-pointer hover:text-osrs-gold mb-1 select-none"
            @click="uiStore.toggleInventory(category)"
          >
            <span
              class="capitalize font-semibold text-osrs-muted text-xs uppercase tracking-wide"
              >{{ category }}</span
            >
            <span class="text-xs text-osrs-muted">{{
              toggleState.inventory_categories[category] ? '▲' : '▼'
            }}</span>
          </div>
          <ul
            v-show="toggleState.inventory_categories[category]"
            class="space-y-1"
          >
            <li
              v-for="invItem in s.inventory.filter((i) =>
                gameStore.getItem(i.item_id)?.categories.includes(category),
              )"
              :key="invItem.item_id"
            >
              <div class="flex justify-between items-center gap-1">
                <span class="truncate text-xs">
                  {{ gameStore.getItem(invItem.item_id)?.name }} x{{
                    invItem.quantity
                  }}
                </span>
                <div class="flex gap-1 flex-shrink-0">
                  <button
                    class="btn"
                    title="Sell one (shift-click to sell all)"
                    :disabled="!hasItem(invItem.item_id)"
                    @click.shift="sellItem(invItem.item_id, true)"
                    @click.exact="sellItem(invItem.item_id)"
                  >
                    $
                  </button>
                  <button
                    class="btn lg:hidden"
                    :disabled="!hasItem(invItem.item_id)"
                    @click="sellItem(invItem.item_id, true)"
                  >
                    $$
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="text-right mt-2">
          <button
            class="btn"
            :title="`Bank Sale! ${gameStore.getBankSaleValue()}gp!`"
            @click="gameStore.bankSale()"
          >
            Sell All
          </button>
        </div>
      </div>
    </TogglePanel>
  </div>
</template>
