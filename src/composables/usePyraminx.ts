import { useGLTF } from '@tresjs/cientos'
import { reactive } from 'vue'

export async function usePyraminx() {
  // Feature: load models and setup materials
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

  // Feature update colors:
  const initialColors = {
    LRB: [
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
    BUL: [
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
    ULR: [
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
    RBU: [
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
    const temp = JSON.parse(JSON.stringify(currentColors))
    if (section === 'l') {
      // [base, left, right, back]
      if (clockwise) {
        currentColors.ULR[0] = temp.BUL[4]
        currentColors.LRB[4] = temp.ULR[0]
        currentColors.BUL[4] = temp.LRB[4]
      }
      else {
        currentColors.ULR[0] = temp.LRB[4]
        currentColors.LRB[4] = temp.BUL[4]
        currentColors.BUL[4] = temp.ULR[0]
      }
    }
    if (section === 'L') {
      // [base, left, right, back]
      if (clockwise) {
        currentColors.ULR[0] = temp.BUL[4]
        currentColors.ULR[1] = temp.BUL[3]
        currentColors.ULR[2] = temp.BUL[5]
        currentColors.ULR[5] = temp.BUL[2]
        currentColors.LRB[4] = temp.ULR[0]
        currentColors.LRB[3] = temp.ULR[1]
        currentColors.LRB[7] = temp.ULR[2]
        currentColors.LRB[2] = temp.ULR[5]
        currentColors.BUL[4] = temp.LRB[4]
        currentColors.BUL[3] = temp.LRB[3]
        currentColors.BUL[7] = temp.LRB[7]
        currentColors.BUL[2] = temp.LRB[2]
      }
      else {
        currentColors.ULR[0] = temp.LRB[4]
        currentColors.ULR[1] = temp.LRB[3]
        currentColors.ULR[2] = temp.LRB[7]
        currentColors.ULR[5] = temp.LRB[2]
        currentColors.LRB[4] = temp.BUL[4]
        currentColors.LRB[3] = temp.BUL[3]
        currentColors.LRB[7] = temp.BUL[7]
        currentColors.LRB[2] = temp.BUL[2]
        currentColors.BUL[4] = temp.ULR[0]
        currentColors.BUL[3] = temp.ULR[1]
        currentColors.BUL[7] = temp.ULR[2]
        currentColors.BUL[2] = temp.ULR[5]
      }
    }
    if (section === 'r') {
      // [base, left, right, back]
      if (clockwise) {
        currentColors.ULR[4] = temp.LRB[0]
        currentColors.RBU[0] = temp.ULR[4]
        currentColors.LRB[0] = temp.RBU[0]
      }
      else {
        currentColors.ULR[4] = temp.RBU[0]
        currentColors.RBU[0] = temp.LRB[0]
        currentColors.LRB[0] = temp.ULR[4]
      }
    }
    if (section === 'R') {
      // [base, left, right, back]
      if (clockwise) {
        currentColors.ULR[4] = temp.LRB[0]
        currentColors.ULR[3] = temp.LRB[1]
        currentColors.ULR[7] = temp.LRB[2]
        currentColors.ULR[2] = temp.LRB[5]
        currentColors.LRB[0] = temp.RBU[0]
        currentColors.LRB[1] = temp.RBU[1]
        currentColors.LRB[2] = temp.RBU[2]
        currentColors.LRB[5] = temp.RBU[5]
        currentColors.RBU[0] = temp.ULR[4]
        currentColors.RBU[1] = temp.ULR[3]
        currentColors.RBU[2] = temp.ULR[7]
        currentColors.RBU[5] = temp.ULR[2]
      }
      else {
        currentColors.ULR[4] = temp.RBU[0]
        currentColors.ULR[3] = temp.RBU[1]
        currentColors.ULR[7] = temp.RBU[2]
        currentColors.ULR[2] = temp.RBU[5]
        currentColors.LRB[0] = temp.ULR[4]
        currentColors.LRB[1] = temp.ULR[3]
        currentColors.LRB[2] = temp.ULR[7]
        currentColors.LRB[5] = temp.ULR[2]
        currentColors.RBU[0] = temp.LRB[0]
        currentColors.RBU[1] = temp.LRB[1]
        currentColors.RBU[2] = temp.LRB[2]
        currentColors.RBU[5] = temp.LRB[5]
      }
    }
    if (section === 'u') {
      // [base, left, right, back]
      if (clockwise) {
        currentColors.BUL[8] = temp.ULR[8]
        currentColors.RBU[8] = temp.BUL[8]
        currentColors.ULR[8] = temp.RBU[8]
      }
      else {
        currentColors.BUL[8] = temp.RBU[8]
        currentColors.RBU[8] = temp.ULR[8]
        currentColors.ULR[8] = temp.BUL[8]
      }
    }
  
    if (section === 'U') {
      if (clockwise) {
        currentColors.BUL[8] = temp.ULR[8]
        currentColors.BUL[7] = temp.ULR[7]
        currentColors.BUL[6] = temp.ULR[6]
        currentColors.BUL[5] = temp.ULR[5]
        currentColors.RBU[8] = temp.BUL[8]
        currentColors.RBU[7] = temp.BUL[7]
        currentColors.RBU[6] = temp.BUL[6]
        currentColors.RBU[5] = temp.BUL[5]
        currentColors.ULR[8] = temp.RBU[8]
        currentColors.ULR[7] = temp.RBU[7]
        currentColors.ULR[6] = temp.RBU[6]
        currentColors.ULR[5] = temp.RBU[5]
      }
      else {
        currentColors.BUL[8] = temp.RBU[8]
        currentColors.BUL[7] = temp.RBU[7]
        currentColors.BUL[6] = temp.RBU[6]
        currentColors.BUL[5] = temp.RBU[5]
        currentColors.RBU[8] = temp.ULR[8]
        currentColors.RBU[7] = temp.ULR[7]
        currentColors.RBU[6] = temp.ULR[6]
        currentColors.RBU[5] = temp.ULR[5]
        currentColors.ULR[8] = temp.BUL[8]
        currentColors.ULR[7] = temp.BUL[7]
        currentColors.ULR[6] = temp.BUL[6]
        currentColors.ULR[5] = temp.BUL[5]
      }
    }
  
    if (section === 'b') {
      if (clockwise) {
        currentColors.LRB[8] = temp.BUL[0]
        currentColors.RBU[4] = temp.LRB[8]
        currentColors.BUL[0] = temp.RBU[4]
      }
      else {
        currentColors.LRB[8] = temp.RBU[4]
        currentColors.RBU[4] = temp.BUL[0]
        currentColors.BUL[0] = temp.LRB[8]
      }
    }
  
    if (section === 'B') {
      if (clockwise) {
        currentColors.LRB[8] = temp.BUL[0]
        currentColors.LRB[7] = temp.BUL[5]
        currentColors.LRB[6] = temp.BUL[1]
        currentColors.LRB[5] = temp.BUL[2]
        currentColors.RBU[4] = temp.LRB[8]
        currentColors.RBU[2] = temp.LRB[7]
        currentColors.RBU[3] = temp.LRB[6]
        currentColors.RBU[7] = temp.LRB[5]
        currentColors.BUL[0] = temp.RBU[4]
        currentColors.BUL[1] = temp.RBU[3]
        currentColors.BUL[2] = temp.RBU[7]
        currentColors.BUL[5] = temp.RBU[2]
      }
      else {
        currentColors.LRB[8] = temp.RBU[4]
        currentColors.LRB[7] = temp.RBU[2]
        currentColors.LRB[6] = temp.RBU[3]
        currentColors.LRB[5] = temp.RBU[7]
        currentColors.RBU[4] = temp.BUL[0]
        currentColors.RBU[2] = temp.BUL[5]
        currentColors.RBU[3] = temp.BUL[1]
        currentColors.RBU[7] = temp.BUL[2]
        currentColors.BUL[0] = temp.LRB[8]
        currentColors.BUL[1] = temp.LRB[6]
        currentColors.BUL[2] = temp.LRB[7]
        currentColors.BUL[5] = temp.LRB[5]
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


  return { 
    tetrahedronNodes,
    octahedronNodes,
    currentColors,
    updateColors,
    getCurrentColorOrientation 
  }

}