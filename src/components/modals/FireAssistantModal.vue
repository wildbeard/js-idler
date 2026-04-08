<script setup lang="ts">
import type { Assistant } from '@/types';

defineProps<{ assistant: Assistant }>();
defineEmits<{ fire: [assistant: Assistant]; cancel: [] }>();
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('cancel')">
    <div class="modal-panel">
      <p class="text-base mb-4">
        Are you sure you want to fire
        <span class="font-bold underline text-osrs-gold">{{
          assistant.name
        }}</span
        >? This cannot be undone.
      </p>
      <div class="flex justify-center gap-3">
        <button class="btn" @click="$emit('fire', assistant)">Fire</button>
        <button class="btn" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>
