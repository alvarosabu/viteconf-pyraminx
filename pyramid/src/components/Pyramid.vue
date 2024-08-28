<script setup lang="ts">
// Powered by TresJS! Learn more at https://tresjs.org

import type { Ref } from 'vue';
import { ref, onMounted, watch } from 'vue';
import { useTres } from '@tresjs/core';
import type { Group, Material } from 'three';
import { Color } from 'three';
import { usePyramid } from '../composables/usePyramid';
import { useKeybindings } from '../composables/useKeybindings';
import Tetrahedron from './Tetrahedron.vue';
import Octahedron from './Octahedron.vue';
import { useSolver } from '../composables/useSolver.js';

function setupMaterial(material: Material) {
	let emissiveIntensity = 2;
	switch (material.name) {
		case 'NeonBlue':
			material.emissive = new Color('#61b4fa');
			emissiveIntensity *= 1.25;
			break;
		case 'NeonPurple':
			emissiveIntensity *= 2.7;
		case 'NeonGreen':
		case 'NeonYellow':
			break;
	}
	material.emissiveIntensity = emissiveIntensity;
	material.opacity = 0.98;
	material.transparent = true;
}

const pyramidRef = ref<Group | null>();
const autoSolve = ref(true);

const { scene } = useTres();
const {
	tetrahedronNodes,
	octahedronNodes,
	tetrahedrons,
	octahedrons,
	pyramid,
	solved,
} = await usePyramid(pyramidRef as Ref<Group>, scene, setupMaterial);

watch(solved, (newVal) => {
	pyramidRef.value?.children.forEach((child) => {
		if (child.name.includes('octahedron')) {
			child.visible = !newVal;
		}
	});
});

onMounted(() => {
	// Do a quick scramble of the pyramid
	const sections = ['U', 'L', 'R', 'B'];
	let prevSection;
	for (let i = 0; i < 10; i++) {
		let section;
		while (!section || section === prevSection) {
			section = sections[Math.floor(Math.random() * sections.length)];
		}
		prevSection = section;
		pyramid.doMove(
			Math.random() > 0.7 ? section.toLocaleLowerCase() : section,
			Math.random() > 0.5,
			200
		);
	}
	setTimeout(() => {
		useSolver(pyramid, autoSolve);
	}, 3000);
});

useKeybindings(pyramid.doMove, autoSolve);
</script>

<template>
	<TresGroup ref="pyramidRef">
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
