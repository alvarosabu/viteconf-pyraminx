<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  model: any
  index: number
  position: number[]
  userData: any
}>()

const modelRef = ref(null)

watch(modelRef, (value) => {
  value.position.set(...props.position)
  modelRef.value.userData = props.userData
})
</script>

<template>
  <primitive ref="modelRef" :object="model" />
</template>
