<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PyramidLoading from './PyramidLoading.vue'

const loading = ref(true);

onMounted(async () => {
	const { bootWebContainer, terminalReady } = await import('../../wc');
	terminalReady.then(() => {
		loading.value = false;
	});
	const terminalPanel = document.querySelector('.pyramid-terminal');
	bootWebContainer(terminalPanel as HTMLElement);
});
</script>

<template>
	<div class="terminal-wrapper">
		<PyramidLoading v-if="loading" />
		<div class="pyramid-terminal" :style="{ opacity: loading ? 0 : 1 }"></div>
	</div>
</template>

<style>
.xterm-helpers {
	height: 0;
}

.xterm-viewport {
	background-color: transparent !important;
	scrollbar-color: #3c424f #0a0d0f !important;
}
</style>

<style scoped>
.terminal-wrapper {
	border-radius: 5px;
	padding: 15px 2px 15px 15px;
	width: 100%;
	height: 240px;
	background-color: #090b0d;
	outline: 0.1px solid #38383899;
}

.pyramid-terminal {
	position: relative;
	height: 210px;
	font-size: 12px;
	z-index: 99;
}
</style>
