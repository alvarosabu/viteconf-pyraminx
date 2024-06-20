<script setup lang="ts">
import { reactive, ref, toRaw, unref, watch } from 'vue'
import { Group, Matrix4, Quaternion, Vector3 } from 'three'
import { useTres } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { useMagicKeys } from '@vueuse/core'
import Tetrahedron from './Tetrahedron.vue'
import Octahedron from './Octahedron.vue'

const { nodes: tetrahedronNodes, materials: tetrahedronMaterials } = await useGLTF('/tetrahedron.gltf', { draco: true })
const { nodes: octahedronNodes, materials: octahedronMaterials } = await useGLTF('/octahedron.gltf', { draco: true })

const emissiveIntensity = 2

function setupMaterial(material) {
  material.opacity = 1
  material.transparent = true
  if (material.name === 'NeonFucsia') {
    material.emissiveIntensity = 1.5 * emissiveIntensity
  }
  else if (material.name === 'NeonPurple') {
    material.emissiveIntensity = 3 * emissiveIntensity
  }
  else {
    material.emissiveIntensity = emissiveIntensity
  }
}

Object.values(tetrahedronMaterials).forEach(setupMaterial)
Object.values(octahedronMaterials).forEach(setupMaterial)

const pyraminxRef = ref(null)
const tetrahedronsRef = ref(null)
const EDGE_LENGTH = 1
const DEEP = Math.sqrt(3) / 2
const HEIGHT = Math.sqrt(2 / 3) * EDGE_LENGTH

const pyramidDefinitionCenter = [EDGE_LENGTH * 1.5, HEIGHT, -DEEP]
function centerObjects(objects) {
  return objects.map(obj => ({
    ...obj,
    position: obj.position.map((d, i) => d - pyramidDefinitionCenter[i]),
  }))
}

const tetrahedrons = ref(centerObjects([
  // Base
  {
    position: [0, 0, 0],
    data: {
      groups: ['l', 'L'],
    },
  },
  {
    position: [EDGE_LENGTH, 0, 0],
    data: {
      groups: ['L', 'R'],
    },
  },
  {
    position: [EDGE_LENGTH / 2, 0, -DEEP],
    data: {
      groups: ['L', 'B'],
    },
  },
  {
    position: [EDGE_LENGTH * 2, 0, 0],
    data: {
      groups: ['r', 'R'],
    },
  },
  {
    position: [EDGE_LENGTH * 1.5, 0, -DEEP],
    data: {
      groups: ['R', 'B'],
    },
  },
  {
    position: [EDGE_LENGTH, 0, -DEEP * 2],
    data: {
      groups: ['b', 'B'],
    },
  },
  // Middle
  {
    position: [EDGE_LENGTH / 2, +HEIGHT, -0.2887],
    data: {
      groups: ['L', 'U'],
    },
  },
  {
    position: [EDGE_LENGTH * 1.5, +HEIGHT, -0.2887],
    data: {
      groups: ['R', 'U'],
    },
  },
  {
    position: [EDGE_LENGTH, +HEIGHT, -1.154],
    data: {
      groups: ['U', 'B'],
    },
  },
  // Top
  {
    position: [EDGE_LENGTH, +HEIGHT * 2, -0.577],
    data: {
      groups: ['u', 'U'],
    },
  },
]))

const octahedronsRef = ref(null)
const octahedrons = ref(centerObjects([
  {
    position: [0, 0, 0],
    data: {
      groups: ['L'],
    },
  },
  {
    position: [EDGE_LENGTH, 0, 0],
    data: {
      groups: ['R'],
    },
  },
  {
    position: [EDGE_LENGTH / 2, 0, -DEEP],
    data: {
      groups: ['B'],
    },
  },
  {
    position: [EDGE_LENGTH / 2, HEIGHT, -0.2887],
    data: {
      groups: ['U'],
    },
  },
]))

const currentCentroid = ref([0, 0, 0])

const { scene } = useTres()

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
  const updates = groupUpdates[section.toUpperCase()][clockwise ? 'clockwise' : 'counterclockwise']
  return groups.map(group => updates[group] || group)
}

const initialColors = {
  base: [
    'yellow', // b-B
    'yellow', // B
    'yellow', // R-B
    'yellow', // R
    'yellow', // r-R
    'yellow', // L-B
    'yellow', // L
    'yellow', // L-R
    'yellow', // l-L
  ],
  left: [
    'pink', // b-B
    'pink', // B
    'pink', // L-B
    'pink', // L
    'pink', // l-L
    'pink', // U-B
    'pink', // U
    'pink', // U-L
    'pink', // u-U
  ],
  right: [
    'green', // l-L
    'green', // L
    'green', // L-R
    'green', // R
    'green', // r-R
    'green', // U-L
    'green', // U
    'green', // U-R
    'green', // u-U
  ],
  back: [
    'purple', // r-R
    'purple', // R
    'purple', // R-B
    'purple', // B
    'purple', // b-B
    'purple', // U-R
    'purple', // U
    'purple', // U-B
    'purple', // u-U
  ],
}

const currentColors = reactive({ ...initialColors })

// Update colors after rotation
function updateColors(section, clockwise) {
  console.log('updateColors', {
    section,
    clockwise,
  })
  const temp = JSON.parse(JSON.stringify(currentColors))
  if (section === 'l') {
    // [base, left, right, back]
    if (clockwise) {
      currentColors.right[0] = temp.left[4]
      currentColors.base[4] = temp.right[0]
      currentColors.left[4] = temp.base[4]
    }
    else {
      currentColors.right[0] = temp.base[4]
      currentColors.base[4] = temp.left[4]
      currentColors.left[4] = temp.right[0]
    }
  }
  if (section === 'L') {
    // [base, left, right, back]
    if (clockwise) {
      currentColors.right[0] = temp.left[4]
      currentColors.right[1] = temp.left[3]
      currentColors.right[2] = temp.left[5]
      currentColors.right[5] = temp.left[2]
      currentColors.base[4] = temp.right[0]
      currentColors.base[3] = temp.right[1]
      currentColors.base[7] = temp.right[2]
      currentColors.base[2] = temp.right[5]
      currentColors.left[4] = temp.base[4]
      currentColors.left[3] = temp.base[3]
      currentColors.left[7] = temp.base[7]
      currentColors.left[2] = temp.base[2]
    }
    else {
      currentColors.right[0] = temp.base[4]
      currentColors.right[1] = temp.base[3]
      currentColors.right[2] = temp.base[7]
      currentColors.right[5] = temp.base[2]
      currentColors.base[4] = temp.left[4]
      currentColors.base[3] = temp.left[3]
      currentColors.base[7] = temp.left[7]
      currentColors.base[2] = temp.left[2]
      currentColors.left[4] = temp.right[0]
      currentColors.left[3] = temp.right[1]
      currentColors.left[7] = temp.right[2]
      currentColors.left[2] = temp.right[5]
    }
  }
  if (section === 'r') {
    // [base, left, right, back]
    if (clockwise) {
      currentColors.right[4] = temp.base[0]
      currentColors.back[0] = temp.right[4]
      currentColors.base[0] = temp.back[0]
    }
    else {
      currentColors.right[4] = temp.back[0]
      currentColors.back[0] = temp.base[0]
      currentColors.base[0] = temp.right[4]
    }
  }
  if (section === 'R') {
    // [base, left, right, back]
    if (clockwise) {
      currentColors.right[4] = temp.base[0]
      currentColors.right[3] = temp.base[1]
      currentColors.right[7] = temp.base[2]
      currentColors.right[2] = temp.base[5]
      currentColors.base[0] = temp.back[0]
      currentColors.base[1] = temp.back[1]
      currentColors.base[2] = temp.back[2]
      currentColors.base[5] = temp.back[5]
      currentColors.back[0] = temp.right[4]
      currentColors.back[1] = temp.right[3]
      currentColors.back[2] = temp.right[7]
      currentColors.back[5] = temp.right[2]
    }
    else {
      currentColors.right[4] = temp.back[0]
      currentColors.right[3] = temp.back[1]
      currentColors.right[7] = temp.back[2]
      currentColors.right[2] = temp.back[5]
      currentColors.base[0] = temp.right[4]
      currentColors.base[1] = temp.right[3]
      currentColors.base[2] = temp.right[7]
      currentColors.base[5] = temp.right[2]
      currentColors.back[0] = temp.base[0]
      currentColors.back[1] = temp.base[1]
      currentColors.back[2] = temp.base[2]
      currentColors.back[5] = temp.base[5]
    }
  }
  if (section === 'u') {
    // [base, left, right, back]
    if (clockwise) {
      currentColors.left[8] = temp.right[8]
      currentColors.back[8] = temp.left[8]
      currentColors.right[8] = temp.back[8]
    }
    else {
      currentColors.left[8] = temp.back[8]
      currentColors.back[8] = temp.right[8]
      currentColors.right[8] = temp.left[8]
    }
  }

  if (section === 'U') {
    if (clockwise) {
      currentColors.left[8] = temp.right[8]
      currentColors.left[7] = temp.right[7]
      currentColors.left[6] = temp.right[6]
      currentColors.left[5] = temp.right[5]
      currentColors.back[8] = temp.left[8]
      currentColors.back[7] = temp.left[7]
      currentColors.back[6] = temp.left[6]
      currentColors.back[5] = temp.left[5]
      currentColors.right[8] = temp.back[8]
      currentColors.right[7] = temp.back[7]
      currentColors.right[6] = temp.back[6]
      currentColors.right[5] = temp.back[5]
    }
    else {
      currentColors.left[8] = temp.back[8]
      currentColors.left[7] = temp.back[7]
      currentColors.left[6] = temp.back[6]
      currentColors.left[5] = temp.back[5]
      currentColors.back[8] = temp.right[8]
      currentColors.back[7] = temp.right[7]
      currentColors.back[6] = temp.right[6]
      currentColors.back[5] = temp.right[5]
      currentColors.right[8] = temp.left[8]
      currentColors.right[7] = temp.left[7]
      currentColors.right[6] = temp.left[6]
      currentColors.right[5] = temp.left[5]
    }
  }

  if (section === 'b') {
    if (clockwise) {
      currentColors.base[8] = temp.left[0]
      currentColors.back[4] = temp.base[8]
      currentColors.left[0] = temp.back[4]
    }
    else {
      currentColors.base[8] = temp.back[4]
      currentColors.back[4] = temp.left[0]
      currentColors.left[0] = temp.base[8]
    }
  }

  if (section === 'B') {
    if (clockwise) {
      currentColors.base[8] = temp.left[0]
      currentColors.base[7] = temp.left[5]
      currentColors.base[6] = temp.left[1]
      currentColors.base[5] = temp.left[2]
      currentColors.back[4] = temp.base[8]
      currentColors.back[2] = temp.base[7]
      currentColors.back[3] = temp.base[6]
      currentColors.back[7] = temp.base[5]
      currentColors.left[0] = temp.back[4]
      currentColors.left[1] = temp.back[3]
      currentColors.left[2] = temp.back[7]
      currentColors.left[5] = temp.back[2]
    }
    else {
      currentColors.base[8] = temp.back[4]
      currentColors.base[7] = temp.back[2]
      currentColors.base[6] = temp.back[3]
      currentColors.base[5] = temp.back[7]
      currentColors.back[4] = temp.left[0]
      currentColors.back[2] = temp.left[5]
      currentColors.back[3] = temp.left[1]
      currentColors.back[7] = temp.left[2]
      currentColors.left[0] = temp.base[8]
      currentColors.left[1] = temp.base[6]
      currentColors.left[2] = temp.base[7]
      currentColors.left[5] = temp.base[5]
    }
  }

  console.log('Current Colors', currentColors)
}

function calculateCentroid(meshes) {
  let totalVertices = 0
  let sumX = 0; let sumY = 0; let sumZ = 0

  meshes.forEach((mesh) => {
    const geometry = mesh.geometry || mesh.children[0].geometry
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()

    const positionAttribute = geometry.attributes.position
    const vertex = new Vector3()

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)
      vertex.applyMatrix4(mesh.matrixWorld)

      sumX += vertex.x
      sumY += vertex.y
      sumZ += vertex.z
    }

    totalVertices += positionAttribute.count
  })

  if (totalVertices === 0) { return null }

  const centroid = new Vector3(sumX / totalVertices, sumY / totalVertices, sumZ / totalVertices)

  currentCentroid.value = [centroid.x, centroid.y, centroid.z]

  return centroid
}

const isRotating = ref(false)

function rotateSectionAnimate(objects, axis, angle, duration = 1000, section) {
  isRotating.value = true
  const centroid = calculateCentroid(objects)

  axis.normalize()
  const incrementalQuaternion = new Quaternion().setFromAxisAngle(axis, angle)

  const temporaryGroup = new Group()
  temporaryGroup.position.copy(centroid)
  scene.value.add(temporaryGroup)

  objects.forEach((object) => {
    object.position.sub(centroid)
    pyraminxRef.value.remove(object)
    temporaryGroup.add(toRaw(object))
  })

  let startTime = null

  function animate(now) {
    if (!startTime) { startTime = now }
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)

    const currentQuaternion = new Quaternion().slerpQuaternions(new Quaternion(), incrementalQuaternion, t)
    temporaryGroup.setRotationFromQuaternion(currentQuaternion)

    if (t < 1) {
      requestAnimationFrame(animate)
    }
    else {
      const matrix = new Matrix4()
      temporaryGroup.updateMatrixWorld(true)
      matrix.copy(temporaryGroup.matrixWorld)
      matrix.premultiply(new Matrix4().invert())

      objects.forEach((object) => {
        object.applyMatrix4(matrix)
        temporaryGroup.remove(object)
        pyraminxRef.value.add(object)
        object.userData.groups = updateGroups(object.userData.groups, section, angle > 0)
      })
      scene.value.remove(temporaryGroup)
      isRotating.value = false
      // Update colors after rotation
      updateColors(section, angle < 0)
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

function getCurrentColorOrientation() {
  return {
    base: currentColors.base,
    left: currentColors.left,
    right: currentColors.right,
    back: currentColors.back,
  }
}

function pyramidRotate(section, clockwise = true, duration = 1000) {
  const angle = clockwise ? -2 * Math.PI / 3 : 2 * Math.PI / 3
  const objects = pyraminxRef.value.children.filter(child => child.userData.groups.some(group => section.includes(group)))
  if (!isRotating.value) {
    rotateSectionAnimate(objects, rotationAxisMap[section], angle, duration, section)
  }
}

function shuffle() {
  setInterval(() => {
    const section = ['U', 'u', 'L', 'l', 'R', 'r', 'B', 'b']
    const randomSection = section[Math.floor(Math.random() * section.length)]
    const clockwise = Math.random() < 0.5
    pyramidRotate(randomSection, clockwise)
  }, 1000)
}

const { shift, ctrl, l, r, u, b, g, s } = useMagicKeys()

watch(l, (value) => {
  if (value) {
    pyramidRotate(ctrl.value ? 'l' : 'L', !shift.value)
  }
})

watch(r, (value) => {
  if (value) {
    pyramidRotate(ctrl.value ? 'r' : 'R', !shift.value)
  }
})

watch(u, (value) => {
  if (value) {
    pyramidRotate(ctrl.value ? 'u' : 'U', !shift.value)
  }
})

watch(b, (value) => {
  if (value) {
    pyramidRotate(ctrl.value ? 'b' : 'B', !shift.value)
  }
})

watch(s, (value) => {
  if (value && pyraminxRef.value) {
    shuffle()
  }
})

console.log('Current Colors', getCurrentColorOrientation())
</script>

<template>
  <TresGroup ref="pyraminxRef">
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
      :model="octahedronNodes.OctahedronHybrid"
    />
  </TresGroup>
</template>
