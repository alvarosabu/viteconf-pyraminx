<script setup lang="ts"></script>

<template>
	<div class="pyramid-preview-loading">
		<div class="pyramid-loader">
			<div class="secondary-rotate">
				<div class="side-1" />
				<div class="side-2" />
				<div class="side-3" />
				<div class="side-4" />
			</div>
		</div>
		<div class="loading-message">
			<span>Booting WebContainer...</span>
		</div>
	</div>
</template>

<style scoped>
.pyramid-preview-loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	width: 100%;
	height: 100%;
	perspective: 400px;
	perspective-origin: center center;
	transform: scale(0.6) translate(0, 20px);
}

.pyramid-loader {
	transform: scale(10);
	width: 100px;
	height: 100px;
	transform-origin: 50% 50% -29px;
	transform-style: preserve-3d;
	animation: pyramid-spin 2s ease infinite;
}
.pyramid-loader	.secondary-rotate {
	width: 100px;
	height: 100px;
	transform-style: preserve-3d;
	transform-origin: 50% 30% -29px;
	animation: secondary-spin 4.3s ease infinite;
	animation-delay: 2.4s;
}

.pyramid-loader .side-1,
.pyramid-loader .side-2,
.pyramid-loader .side-3,
.pyramid-loader .side-4 {
	position: absolute;
	width: 100%;
	height: 100%;
	transform-origin: top left;
	background-size: cover;
	background-image: url('/pyramid-side.svg');
}
.pyramid-loader .side-1 {
	transform: rotateY(60deg) rotateX(19.5deg);
}
.pyramid-loader .side-2 {
	transform-origin: top right;
	transform: rotateY(-60deg) rotateX(19.5deg);
}
.pyramid-loader .side-3 {
	transform: rotateX(-19.5deg);
}
.pyramid-loader .side-4 {
	transform: rotateX(-90deg);
}

@keyframes pyramid-spin {
	from {
		transform: rotateX(-21deg) rotateY(0deg);
	}
	to {
		transform: rotateX(-21deg) rotateY(360deg);
	}
}

@keyframes secondary-spin {
	from {
		transform: rotateY(0deg) rotateX(0deg);
	}
	to {
		transform: rotateY(360deg) rotateX(360deg);
	}
}

.loading-message {
	font-size: 18px;
	letter-spacing: 0.5px;
}
</style>
