<script setup lang="ts">
defineProps<{
  title: string
  open: boolean
  badge?: string
}>()

defineEmits<{ toggle: [] }>()
</script>

<template>
  <div class="toggle-panel">
    <div class="toggle-panel__header" @click="$emit('toggle')">
      <div>
        <p class="toggle-panel__header-title">
          {{ title }}
          <span v-if="badge" style="font-size: 0.85rem;">{{ badge }}</span>
        </p>
        <slot name="header-right" />
      </div>
      <button class="minimize-button" type="button" @click.stop="$emit('toggle')">
        {{ open ? '-' : '+' }}
      </button>
    </div>
    <div class="toggle-panel__body" v-show="open">
      <slot />
    </div>
  </div>
</template>
