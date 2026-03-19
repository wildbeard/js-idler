<script setup lang="ts">
import type { Assistant } from '@/types';

defineProps<{ assistant: Assistant }>();
defineEmits<{ fire: [assistant: Assistant]; cancel: [] }>();
</script>

<template>
  <div class="floating-window">
    <p>
      Are you sure you want to fire
      <span style="font-weight: bold; text-decoration: underline">{{
        assistant.name
      }}</span
      >? This action cannot be undone!
    </p>
    <div style="text-align: center">
      <button style="margin-right: 15px" @click="$emit('fire', assistant)">
        Fire
      </button>
      <button @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>
