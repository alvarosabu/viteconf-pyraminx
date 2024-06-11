<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { ArrowHelper, Color, Matrix4, Mesh, MeshBasicMaterial, Quaternion, SphereGeometry, Vector3 } from 'three'
import { useTres } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { useMagicKeys } from '@vueuse/core'
import Tetrahedron from './Tetrahedron.vue'
import Octahedron from './Octahedron.vue'

const { nodes: tetrahedronNodes, materials: tetrahedronMaterials } = await useGLTF('/hybrid-tetrahedron.glb', { draco: true })
const { nodes: octahedronNodes, materials: octahedronMaterials } = await useGLTF('/octahedron.gltf', { draco: true })
console.log('Tetrahedron nodes:', tetrahedronNodes)
Object.values(tetrahedronMaterials).forEach((material) => {
  material.opacity = 1
  material.transparent = true
  if (material.name === 'NeonFucsia') {
    material.emissiveIntensity = 3
  }
  else if (material.name === 'NeonPurple') {
    material.emissive = new Color('blue')
    material.emissiveIntensity = 6
  }
  else {
    material.emissiveIntensity = 2
  }
})

Object.values(octahedronMaterials).forEach((material) => {
  material.opacity = 1
  material.transparent = true
  if (material.name === 'NeonFucsia') {
    material.emissiveIntensity = 3
  }
  else if (material.name === 'NeonPurple') {
    material.emissive = new Color('blue')
    material.emissiveIntensity = 6
  }
  else {
    material.emissiveIntensity = 2
  }
})

const pyraminxRef = ref(null)
const tetrahedronsRef = ref(null)
// Following the logic of https://ruwix.com/online-puzzle-simulators/pyraminx-simulator.php
const EDGE_LENGTH = 1
const DEEP = Math.sqrt(3) / 2
const HEIGHT = Math.sqrt(2 / 3) * EDGE_LENGTH

const tetrahedrons = ref([
  // Base
  {
    position: [0, 0, 0],
    data: {
      originalGroups: ['l', 'L'],
      groups: ['l', 'L'],
    },
  },
  {
    position: [EDGE_LENGTH, 0, 0],
    data: {
      originalGroups: ['L', 'R'],
      groups: ['L', 'R'],
    },
  },
  {
    position: [EDGE_LENGTH / 2, 0, -DEEP],
    data: {
      originalGroups: ['L', 'B'],
      groups: ['L', 'B'],
    },
  },
  {
    position: [EDGE_LENGTH * 2, 0, 0],
    data: {
      originalGroups: ['r', 'R'],
      groups: ['r', 'R'],
    },
  },
  {
    position: [EDGE_LENGTH * 1.5, 0, -DEEP],
    data: {
      originalGroups: ['R', 'B'],
      groups: ['R', 'B'],
    },
  },
  {
    position: [EDGE_LENGTH, 0, -DEEP * 2],
    data: {
      originalGroups: ['b', 'B'],
      groups: ['b', 'B'],
    },
  },
  // Middle
  {
    position: [EDGE_LENGTH / 2, +HEIGHT, -0.2887],
    data: {
      originalGroups: ['L', 'U'],
      groups: ['L', 'U'],
    },
  },
  {
    position: [EDGE_LENGTH * 1.5, +HEIGHT, -0.2887],
    data: {
      originalGroups: ['R', 'U'],
      groups: ['R', 'U'],
    },
  },
  {
    position: [EDGE_LENGTH, +HEIGHT, -1.154],
    data: {
      originalGroups: ['U', 'B'],
      groups: ['U', 'B'],
    },
  },
  // Top
  {
    position: [EDGE_LENGTH, +HEIGHT * 2, -0.577],
    data: {
      originalGroups: ['u', 'U'],
      groups: ['u', 'U'],
    },
  },
])
/* const tetrahedrons = ref([
  // Top
  {

    position: [1, 0.814 * 2, -0.58],
    data: {
      groups: ['u', 'U'],
    },
  },
  {

    position: [0.5, 0.814, -0.29],
    data: {
      groups: ['U', 'L'],
    },
  },
  {

    position: [1.5, 0.814, -0.29],
    data: {
      groups: ['U', 'R'],
    },
  },
  {

    position: [1, 0.814, -1.16],
    data: {
      groups: ['U', 'B'],
    },
  },
  // Base
  {

    position: [0, 0, 0],
    data: {
      groups: ['l', 'L'],
    },
  },
  {

    position: [1, 0, 0],
    data: {
      groups: ['L', 'R'],
    },
  },
  {

    position: [2, 0, 0],
    data: {
      groups: ['r', 'R'],
    },
  },
  {

    position: [0.5, 0, -0.866001],
    data: {
      groups: ['L', 'B'],
    },
  },
  {

    position: [1.5, 0, -0.866001],
    data: {
      groups: ['R', 'B'],
    },
  },
  {
    position: [1, 0, -0.866001 * 2],
    data: {
      groups: ['b', 'B'],
    },
  },

]) */
const octahedronsRef = ref(null)
const octahedrons = ref([
  /* {

    position: [0.5, 0, -0.29],
    data: {
      groups: ['L'],
    },
  },
  {

    position: [1.5, 0, -0.29],
    data: {
      groups: ['R'],
    },
  },
  {

    position: [1, 0, -1.16],
    data: {
      groups: ['B'],
    },
  },
  {

    position: [1, 0.814, -0.58],
    data: {
      groups: ['U'],
    },
  }, */
])
const currentCentroid = ref([0, 0, 0])

const { scene } = useTres()

const completedAnimations = ref(0)

const isAnimationComplete = computed(() => completedAnimations.value === tetrahedrons.value.length)

const groupUpdates = {
  L: {
    clockwise: {
      U: 'B',
      R: 'U',
      B: 'R',
    },
    counterclockwise: {
      U: 'R',
      R: 'B',
      B: 'U',
    },
  },
  R: {
    clockwise: {
      U: 'L',
      L: 'B',
      B: 'U',
    },
    counterclockwise: {
      U: 'B',
      B: 'L',
      L: 'U',
    },
  },
  U: {
    clockwise: {
      L: 'R',
      R: 'B',
      B: 'L',
    },
    counterclockwise: {
      L: 'B',
      B: 'R',
      R: 'L',
    },
  },
  B: {
    clockwise: {
      L: 'U',
      U: 'R',
      R: 'L',
    },
    counterclockwise: {
      L: 'R',
      R: 'U',
      U: 'L',
    },
  },
}

function updateGroups(groups, section, clockwise) {
  const updates = groupUpdates[section][clockwise ? 'clockwise' : 'counterclockwise']
  return groups.map(group => updates[group] || group)
}

function calculateCentroid(meshes) {
  let totalVertices = 0
  let sumX = 0; let sumY = 0; let sumZ = 0

  meshes.forEach((mesh) => {
    const geometry = mesh.geometry || mesh.children[0].geometry
    // Ensure the mesh geometry has been updated (useful if there are transformations)
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()

    // Get the vertices from the geometry
    const positionAttribute = geometry.attributes.position
    const vertex = new Vector3()

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)
      vertex.applyMatrix4(mesh.matrixWorld) // Transform to world coordinates

      sumX += vertex.x
      sumY += vertex.y
      sumZ += vertex.z
    }

    totalVertices += positionAttribute.count
  })

  console.log('Total vertices:', totalVertices)

  if (totalVertices === 0) { return null } // No vertices found

  const centroid = new Vector3(sumX / totalVertices, sumY / totalVertices, sumZ / totalVertices)

  if (currentCentroid.value) {
    currentCentroid.value.x = centroid.x
    currentCentroid.value.y = centroid.y
    currentCentroid.value.z = centroid.z
  }
  return centroid
}

let lastSection = null

const isRotating = ref(false)
function rotateSectionAnimate(objects, axis, angle, duration = 1000, section) {
  isRotating.value = true
  const centroid = calculateCentroid(objects)
  console.log('Centroid:', centroid)

  // Normalize the rotation axis and create the quaternion for the specified rotation
  axis.normalize()
  const incrementalQuaternion = new Quaternion().setFromAxisAngle(axis, angle)

  // Visualize the rotation axis
  const arrowHelper = new ArrowHelper(axis, centroid, 2, 0xFF0000)
  scene.value.add(arrowHelper)

  if (lastSection && lastSection !== section) {
    const objectsToBeReset = objects.filter(object => object.userData.groups.includes(section))
    console.log('Section changed', {
      change: `${lastSection} -> ${section}`,
      objectsToBeReset,
    })
    if (objectsToBeReset.length > 0) {
      objectsToBeReset.forEach((obj) => {
        const originalTetrahedron = tetrahedrons.value.find(tetrahedron => tetrahedron.data.originalGroups.includes(obj.userData.groups[0]) && tetrahedron.data.originalGroups.includes(obj.userData.groups[1]))
        const originalPosition = originalTetrahedron.position
        obj.quaternion.set(0, 0, 0, 1)
        obj.rotation.set(0, 0, 0)
        obj.position.set(...[...originalPosition])
        obj.userData.initialQuaternion = undefined
        obj.userData.initialPosition = undefined
      })
    }
  }

  // Store the initial state at the start of the animation, only if not already stored
  objects.forEach((object) => {
    if (!object.userData.initialQuaternion) {
      object.userData.initialQuaternion = object.quaternion.clone()
    }
    if (!object.userData.initialPosition) {
      object.userData.initialPosition = object.position.clone()
    }
  })

  let startTime = null

  function animate(now) {
    if (!startTime) { startTime = now }
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1) // Normalized time [0,1]

    objects.forEach((object) => {
      const startQuaternion = object.userData.initialQuaternion.clone()
      const startPosition = object.userData.initialPosition.clone()

      // Calculate the target quaternion by applying the incremental rotation
      const targetQuaternion = new Quaternion().copy(startQuaternion).multiply(incrementalQuaternion)

      // Interpolate the rotation
      object.quaternion.slerpQuaternions(startQuaternion, targetQuaternion, t)
      object.quaternion.normalize()

      // Move object to the pivot, apply rotation, then move back
      const relativePosition = startPosition.clone().sub(centroid)
      relativePosition.applyQuaternion(new Quaternion().setFromAxisAngle(axis, angle * t))
      const newPosition = relativePosition.add(centroid)
      /*  newPosition = new Vector3(
        Math.round(newPosition.x * 100) / 100,
        Math.round(newPosition.y * 100) / 100,
        Math.round(newPosition.z * 100) / 100,
      ) */
      object.position.copy(newPosition)
    })

    if (t < 1) {
      requestAnimationFrame(animate)
    }
    else {
      console.log('Rotation animation completed')
      /* scene.value.remove(arrowHelper) */ // Clean up

      // After animation, update the initial state to the final state
      objects.forEach((object) => {
        object.userData.initialQuaternion.copy(object.quaternion)
        object.userData.initialPosition.copy(object.position)
        object.userData.groups = updateGroups(object.userData.groups, section, angle > 0)
      })
      lastSection = section
      startTime = null // Reset start time for potential subsequent animations
      isRotating.value = false
    }
  }

  requestAnimationFrame(animate)
}

const rotationAxisMap = {
  U: new Vector3(0, 1, 0),
  u: new Vector3(0, 1, 0),
  L: new Vector3(
    -0.8162071357069216,
    -0.33422761985285043,
    0.47127254296065374,
  ),
  l: new Vector3(
    -0.8162071357069216,
    -0.33422761985285043,
    0.47127254296065374,
  ),
  R: new Vector3(
    0.8162071357069216,
    -0.33422761985285043,
    0.47127254296065374,
  ),
  r: new Vector3(
    0.8162071357069216,
    -0.33422761985285043,
    0.47127254296065374,
  ),
  B: new Vector3(0, -0.3342110415830142, -0.9424982650827517),
  b: new Vector3(0, -0.3342110415830142, -0.9424982650827517),
}

function pyramidRotate(section, clockwise = true, duration = 1000) {
  const angle = clockwise ? 2 * Math.PI / 3 : -2 * Math.PI / 3
  const objects = pyraminxRef.value.children.filter(child => child.userData.groups.some(group => section.includes(group)))
  if (!isRotating.value) { rotateSectionAnimate(objects, rotationAxisMap[section], angle, duration, section) }
}

function shuffle() {
  setInterval(() => {
    const section = ['U', 'u', 'L', 'l', 'R', 'r', 'B', 'b']
    const randomSection = section[Math.floor(Math.random() * section.length)]
    const clockwise = Math.random() < 0.5
    pyramidRotate(randomSection, clockwise)
  }, 1000)
}

function onNormalClick() {
  pyramidRotate('L', true)
}

function onRightClick() {
  pyramidRotate('R', true)
}

const { l, r, u, b, g /* keys you want to monitor */ } = useMagicKeys()

watch(l, (value) => {
  if (value) {
    pyramidRotate('L', true)
  }
})

watch(r, (value) => {
  if (value) {
    pyramidRotate('R', true)
  }
})

watch(u, (value) => {
  if (value) {
    pyramidRotate('U', true)
  }
})

watch(b, (value) => {
  if (value) {
    pyramidRotate('B', true)
  }
})

watch(g, (value) => {
  if (value && pyraminxRef.value) {
    const section = 'l'
    const objects = pyraminxRef.value.children.filter(child => child.userData.groups.some(group => section.includes(group)))
    calculateCentroid(objects)
  }
})
</script>

<template>
  <TresMesh :position="[currentCentroid.x, currentCentroid.y, currentCentroid.z]">
    <TresSphereGeometry :args="[0.1]" />
    <TresMeshBasicMaterial color="red" />
  </TresMesh>
  <TresGroup
    ref="pyraminxRef"
  >
    <Tetrahedron
      v-for="(tetrahedron, index) in tetrahedrons"
      ref="tetrahedronsRef"
      :key="index"
      :index="index"
      :name="`tetrahedron-${tetrahedron.data.groups.join('-')}`"
      :user-data="tetrahedron.data"
      :position="tetrahedron.position"
      :model="tetrahedronNodes.TetrahedronHybrid"
    />
    <Octahedron
      v-for="(octahedron, index) in octahedrons"
      ref="octahedronsRef"
      :key="index"
      :index="index"
      :name="`octahedron-${octahedron.data.groups.join('-')}`"
      :user-data="octahedron.data"
      :position="octahedron.position"
      :model="octahedronNodes.Octahedron"
    />
  </TresGroup>
  <TresGridHelper />
  <TresAxesHelper />
</template>
