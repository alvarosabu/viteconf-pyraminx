<script setup lang="ts">
import { Bloom, EffectComposer } from '@tresjs/post-processing';
import { onMounted, reactive, ref } from 'vue';
import { BlendFunction, KernelSize } from 'postprocessing';
import Pyramid from './Pyramid.vue';
import OrbitControls from './OrbitControls.vue';

const interval = 100;
const toSpeed = 1;
const fromSpeed = -3;

const autoRotateSpeed = ref(fromSpeed);
onMounted(() => {
	const animateRotation = setInterval(() => {
		let newValue =
			autoRotateSpeed.value + (toSpeed - fromSpeed) * (interval / 3000);
		if (newValue >= toSpeed) {
			newValue = toSpeed;
			clearInterval(animateRotation);
		}
		autoRotateSpeed.value = newValue;
	}, interval);
});

const bloomParams = reactive({});
</script>

<template>
	<TresPerspectiveCamera :zoom="2.1" :position="[-6, -3, 6]" :up="[0, -1, 0]" />
	<OrbitControls
		:autoRotate="true"
		:autoRotateSpeed="autoRotateSpeed"
		:enablePan="false"
		:enableZoom="false"
	/>
	<TresAmbientLight :intensity="0.5" color="red" />
	<Suspense>
		<Pyramid />
	</Suspense>
	<Suspense>
		<EffectComposer>
			<Bloom :depth-buffer="true" v-bind="bloomParams" />
		</EffectComposer>
	</Suspense>
	<TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
</template>
