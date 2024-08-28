<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import { onMounted, reactive, ref } from 'vue';
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three';
import Scene from './components/Scene.vue';

const showCanvas = ref(false);
onMounted(() => {
	if (!globalThis.window) {
		return;
	}
	setTimeout(() => {
		showCanvas.value = true;
	}, 1000);
});

const state = reactive({
	alpha: true,
	transparent: true,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
});
</script>

<template>
	<div :style="{ opacity: showCanvas ? 1 : 0 }">
		<TresCanvas v-bind="state">
			<Scene />
		</TresCanvas>
	</div>
</template>

<style scoped>
div {
	width: 100%;
	height: 100%;
	opacity: 0;
	transition: opacity 3s;
}
</style>
