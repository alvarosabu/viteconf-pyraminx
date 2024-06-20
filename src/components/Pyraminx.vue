<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useTres } from '@tresjs/core'

import { useMagicKeys } from '@vueuse/core'
import type { Group } from 'three'
import { usePyraminx } from '../composables/usePyraminx'
import Tetrahedron from './Tetrahedron.vue'
import Octahedron from './Octahedron.vue'

const pyraminxRef = ref<Group | null>()

const { scene } = useTres()
const {
  // Models
  tetrahedronNodes,
  octahedronNodes,
  // Color logic
  /* currentColors,
  getCurrentColorOrientation, */
  // Pyraminx logic
  tetrahedrons,
  octahedrons,
  rotateSection,
} = await usePyraminx(pyraminxRef as Ref<Group>, scene)

function shuffle() {
  setInterval(() => {
    const section = ['U', 'u', 'L', 'l', 'R', 'r', 'B', 'b']
    const randomSection = section[Math.floor(Math.random() * section.length)]
    const clockwise = Math.random() < 0.5
    rotateSection(randomSection, clockwise)
  }, 1000)
}

const { shift, ctrl, l, r, u, b, s } = useMagicKeys()

watch(l, (value) => {
  if (value) {
    rotateSection(ctrl.value ? 'l' : 'L', !shift.value)
  }
})

watch(r, (value) => {
  if (value) {
    rotateSection(ctrl.value ? 'r' : 'R', !shift.value)
  }
})

watch(u, (value) => {
  if (value) {
    rotateSection(ctrl.value ? 'u' : 'U', !shift.value)
  }
})

watch(b, (value) => {
  if (value) {
    rotateSection(ctrl.value ? 'b' : 'B', !shift.value)
  }
})

watch(s, (value) => {
  if (value && pyraminxRef.value) {
    shuffle()
  }
})
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
