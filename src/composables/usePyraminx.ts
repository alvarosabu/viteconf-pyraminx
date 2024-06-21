import { useGLTF } from '@tresjs/cientos'
import type { Scene } from 'three'
import { Group, Matrix4, Quaternion, Vector3 } from 'three'
import type { Ref } from 'vue'
import { reactive, ref, toRaw } from 'vue'

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

  // Feature update colors:
  const initialColors = {
    LRB: {
      // Center
      L: 'yellow',
      R: 'yellow',
      B: 'yellow',
      
      // Vertices
      Ll: 'yellow',
      Rr: 'yellow',
      Bb: 'yellow',
      
      // Edges
      LR: 'yellow',
      RB: 'yellow',
      BL: 'yellow',
    },
    BUL: {
      // Center
      B: 'pink',
      U: 'pink',
      L: 'pink',

      // Vertices
      Bb: 'pink',
      Uu: 'pink',
      Ll: 'pink',

      // Edges
      BU: 'pink',
      UL: 'pink',
      LB: 'pink',
    },
    ULR: {
      // Center
      U: 'green',
      L: 'green',
      R: 'green',
      
      // Vertices
      Uu: 'green',
      Ll: 'green',
      Rr: 'green',

      // Edges
      UL: 'green',
      LR: 'green',
      RU: 'green',
    },
    RBU: {
      // Center
      R: 'purple',
      B: 'purple',
      U: 'purple',

      // Vertices
      Rr: 'purple',
      Bb: 'purple',
      Uu: 'purple',

      // Edges
      RB: 'purple',
      BU: 'purple',
      UR: 'purple',
    },
  }

  const currentColors = reactive({ ...initialColors })

  // Update colors after rotation
  function updateColors(section, clockwise) {
    const temp = JSON.parse(JSON.stringify(currentColors))
    if (section === 'l') {
      if (clockwise) {
        // LRB <- ULR <- BUL

        currentColors.LRB.Ll = temp.ULR.Ll
        
        currentColors.ULR.Ll = temp.BUL.Ll
        
        currentColors.BUL.Ll = temp.LRB.Ll
      }
      else {
        // LRB <- BUL <- ULR
        
        currentColors.LRB.Ll = temp.BUL.Ll
        
        currentColors.BUL.Ll = temp.ULR.Ll
        
        currentColors.ULR.Ll = temp.LRB.Ll
      }
    }
    if (section === 'L') {
      if (clockwise) {
        // LRB <- ULR <- BUL
        
        currentColors.LRB.L = temp.ULR.L
        currentColors.LRB.Ll = temp.ULR.Ll
        currentColors.LRB.LR = temp.ULR.UL
        currentColors.LRB.BL = temp.ULR.LR
        
        currentColors.ULR.L = temp.BUL.L
        currentColors.ULR.Ll = temp.BUL.Ll
        currentColors.ULR.UL = temp.BUL.LB
        currentColors.ULR.LR = temp.BUL.UL
        
        currentColors.BUL.L = temp.LRB.L
        currentColors.BUL.Ll = temp.LRB.Ll
        currentColors.BUL.LB = temp.LRB.LR
        currentColors.BUL.UL = temp.LRB.BL
      }
      else {
        // LRB <- BUL <- ULR

        currentColors.LRB.L = temp.BUL.L
        currentColors.LRB.Ll = temp.BUL.Ll
        currentColors.LRB.LR = temp.BUL.LB
        currentColors.LRB.BL = temp.BUL.UL
        
        currentColors.BUL.L = temp.ULR.L
        currentColors.BUL.Ll = temp.ULR.Ll
        currentColors.BUL.LB = temp.ULR.UL
        currentColors.BUL.UL = temp.ULR.LR
        
        currentColors.ULR.L = temp.LRB.L
        currentColors.ULR.Ll = temp.LRB.Ll
        currentColors.ULR.UL = temp.LRB.LR
        currentColors.ULR.LR = temp.LRB.BL
      }
    }
    if (section === 'r') {
      if (clockwise) {
        // RBU <- ULR <- LRB

        currentColors.RBU.Rr = temp.ULR.Rr
        
        currentColors.ULR.Rr = temp.LRB.Rr

        currentColors.LRB.Rr = temp.RBU.Rr
      }
      else {
        // RBU <- LRB <- ULR

        currentColors.RBU.Rr = temp.LRB.Rr
        
        currentColors.LRB.Rr = temp.ULR.Rr
        
        currentColors.ULR.Rr = temp.RBU.Rr
      }
    }
    if (section === 'R') {
      if (clockwise) {
        // RBU <- ULR <- LRB

        currentColors.RBU.R = temp.ULR.R
        currentColors.RBU.Rr = temp.ULR.Rr
        currentColors.RBU.RB = temp.ULR.RU
        currentColors.RBU.UR = temp.ULR.LR

        currentColors.ULR.R = temp.LRB.R
        currentColors.ULR.Rr = temp.LRB.Rr
        currentColors.ULR.RU = temp.LRB.LR
        currentColors.ULR.LR = temp.LRB.RB

        currentColors.LRB.R = temp.RBU.R
        currentColors.LRB.Rr = temp.RBU.Rr
        currentColors.LRB.RB = temp.RBU.UR
        currentColors.LRB.LR = temp.RBU.RB
      }
      else {
        // RBU <- LRB <- ULR

        currentColors.RBU.R = temp.LRB.R
        currentColors.RBU.Rr = temp.LRB.Rr
        currentColors.RBU.RB = temp.LRB.LR
        currentColors.RBU.UR = temp.LRB.RB
        
        currentColors.LRB.R = temp.ULR.R
        currentColors.LRB.Rr = temp.ULR.Rr
        currentColors.LRB.RB = temp.ULR.LR
        currentColors.LRB.LR = temp.ULR.RU
        
        currentColors.ULR.R = temp.RBU.R
        currentColors.ULR.Rr = temp.RBU.Rr
        currentColors.ULR.RU = temp.RBU.RB
        currentColors.ULR.LR = temp.RBU.UR
      }
    }
    if (section === 'u') {
      if (clockwise) {
        // ULR <- RBU <- BUL

        currentColors.ULR.Uu = temp.RBU.Uu
        
        currentColors.RBU.Uu = temp.BUL.Uu

        currentColors.BUL.Uu = temp.ULR.Uu
      }
      else {
        // ULR <- BUL <- RBU

        currentColors.ULR.Uu = temp.BUL.Uu

        currentColors.BUL.Uu = temp.RBU.Uu
        
        currentColors.RBU.Uu = temp.ULR.Uu
      }
    }
    if (section === 'U') {
      if (clockwise) {
        // ULR <- RBU <- BUL

        currentColors.ULR.U = temp.RBU.U
        currentColors.ULR.Uu = temp.RBU.Uu
        currentColors.ULR.UL = temp.RBU.UR
        currentColors.ULR.RU = temp.RBU.BU
        
        currentColors.RBU.U = temp.BUL.U
        currentColors.RBU.Uu = temp.BUL.Uu
        currentColors.RBU.UR = temp.BUL.BU
        currentColors.RBU.BU = temp.BUL.UL
        
        currentColors.BUL.U = temp.ULR.U
        currentColors.BUL.Uu = temp.ULR.Uu
        currentColors.BUL.UL = temp.ULR.RU
        currentColors.BUL.BU = temp.ULR.UL
      }
      else {
        // ULR <- BUL <- RBU

        currentColors.ULR.U = temp.BUL.U
        currentColors.ULR.Uu = temp.BUL.Uu
        currentColors.ULR.UL = temp.BUL.LB
        currentColors.ULR.RU = temp.BUL.UL
        
        currentColors.BUL.U = temp.RBU.U
        currentColors.BUL.Uu = temp.RBU.Uu
        currentColors.BUL.UL = temp.RBU.BU
        currentColors.BUL.BU = temp.RBU.UR
        
        currentColors.RBU.U = temp.ULR.U
        currentColors.RBU.Uu = temp.ULR.Uu
        currentColors.RBU.UR = temp.ULR.UL
        currentColors.RBU.BU = temp.ULR.RU
      }
    }

    if (section === 'b') {
      if (clockwise) {
        // BUL <- RBU <- LRB

        currentColors.BUL.Bb = temp.RBU.Bb

        currentColors.RBU.Bb = temp.LRB.Bb

        currentColors.LRB.Bb = temp.BUL.Bb
      }
      else {
        // BUL <- LRB <- RBU

        currentColors.BUL.Bb = temp.LRB.Bb
        
        currentColors.LRB.Bb = temp.RBU.Bb

        currentColors.RBU.Bb = temp.BUL.Bb
      }
    }
    if (section === 'B') {
      if (clockwise) {
        // BUL <- RBU <- LRB

        currentColors.BUL.B = temp.RBU.B
        currentColors.BUL.Bb = temp.RBU.Bb
        currentColors.BUL.BU = temp.RBU.RB
        currentColors.BUL.LB = temp.RBU.BU

        currentColors.RBU.B = temp.LRB.B
        currentColors.RBU.Bb = temp.LRB.Bb
        currentColors.RBU.BU = temp.LRB.RB
        currentColors.RBU.RB = temp.LRB.BL
        
        currentColors.LRB.B = temp.BUL.B
        currentColors.LRB.Bb = temp.BUL.Bb
        currentColors.LRB.BL = temp.BUL.BU
        currentColors.LRB.RB = temp.BUL.LB
      }
      else {
        // BUL <- LRB <- RBU

        currentColors.BUL.B = temp.LRB.B
        currentColors.BUL.Bb = temp.LRB.Bb
        currentColors.BUL.BU = temp.LRB.BL
        currentColors.BUL.LB = temp.LRB.RB

        currentColors.LRB.B = temp.RBU.B
        currentColors.LRB.Bb = temp.RBU.Bb
        currentColors.LRB.BL = temp.RBU.RB
        currentColors.LRB.RB = temp.RBU.BU
        
        currentColors.RBU.B = temp.BUL.B
        currentColors.RBU.Bb = temp.BUL.Bb
        currentColors.RBU.BU = temp.BUL.LB
        currentColors.RBU.RB = temp.BUL.BU
      }
    }
    console.log(currentColors)
  }

  function getCurrentColorOrientation() {
    return {
      LRB: currentColors.LRB, // Base
      BUL: currentColors.BUL, // Left
      ULR: currentColors.ULR,
      RBU: currentColors.RBU,
    }
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

  function rotateSection(section: string, clockwise = true, duration = 1000) {
    const angle = clockwise ? -2 * Math.PI / 3 : 2 * Math.PI / 3
    const objects = pyraminxRef?.value?.children.filter(child => child.userData.groups.some(group => section.includes(group)))
    if (!isRotating.value) {
      rotateSectionAnimate(objects, rotationAxisMap[section], angle, duration, section)
    }
  }

  return {
    tetrahedronNodes,
    octahedronNodes,
    currentColors,
    updateColors,
    getCurrentColorOrientation,
    tetrahedrons,
    octahedrons,
    rotateSection,
  }
}
