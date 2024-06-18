<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { reactive } from 'vue'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import TheExperience from './components/TheExperience.vue'

const state = reactive({
  alpha: true,
  transparent: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})
</script>

<template>
  <TresCanvas v-bind="state" window-size>
    <TheExperience />
  </TresCanvas>
</template>
