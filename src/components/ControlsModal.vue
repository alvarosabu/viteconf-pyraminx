<script setup lang="ts">
import { ref } from 'vue'

const controls = ref([
  {
    label: `U`, // Move groups ['top', 'middle']
  },

])
</script>

<template>
  <div class="bg-dark-600 absolute bottom-8 right-8 p-4 min-h-200px min-w-300px z-20 rounded-lg shadow-lg border-2 border-solid border-purple-400">
    <header class="flex w-full justify-between">
      <button class="bg-purple-400">Scramble</button>
      <button class="bg-purple-400">Reset</button>
    </header>
  </div>
</template>
