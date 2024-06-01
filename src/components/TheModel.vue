<script setup lang="ts">
import { useGLTF, useTweakPane } from '@tresjs/cientos'
import { ref, watch } from 'vue'

useTweakPane()

const { scene: model } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  {
    draco: true,
  },
)

const akuAkuRef = ref(null)

watch(akuAkuRef, (model) => {
  // eslint-disable-next-line no-console
  console.log('akuAkuRef', model)
})
</script>

<template>
  <TresGroup :position="[0, 2, 0]">
    <primitive ref="akuAkuRef" :object="model" />
  </TresGroup>
</template>
