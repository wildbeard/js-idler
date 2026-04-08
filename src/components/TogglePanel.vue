<script setup lang="ts">
defineProps<{
  title: string;
  open: boolean;
  badge?: string;
}>();

defineEmits<{ toggle: [] }>();
</script>

<template>
  <div class="border-b border-osrs-border">
    <div
      class="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-osrs-panel/30 select-none"
      @click="$emit('toggle')"
    >
      <div class="flex items-center gap-2 min-w-0">
        <span class="font-bold text-osrs-gold">{{ title }}</span>
        <span v-if="badge" class="text-xs text-osrs-muted">{{ badge }}</span>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <slot name="header-right" />
        <span class="text-osrs-muted text-xs">{{ open ? '▲' : '▼' }}</span>
      </div>
    </div>
    <div v-show="open" class="px-3 py-2">
      <slot />
    </div>
  </div>
</template>
