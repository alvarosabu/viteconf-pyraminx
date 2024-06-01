<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { reactive } from 'vue'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import TheExperience from './components/TheExperience.vue'
import ControlsModal from './components/ControlsModal.vue'

const state = reactive({
  clearColor: '#1a1e25',
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})
</script>

<template>
  <div class="relative w-full h-full">
    <!--     <ControlsModal /> -->
    <TresCanvas v-bind="state">
      <TheExperience />
    </TresCanvas>
  </div>
</template>
