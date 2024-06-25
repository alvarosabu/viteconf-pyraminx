import { useGLTF } from '@tresjs/cientos'
import type { Scene } from 'three'
import { Group, Matrix4, Quaternion, Vector3 } from 'three'
import type { Ref } from 'vue'
import { ref, watch, toRaw } from 'vue'

export type Face = 'LRB' | 'BUL' | 'ULR' | 'RBU'

export async function usePyraminx(pyraminxRef: Ref<Group | null>, scene: Ref<Scene>) {
  // Feature: load models and setup materials
  const { nodes: tetrahedronNodes, materials: tetrahedronMaterials } = await useGLTF('/tetrahedron.gltf')
  const { nodes: octahedronNodes, materials: octahedronMaterials } = await useGLTF('/octahedron.gltf')

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

  function cloneFaceColors(colors) {
    return JSON.parse(JSON.stringify(colors))
  }

  function createColoredFace(color, positions) {
    const face = {}
    for (const position of positions) {
      face[position] = color
    }
    return face
  }

  const initialColors = {
    LRB: createColoredFace('yellow', [
      'L', 'R', 'B', // CENTER
      'Ll', 'Rr', 'Bb', // VERTICES
      'LR', 'RB', 'BL', // EDGES
    ]),
    BUL: createColoredFace('pink', [
      'B', 'U', 'L', // CENTER
      'Bb', 'Uu', 'Ll', // VERTICES
      'BU', 'UL', 'LB', // EDGES
    ]),
    ULR: createColoredFace('green', [
      'U', 'L', 'R', // CENTER
      'Uu', 'Ll', 'Rr', // VERTICES
      'UL', 'LR', 'RU', // EDGES
    ]),
    RBU: createColoredFace('purple', [
      'R', 'B', 'U', // CENTER
      'Rr', 'Bb', 'Uu', // VERTICES
      'RB', 'BU', 'UR', // EDGES
    ]),
  }

  const currentColors = cloneFaceColors(initialColors)
  
  function getColor(face, position) {
    return currentColors[face][position]
  }
  function assertPosition(face: Face, position: string) {
    if (initialColors[face][position] === undefined) {
      throw new Error(`${position} is not a valid position for face ${face}`)
    }
  }

  /**
   * Given a face, from what other face the color should be taken after rotation
   */ 
  const orderedFaces = {
    L: ['LRB', 'ULR', 'BUL'],
    R: ['RBU', 'ULR', 'LRB'],
    B: ['BUL', 'RBU', 'LRB'],
    U: ['ULR', 'RBU', 'BUL'],
  }
  function buildFromFaceMap(clockwise) {
    const fromFaceMap = {}
    for (const section of Object.keys(orderedFaces)) {
      const ordered = orderedFaces[section.toUpperCase()]
      fromFaceMap[section] = {}
      for (const face of Object.keys(initialColors)) {
        const k = ordered.indexOf(face)
        fromFaceMap[section][face] = (k === -1) ? face : ordered[(k + 3 + (clockwise ? 1 : -1)) % 3]
      }
    }
    return fromFaceMap
  }
  const cwFromFaceMap = buildFromFaceMap(true)
  const ccwFromFaceMap = buildFromFaceMap(false)
  function getFromFace(section, clockwise, face) {
    return (clockwise ? cwFromFaceMap : ccwFromFaceMap)[section.toUpperCase()][face]
  }

  /**
   * For center and vertices colors, the position names stay the same
   * For edges, we need to map them to their new position after a rotation
   */
  const cwFromEdgesPositionMap = {
    L: {
      LRB: { // <- ULR
        'LR': 'UL',
        'BL': 'LR',
      },
      ULR: { // <- BUL
        'UL': 'LB',
        'LR': 'UL',
      },
      BUL: { // <- LRB
        'LB': 'LR',
        'UL': 'BL',
      }
    },
    R: {
      LRB: { // <- RBU
        'LR': 'RB',
        'RB': 'UR',
      },
      ULR: { // <- LRB
        'RU': 'LR',
        'LR': 'RB',
      },
      RBU: { // <- ULR
        'RB': 'RU',
        'UR': 'LR',
      },
    },
    U: {
      BUL: { // <- ULR
        'BU': 'UL',
        'UL': 'RU',
      },
      ULR: { // <- RBU
        'UL': 'UR',
        'RU': 'BU',
      },
      RBU: { // <- BUL
        'UR': 'BU',
        'BU': 'UL',
      },
    },
    B: {
      LRB: { // <- BUL
        'BL': 'BU',
        'RB': 'LB',
      },
      BUL: { // <- RBU
        'BU': 'RB',
        'LB': 'BU',
      },
      RBU: { // <- LRB
        'BU': 'RB',
        'RB': 'BL',
      },
    }
  }
  const ccwFromEdgesPositionMap = (function() {
    const inverted = {}
    for (const section of Object.keys(cwFromEdgesPositionMap)) {
      inverted[section] = {}
      const map = cwFromEdgesPositionMap[section]
      for (const face of Object.keys(initialColors)) {
        const cwFromFace = getFromFace(section, true, face)
        if (map[face]) {
          inverted[section][cwFromFace] ??= {}
          for (const [cwPositionTo, cwPositionFrom] of Object.entries(map[face])) {
            inverted[section][cwFromFace][cwPositionFrom] = cwPositionTo
          }
        }
      }
    }
    return inverted
  })()
  function getFromEdgesPosition(section, clockwise, face, position) {
    const fromEdgesPositionMap = clockwise ? cwFromEdgesPositionMap : ccwFromEdgesPositionMap
    return fromEdgesPositionMap[section.toUpperCase()][face][position]
  }

  /**
   * Given a face and triangle position, what is the triangle position in the next face
   * that will end up in the same position after a rotation
   */
  function getFromFacePosition(section, clockwise, face, position) {    
    assertPosition(face, position)
    
    // Positions are named after what section affects them
    if (position[0] === section || position[1] === section) {
      const fromFace = getFromFace(section, clockwise, face)
      const fromEdgePosition = getFromEdgesPosition(section, clockwise, face, position)
      if (fromEdgePosition) {
        return [fromFace, fromEdgePosition]
      }
      return [fromFace, position]
    }
    else {
      // This position is not affected by the rotation
      return [face, position]
    }
  }
   
  function getFromColor(section, clockwise, face, position) {
    return getColor(...getFromFacePosition(section, clockwise, face, position))
  }
  
  // Update colors after rotation
  function updateColors(section, clockwise) {
    const prev = cloneFaceColors(currentColors)
    for (const face of Object.keys(currentColors)) {
      for (const position of Object.keys(currentColors[face])) {
        const fromFacePosition = getFromFacePosition(section, clockwise, face, position)
        const newColor = prev[fromFacePosition[0]][fromFacePosition[1]]
        if (fromFacePosition[0] !== face) {
          currentColors[face][position] = newColor
        }
      }
    }
    console.log(cloneFaceColors(currentColors))
  }

  // Feature: Pyraminx rotation logic
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

  function rotateSectionAnimate(objects, axis: Vector3, angle: number, duration = 1000, section: string) {
    isRotating.value = true
    const centroid = calculateCentroid(objects)

    axis.normalize()
    const incrementalQuaternion = new Quaternion().setFromAxisAngle(axis, angle)

    const temporaryGroup = new Group()
    temporaryGroup.position.copy(centroid as Vector3)
    scene.value.add(temporaryGroup)

    objects.forEach((object) => {
      object.position.sub(centroid)
      pyraminxRef?.value?.remove(object)
      temporaryGroup.add(toRaw(object))
    })

    let startTime: number | null = null

    function animate(now: number) {
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
          pyraminxRef?.value?.add(object)
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

  const rotationAxisMap: Record<string, Vector3> = {
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

  const rotateSectionQueue = []

  function rotateSection(section: string, clockwise = true, duration = 750) {
    rotateSectionQueue.push({ section, clockwise, duration })
    if (isRotating.value) {
      return
    }
    else {
      processRotateSectionQueue()
    }
  }
  let gettingReadyTimeout: number | undefined
  function processRotateSectionQueue() {
    if (gettingReadyTimeout) {
      return
    }
    const ready = !!pyraminxRef?.value?.children?.[0].userData?.groups
    if (ready) {
      doRotateSection(rotateSectionQueue.shift())
    }
    else {
      gettingReadyTimeout = setTimeout(() => {
        gettingReadyTimeout = undefined
        processRotateSectionQueue()
      }, 100)
    }
  }

  watch(isRotating, (value) => {
    if (!value && rotateSectionQueue.length) {
      processRotateSectionQueue()
    }
  })

  function doRotateSection(rotation: { section: string, clockwise: boolean, duration: number }) {
    const angle = rotation.clockwise ? -2 * Math.PI / 3 : 2 * Math.PI / 3
    const objects = pyraminxRef?.value?.children.filter(child => child.userData?.groups?.some(group => rotation.section.includes(group)))
    if (objects?.length) {
      rotateSectionAnimate(objects, rotationAxisMap[rotation.section], angle, rotation.duration, rotation.section)
    }
  }

  return {
    tetrahedronNodes,
    octahedronNodes,
    
    tetrahedrons,
    octahedrons,
    
    pyramid: {
      getFromFacePosition,
      getFromColor,    
      getColor,
      colors: currentColors,
      rotateSection,
    }
  }
}
