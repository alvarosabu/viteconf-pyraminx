<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { Box3, BoxHelper, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three'
import { useTres } from '@tresjs/core'
import { set } from '@vueuse/core'
import Tetrahedron from './Tetrahedron.vue'
import Octahedron from './Octahedron.vue'

const { nodes: tetrahedronNodes, materials: tetrahedronMaterials } = await useGLTF('/tetrahedron.glb', { draco: true })
const { nodes: octahedronNodes, materials: octahedronMaterials } = await useGLTF('/octahedron.glb', { draco: true })

Object.values(tetrahedronMaterials).forEach((material) => {
/*   material.opacity = 0.5
  material.transparent = true */
  if (material.name === 'NeonFucsia') {
    material.emissiveIntensity = 3
  }
  else if (material.name === 'NeonPurple') {
    material.emissiveIntensity = 6
  }
  else {
    material.emissiveIntensity = 2
  }
})

Object.values(octahedronMaterials).forEach((material) => {
  /* material.opacity = 0.5
  material.transparent = true */
  if (material.name === 'NeonFucsia') {
    material.emissiveIntensity = 3
  }
  else if (material.name === 'NeonPurple') {
    material.emissiveIntensity = 6
  }
  else {
    material.emissiveIntensity = 2
  }
})

const pyraminxRef = ref(null)
const tetrahedronsRef = ref(null)
const tetrahedrons = ref([
  // Top
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1, 0.814 * 2, -0.58],
    data: {
      groups: ['top'],
    },
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [0.5, 0.814, -0.29],
    data: {
      groups: ['middle'],
    },
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1.5, 0.814, -0.29],
    data: {
      groups: ['middle'],
    },
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1, 0.814, -1.16],
    data: {
      groups: ['middle'],
    },
  },
  // Base
  {
    initialPosition: [0, -10, 0],
    finalPosition: [0, 0, 0],
    data: {
      groups: ['base'],
    },
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1, 0, 0],
    data: {
      groups: ['base'],
    },
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [2, 0, 0],
    data: {
      groups: ['base'],
    },
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [0.5, 0, -0.871],
    data: {
      groups: ['base'],
    },
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1.5, 0, -0.871],
    data: {
      groups: ['base'],
    },
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1, 0, -0.871 * 2],
    data: {
      groups: ['base'],
    },
  },

])
const octahedronsRef = ref(null)
const octahedrons = ref([
  {
    initialPosition: [0, -10, 0],
    finalPosition: [0.5, 0, -0.29],
    groups: ['base'],
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1.5, 0, -0.29],
    groups: ['base'],
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1, 0, -1.16],
    groups: ['base'],
  },
  {
    initialPosition: [0, -10, 0],
    finalPosition: [1, 0.814, -0.58],
  },
])
const centroid = ref(null)
const boxRef = ref(null)
const centroidRef = ref(null)

const { scene } = useTres()

watch(() => pyraminxRef.value, (pyraminx) => {
  if (pyraminx) {
    /* const box = new BoxHelper(pyraminx, 0xFFFF00)
    scene.value.add(box) */
    /* const bounds = new Box3().setFromObject(pyraminx) // Compute the bounding box..
    console.log('bounds', bounds.getCenter(pyraminx.position))

    boxRef.geometry.computeBoundingBox()
 */
  }
})

const completedAnimations = ref(0)

const isAnimationComplete = computed(() => completedAnimations.value === tetrahedrons.value.length)

const onAnimationComplete = () => {
  completedAnimations.value++
}

onMounted(() => {
  completedAnimations.value = 0 // Reset on component mount
})

function calculateCentroid(group) {
  const centroid = new Vector3()
  let totalVertices = 0

  group.traverse((object) => {
    if (object.isMesh && object.geometry && object.geometry.attributes.position) {
      const vertices = object.geometry.attributes.position
      const worldMatrix = object.matrixWorld

      for (let i = 0; i < vertices.count; i++) {
        const vertex = new Vector3()
        vertex.fromBufferAttribute(vertices, i)
        vertex.applyMatrix4(worldMatrix)
        centroid.add(vertex)
        totalVertices++
      }
    }
  })

  if (totalVertices > 0) {
    centroid.divideScalar(totalVertices)
  }

  return centroid
}

watch(isAnimationComplete, (value) => {
  if (value) {
    const centroid = calculateCentroid(pyraminxRef.value)
    console.log('Centroid:', centroid)

    const centroidMesh = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial({ color: 0xFF0000 }))
    centroidMesh.position.copy(centroid)
    scene.value.add(centroidMesh)
  }
})
</script>

<template>
  <TresGroup ref="pyraminxRef" :position="[-1.186, 1, -0.814]" :rotation="[-Math.PI, 0, 0]">
    <Tetrahedron
      v-for="(tetrahedron, index) in tetrahedrons"
      ref="tetrahedronsRef"
      :key="index"
      :index="index"
      :name="`tetrahedron-${index}`"
      :user-data="tetrahedron.data"
      :initial-position="tetrahedron.initialPosition"
      :final-position="tetrahedron.finalPosition"
      :model="tetrahedronNodes.Tetrahedron"
      @animation-complete="onAnimationComplete"
    />
    <Octahedron
      v-for="(octahedron, index) in octahedrons"
      ref="octahedronsRef"
      :key="index"
      :index="index"
      :name="`octahedron-${index}`"
      :initial-position="octahedron.initialPosition"
      :final-position="octahedron.finalPosition"
      :model="octahedronNodes.Octahedron"
    />
  </TresGroup>
</template>
