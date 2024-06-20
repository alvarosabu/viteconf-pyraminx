<script setup lang="ts">
import { Bloom, EffectComposer } from '@tresjs/post-processing'
import { reactive } from 'vue'
import { BlendFunction, KernelSize } from 'postprocessing'
import Pyraminx from './Pyraminx.vue'
import OrbitControls from './OrbitControls.vue'

const bloomParams = reactive({
  threshold: 2,
  smoothing: 0.5,
  intensity: 4,
  blendFunction: BlendFunction.ADD,
  kernelSize: KernelSize.VERY_SMALL,
  resolution: 256,
  mipmapBlur: true,
})
</script>

<template>
  <TresPerspectiveCamera :zoom="2.1" :position="[-6, -3, 6]" :up="[0, -1, 0]" />
  <OrbitControls
    :autoRotate="true"
    :autoRotateSpeed="1"
    :enablePan="false"
    :enableZoom="false"
  />
  <TresAmbientLight
    :intensity="0.5"
    color="red"
  />
  <Suspense>
    <Pyraminx />
  </Suspense>
  <Suspense>
    <EffectComposer
      :depth-buffer="true"
      v-bind="bloomParams"
    >
      <Bloom />
    </EffectComposer>
  </Suspense>
  <TresDirectionalLight
    :position="[0, 2, 4]"
    :intensity="1"
    cast-shadow
  />
</template>
