<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three'
import { useLoop, useTres } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { useThrottleFn } from '@vueuse/core'
import { useAnimate } from '../composable/useAnimate'
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

    position: [1, 0.814 * 2, -0.58],
    data: {
      groups: ['top'],
    },
  },
  {

    position: [0.5, 0.814, -0.29],
    data: {
      groups: ['middle'],
    },
  },
  {

    position: [1.5, 0.814, -0.29],
    data: {
      groups: ['middle'],
    },
  },
  {

    position: [1, 0.814, -1.16],
    data: {
      groups: ['middle'],
    },
  },
  // Base
  {

    position: [0, 0, 0],
    data: {
      groups: ['base'],
    },
  },
  {

    position: [1, 0, 0],
    data: {
      groups: ['base'],
    },
  },
  {

    position: [2, 0, 0],
    data: {
      groups: ['base'],
    },
  },
  {

    position: [0.5, 0, -0.871],
    data: {
      groups: ['base'],
    },
  },
  {

    position: [1.5, 0, -0.871],
    data: {
      groups: ['base'],
    },
  },
  {

    position: [1, 0, -0.871 * 2],
    data: {
      groups: ['base'],
    },
  },

])
const octahedronsRef = ref(null)
const octahedrons = ref([
  {

    position: [0.5, 0, -0.29],
    data: {
      groups: ['base'],
    },
  },
  {

    position: [1.5, 0, -0.29],
    data: {
      groups: ['base'],
    },
  },
  {

    position: [1, 0, -1.16],
    data: {
      groups: ['base'],
    },
  },
  {

    position: [1, 0.814, -0.58],
    data: {
      groups: ['middle'],
    },
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

/* function calculateCentroid(group) {
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
} */

const calculateCentroid = (objects) => {
  const centroid = new Vector3()
  objects.forEach((obj) => {
    centroid.add(obj.position)
  })
  centroid.divideScalar(objects.length)
  return centroid
}

const rotateAroundPoint = (obj, point, axis, theta) => {
  obj.position.sub(point) // remove the offset
  obj.position.applyAxisAngle(axis, theta) // rotate the position
  obj.position.add(point) // re-add the offset

  obj.rotateOnAxis(axis, theta) // rotate the object
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

const { animateTo, animate } = useAnimate()
const rotateSection = (objects, axis, angle, duration = 1, easing = 'linear') => {
  const centroid = calculateCentroid(objects)

  objects.forEach((obj) => {
    const startPosition = obj.position.clone()
    const startRotation = obj.rotation.clone()

    // Calculate the end position after rotation around the centroid
    const endPosition = startPosition.clone().sub(centroid).applyAxisAngle(axis, angle).add(centroid)

    // Animate position
    animate(
      obj.position,
      { x: startPosition.x, y: startPosition.y, z: startPosition.z },
      { x: endPosition.x, y: endPosition.y, z: endPosition.z },
      { duration, easing },
    )

    // Animate rotation
    animate(
      obj.rotation,
      { y: startRotation.y },
      { y: startRotation.y + angle },
      { duration, easing },
    )
  })
}

const log = useThrottleFn(value => console.log('Pyraminx', value), 3000)

const { onBeforeRender } = useLoop()

const topTetrahedron = computed(() => pyraminxRef.value.children.find(child => child.userData.groups.includes('top')))
const topMiddleSection = computed(() => pyraminxRef.value.children.filter(child => child.userData.groups.includes('middle') || child.userData.groups.includes('top')))

/* onBeforeRender(({ delta }) => {
  if (topMiddleSection.value) {
    log(topMiddleSection.value)
  }
}) */

function animateTop() {
  if (topTetrahedron.value) {
    animateTo(
      topTetrahedron.value.rotation,
      { y: `+=${2 * Math.PI / 3}` },
      { duration: 1, easing: 'ease-in' },
    )
  }
}

function animateTopMiddleSection() {
  if (topMiddleSection.value) {
    rotateSection(topMiddleSection.value, new Vector3(0, 1, 0), 2 * Math.PI / 3)
  }
}
</script>

<template>
  <TresGroup
    ref="pyraminxRef"
    :position="[-1.186, 1, -0.814]"
    :rotation="[-Math.PI, 0, 0]"
    @click="animateTopMiddleSection"
  >
    <Tetrahedron
      v-for="(tetrahedron, index) in tetrahedrons"
      ref="tetrahedronsRef"
      :key="index"
      :index="index"
      :name="`tetrahedron-${index}`"
      :user-data="tetrahedron.data"
      :position="tetrahedron.position"
      :model="tetrahedronNodes.Tetrahedron"
    />
    <Octahedron
      v-for="(octahedron, index) in octahedrons"
      ref="octahedronsRef"
      :key="index"
      :index="index"
      :name="`octahedron-${index}`"
      :user-data="octahedron.data"
      :position="octahedron.position"
      :model="octahedronNodes.Octahedron"
    />
  </TresGroup>
</template>
