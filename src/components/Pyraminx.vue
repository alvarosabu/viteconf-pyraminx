<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useTres } from '@tresjs/core'
import type { Group } from 'three'
import { usePyraminx } from '../composables/usePyraminx'
import { useKeybindings } from '../composables/useKeybindings'
import Tetrahedron from './Tetrahedron.vue'
import Octahedron from './Octahedron.vue'

const pyraminxRef = ref<Group | null>()

const { scene } = useTres()
const {
  // Models
  tetrahedronNodes,
  octahedronNodes,
  
  // Color logic
  getFromFacePosition,
  getFromColor,
  getColor,

  // Pyraminx logic
  tetrahedrons,
  octahedrons,
  rotateSection,

} = await usePyraminx(pyraminxRef as Ref<Group>, scene)

useKeybindings(rotateSection)
</script>

<template>
  <TresGroup ref="pyraminxRef">
    <Tetrahedron
      v-for="(tetrahedron, index) in tetrahedrons"
      :key="index"
      :index="index"
      :name="`tetrahedron-${tetrahedron.data.groups.join('-')}`"
      :user-data="tetrahedron.data"
      :position="tetrahedron.position"
      :model="tetrahedronNodes.TetrahedronHybrid"
    />
    <Octahedron
      v-for="(octahedron, index) in octahedrons"
      :key="index"
      :index="index"
      :name="`octahedron-${octahedron.data.groups.join('-')}`"
      :user-data="octahedron.data"
      :position="octahedron.position"
      :model="octahedronNodes.OctahedronHybrid"
    />
  </TresGroup>
</template>
