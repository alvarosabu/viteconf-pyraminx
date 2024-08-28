<script setup lang="ts">
const { pyramidPreviewUrl = '', iframeReady = false } = defineProps<{
	pyramidPreviewUrl: string;
	iframeReady: boolean;
}>();
</script>

<template>
	<iframe
		id="pyramid-iframe"
		class="pyramid-preview"
		:style="{
			opacity: iframeReady ? 1 : 0,
			position: iframeReady ? 'relative' : 'absolute',
		}"
		:src="pyramidPreviewUrl"
		allowtransparency="true"
		allow="geolocation; microphone; camera; payment; autoplay; serial; cross-origin-isolated"
	/>
</template>

<style scoped>
.pyramid-preview {
	border: none;
	width: 100%;
	height: 100%;
	transition: opacity 0.5s;
	position: absolute;
}
</style>
