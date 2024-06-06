<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  model: any
  index: number
  position: number[]
  userData: any
}>()

const emits = defineEmits(['animationComplete'])
const modelRef = ref(null)
watch(modelRef, (value) => {
  value.position.set(...props.position)
  /*  gsap.to(value.position, {
    duration: 1 + props.index * 0.5,
    x: props.finalPosition[0],
    y: props.finalPosition[1],
    z: props.finalPosition[2],
    onComplete: () => {
      emits('animationComplete', props.index)
    },
  }) */
  modelRef.value.userData = props.userData
})
</script>

<template>
  <primitive ref="modelRef" :object="model" />
</template>
