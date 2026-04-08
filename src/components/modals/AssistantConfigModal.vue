<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import type { Assistant, Item } from '@/types';
import { items } from '@/data/items';
import { useGameStore } from '@/stores/gameStore';

const props = defineProps<{
  assistant: Assistant;
  config: {
    mining: string[];
    smithing: string[];
    selling: Record<
      string,
      { checked: boolean; item_id: string; method: string; value: number }
    >;
  };
}>();
const emit = defineEmits<{ save: [assistant: Assistant]; cancel: [] }>();

const { s } = storeToRefs(useGameStore());

const miningItems = computed(() =>
  items.filter(
    (i: Item) => i.skill === 'mining' && i.level <= s.value.levels.mining,
  ),
);
const smithingItems = computed(() =>
  items.filter(
    (i: Item) =>
      i.skill === 'smithing' &&
      i.level <= s.value.levels.smithing &&
      i.sellable,
  ),
);
const sellingItems = computed(() =>
  items.filter(
    (i: Item) =>
      i.level <= (s.value.levels[i.skill ?? 'mining'] ?? 1) && i.sellable,
  ),
);
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('cancel')">
    <div class="modal-panel w-full">
      <p class="text-lg font-bold text-osrs-gold mb-1">{{ assistant.name }}</p>
      <p class="text-sm text-osrs-muted mb-3">
        {{ assistant.name }} will randomly perform one of the following tasks:
      </p>

      <div class="max-h-96 overflow-y-auto text-sm">
        <template v-if="assistant.skills.includes('mining')">
          <p class="font-semibold text-osrs-gold mb-2">Mining</p>
          <ul class="space-y-1 mb-4">
            <li v-for="item in miningItems" :key="item.item_id">
              <label
                class="flex items-center gap-2 cursor-pointer hover:text-osrs-gold"
              >
                <input
                  type="checkbox"
                  :value="item.item_id"
                  v-model="config.mining"
                  class="accent-osrs-gold"
                />
                {{ item.name }}
              </label>
            </li>
          </ul>
        </template>

        <template v-else-if="assistant.skills.includes('smithing')">
          <p class="font-semibold text-osrs-gold mb-2">Smithing</p>
          <ul class="space-y-1 mb-4">
            <li v-for="item in smithingItems" :key="item.item_id">
              <label
                class="flex items-center gap-2 cursor-pointer hover:text-osrs-gold"
              >
                <input
                  type="checkbox"
                  :value="item.item_id"
                  v-model="config.smithing"
                  class="accent-osrs-gold"
                />
                {{ item.name }}
              </label>
            </li>
          </ul>
        </template>

        <template v-else>
          <p class="font-semibold text-osrs-gold mb-2">Selling</p>
          <ul class="space-y-3">
            <li v-for="item in sellingItems" :key="item.item_id">
              <label
                class="flex items-center gap-2 cursor-pointer hover:text-osrs-gold"
              >
                <input
                  type="checkbox"
                  v-model="config.selling[item.item_id].checked"
                  class="accent-osrs-gold"
                />
                {{ item.name }}
              </label>
              <div
                v-if="config.selling[item.item_id].checked"
                class="ml-5 mt-1 space-y-1"
              >
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="config.selling[item.item_id].method"
                    value="all"
                    class="accent-osrs-gold"
                  />
                  Sell All
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="config.selling[item.item_id].method"
                    value="sell_x"
                    class="accent-osrs-gold"
                  />
                  Sell X
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="config.selling[item.item_id].method"
                    value="keep_x"
                    class="accent-osrs-gold"
                  />
                  Keep X in Inventory
                </label>
                <label
                  v-if="config.selling[item.item_id].method !== 'all'"
                  class="flex items-center gap-2"
                >
                  {{
                    config.selling[item.item_id].method === 'sell_x'
                      ? 'Sell'
                      : 'Keep'
                  }}
                  <input
                    type="number"
                    v-model="config.selling[item.item_id].value"
                    min="0"
                    class="w-20 bg-osrs-bg border border-osrs-border rounded px-2 py-0.5 text-osrs-text"
                  />
                </label>
              </div>
            </li>
          </ul>
        </template>
      </div>

      <div class="flex justify-end gap-3 mt-4 pt-3 border-t border-osrs-border">
        <button class="btn" @click="$emit('save', assistant)">Save</button>
        <button class="btn" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>
