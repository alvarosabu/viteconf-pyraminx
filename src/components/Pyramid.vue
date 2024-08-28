<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue';
import PyramidOnWebContainer from './PyramidOnWebContainer.vue';

const props = defineProps<{ devMode: boolean }>();

// We can show two or three files in tabs here
const pyramidPreviewUrl = ref('');
const iframeReady = ref(false);

watch(() => props.devMode, async (newVal) => {
	if (!newVal) {
		return;
	}

	window.scrollTo({ top: 690, behavior: 'smooth' });

	const { getWebContainer, initWebContainer } = await import('../../wc');
	const webcontainerInstance = await getWebContainer();
	console.log('wc ready');
	webcontainerInstance.on('server-ready', (port, url) => {
		pyramidPreviewUrl.value = url;
		setTimeout(() => {
			iframeReady.value = true;
		}, 4000);
	});
	webcontainerInstance.on('port', (port, type) => {
		console.log('port', port, type);
		if (type === 'close') {
			pyramidPreviewUrl.value = '';
			iframeReady.value = false;
		}
	});

	initWebContainer();
});

const AsyncPyramid = defineAsyncComponent(
	() => import('../../pyramid/src/App.vue')
);
</script>

<template>
	<PyramidOnWebContainer
		v-if="devMode"
		:style="{ opacity: pyramidPreviewUrl === '' || !iframeReady ? 0 : 1 }"
		:pyramidPreviewUrl="pyramidPreviewUrl"
		:iframeReady="iframeReady"
	/>
	<div
		class="pyramid-on-page-container"
		:class="pyramidPreviewUrl !== '' ? 'devmode' : ''"
	>
		<AsyncPyramid />
	</div>
</template>

<style scoped>
.pyramid-on-page-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: opacity 4s, transform 4s;
}
.pyramid-on-page-container.devmode {
	opacity: 0;
	transform: scale(0);
}
</style>
