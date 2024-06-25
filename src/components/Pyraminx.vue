<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, onMounted } from 'vue'
import { useTres } from '@tresjs/core'
import type { Group } from 'three'
import { usePyraminx } from '../composables/usePyraminx'
import { useKeybindings } from '../composables/useKeybindings'
import Tetrahedron from './Tetrahedron.vue'
import Octahedron from './Octahedron.vue'
import { useSolver } from '../composables/useSolver.js'

const pyraminxRef = ref<Group | null>()

const { scene } = useTres()
const {
  tetrahedronNodes,
  octahedronNodes,
  tetrahedrons,
  octahedrons,
  pyramid,
} = await usePyraminx(pyraminxRef as Ref<Group>, scene)

onMounted(() => {
  // Do a quick scramble of the pyramid
  const sections = ['U', 'L', 'R', 'B']
  let prevSection
  for (let i = 0; i < 10; i++) {
    let section
    while(!section || section === prevSection) {
      section = sections[Math.floor(Math.random() * sections.length)]
    }
    prevSection = section
    pyramid.rotateSection(Math.random() > 0.7 ? section.toLocaleLowerCase() : section, Math.random() > 0.5, 200)
  }
  setTimeout(() => {
    useSolver(pyramid)
  }, 3000)
})

useKeybindings(pyramid.rotateSection)
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
