<script setup lang="ts">
import { ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  model: any
  initialPosition: number[]
  finalPosition: number[]
  index: number
}>()

const modelRef = ref(null)

watch(modelRef, (value) => {
  value.position.set(...props.initialPosition)
  gsap.to(value.position, {
    duration: 1 + props.index * 0.5,
    x: props.finalPosition[0],
    y: props.finalPosition[1],
    z: props.finalPosition[2],
  })
})
</script>

<template>
  <primitive ref="modelRef" :object="model" />
</template>
