import { useGLTF } from '@tresjs/cientos'

export async function usePyraminx() {
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

  return { tetrahedronNodes, octahedronNodes }

}