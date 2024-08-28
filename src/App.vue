<script setup lang="ts">
import 'xterm/css/xterm.css'
import { ref, defineAsyncComponent } from 'vue';
import stackblitz from '/stackblitz-full-logo.svg';
import PyramidTerminal from './components/PyramidTerminal.vue';
import Pyramid from './components/Pyramid.vue';

const pyramidDevMode = ref(false);

const AsyncPyramidEditor = defineAsyncComponent(
	() => import('./components/PyramidEditor.vue')
);
</script>

<template>
	<div class="landing-hero" :class="{ 'dev-mode': pyramidDevMode }">
		<div class="hero-content">
			<div class="hero-content-main">
				<h1>Building together, lightning fast.</h1>
				<p class="subheading">
					Join us on <span class="date">October 3rd</span> and be a part of
					the community building the next-generation of the web.
					<span class="brought-to-you-by">Brought to you by</span>
					<a href="https://stackblitz.com/" target="_blank"
						><img alt="StackBlitz" :src="stackblitz"
					/></a>
				</p>
			</div>

			<AsyncPyramidEditor v-if="pyramidDevMode" />
		</div>

		<div
			:class="`pyramid-container${pyramidDevMode ? ' dev-mode' : ''}`"
		>
			<div class="pyramid-sticky-container">
				<div class="pyramid-sticky">
					<div
						v-if="!pyramidDevMode"
						class="dev-mode-action"
						style="z-index: 1"
					>
						<span>WASD + shift, or solve it with</span>
						<button @click="pyramidDevMode = true" class="devmode">
							Code!
						</button>
					</div>
					<div class="pyramid-outer">
						<Pyramid :devMode="pyramidDevMode" />
					</div>
				</div>
			</div>
			<div class="pyramid-terminal-container" v-if="pyramidDevMode">
				<PyramidTerminal />
			</div>
		</div>
	</div>
</template>

<style scoped>

.landing-hero {
	position: relative;
	display: grid;
	grid-template-columns: auto 1fr;
	width: 100%;
	gap: 64px;
	padding-top: 150px;
	margin-bottom: 50px;
}

.landing-hero.dev-mode {
	margin-bottom: 150px;
}

.hero-content {
	color: white;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 36px;
	width: 670px;
}

.body-logo-container {
	display: flex;
	justify-content: center;
	align-items: top;
	padding-top: 50px;
	width: 100%;
}
.body-logo {
	width: 316px;
	height: 316px;
}

.hero-content-main {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 36px;

	width: 100%;
	height: 600px;
}

.hero-content h1 {
	margin-bottom: 0;
	font-size: 76px;
	font-weight: 600;
	line-height: 1.1;
	letter-spacing: -2px;
}

.hero-content .subheading {
	position: relative;
	display: inline;
	font-size: 22px;
	line-height: 1.62;
}

.hero-content .subheading .date {
	background: linear-gradient(
		174deg,
		hsl(286, 100%, 67%),
		hsl(297, 100%, 83%) 80%
	);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.hero-content .brought-to-you-by {
	display: inline-block;
	font-size: 22px;
	line-height: 2;
	opacity: 0.72;
}

.hero-content .subheading img {
	display: inline-block;
	height: 28px;
	width: auto;
	margin-inline-start: 10px;
	transform: translateY(8px);
}

.pyramid-container {
	position: relative;
	height: 500px;
}

.pyramid-container.dev-mode {
	height: 1384px;
}

.pyramid-container.dev-mode .pyramid-sticky-container {
	height: 1080px;
}

.pyramid-sticky {
	height: 430px;
	position: sticky;
	top: 160px;
}

.pyramid-outer {
	width: 100%;
	height: 500px;
	transform: scale(1.1) translateY(-60px);
}

.pyramid-terminal-container {
	position: absolute;
	bottom: 12px;
	width: 100%;
}

.dev-mode-action {
	position: absolute;
	bottom: 15px;
	width: 100%;
	display: flex;
	justify-content: center;
	color: #888;
	font-size: 13px;
	font-weight: 400;
	font-family: monospace;
	display: flex;
	align-items: center;
	gap: 14px;
	transform: translateY(24px);
	opacity: 1;
	transition: opacity 1s;
}

.dev-mode-action button {
	--box-shadow-opacity: 0.1;
	--background: #000;
	--background-button-blue-hover: #222;
	--background-button-blue: #222;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px;
	gap: 8px;
	padding: 8px 18px;
	color: #888;
	font-family: monospace;
	font-size: 13px;
	font-weight: 400;
	border-radius: 8px;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, var(--box-shadow-opacity));
	background-image: linear-gradient(
		to bottom,
		var(--background),
		var(--background)
	);
	transition: opacity 1s, background-color 0.4s;
}

.dev-mode-action button:hover,
.dev-mode-action button:focus {
	--box-shadow-opacity: 0.2;
	background-image: linear-gradient(
		to bottom,
		var(--background-button-blue-hover),
		var(--background-button-blue)
	);
	color: #fff;
	background-color: #1d2437;
	cursor: pointer;
}

</style>
