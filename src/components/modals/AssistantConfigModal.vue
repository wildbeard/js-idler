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
  <div class="floating-window assistant-config">
    <p style="font-size: 1.4rem">{{ assistant.name }}</p>
    <p>
      {{ assistant.name }} will randomly perform one of the following tasks:
    </p>

    <div class="floating-window__body">
      <template v-if="assistant.skills.includes('mining')">
        Mining
        <ul>
          <li v-for="item in miningItems" :key="item.item_id">
            <label>
              <input
                type="checkbox"
                :value="item.item_id"
                v-model="config.mining"
              />
              {{ item.name }}
            </label>
          </li>
        </ul>
      </template>
      <template v-else-if="assistant.skills.includes('smithing')">
        Smithing
        <ul>
          <li v-for="item in smithingItems" :key="item.item_id">
            <label>
              <input
                type="checkbox"
                :value="item.item_id"
                v-model="config.smithing"
              />
              {{ item.name }}
            </label>
          </li>
        </ul>
      </template>
      <template v-else>
        Selling
        <ul>
          <li v-for="item in sellingItems" :key="item.item_id">
            <label>
              <input
                type="checkbox"
                v-model="config.selling[item.item_id].checked"
              />
              {{ item.name }}
            </label>
            <div
              v-if="config.selling[item.item_id].checked"
              style="display: flex; flex-wrap: wrap"
            >
              <label style="flex: 0 0 100%">
                <input
                  type="radio"
                  v-model="config.selling[item.item_id].method"
                  value="all"
                />
                Sell All
              </label>
              <label style="flex: 0 0 100%">
                <input
                  type="radio"
                  v-model="config.selling[item.item_id].method"
                  value="sell_x"
                />
                Sell X
              </label>
              <label style="flex: 0 0 100%">
                <input
                  type="radio"
                  v-model="config.selling[item.item_id].method"
                  value="keep_x"
                />
                Keep X in Inventory
              </label>
              <label
                v-if="config.selling[item.item_id].method !== 'all'"
                style="flex: 0 0 calc(100% - 4px); margin-left: 4px"
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
                />
              </label>
            </div>
          </li>
        </ul>
      </template>
    </div>

    <div style="margin-top: 1rem; text-align: right">
      <button style="margin-right: 15px" @click="$emit('save', assistant)">
        Save
      </button>
      <button @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>
