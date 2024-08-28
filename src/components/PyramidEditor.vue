<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import type { WebContainer } from '@webcontainer/api';
import CodeMirror from './code/CodeMirror.vue';

import solveCode from '../../pyramid/src/solve.js?raw';
import pyramidCode from '../../pyramid/src/components/Pyramid.vue?raw';
import sceneCode from '../../pyramid/src/components/Scene.vue?raw';


function debounce(fn: Function, n = 100) {
	let handle: any;
	return (...args: any[]) => {
		if (handle) clearTimeout(handle);
		handle = setTimeout(() => {
			fn(...args);
		}, n);
	};
}

const modes: Record<string, unknown> = {
	css: 'css',
	html: 'htmlmixed',
	js: {
		name: 'javascript',
	},
	json: {
		name: 'javascript',
		json: true,
	},
	ts: {
		name: 'javascript',
		typescript: true,
	},
	vue: 'htmlmixed',
};
const getMode = (filename: string) => {
	const mode = modes[filename.split('.').pop()!];
	return filename.lastIndexOf('.') !== -1 && mode ? mode : modes.js;
};

// We can glob the files, if we want to extend the editor
const files = [
	{
		name: '/src/solve.js',
		originalCode: solveCode,
		code: useLocalStorage(`viteconf:2024:pyramid.solve`, solveCode),
	},
	{
		name: '/src/components/Pyramid.vue',
		originalCode: pyramidCode,
		code: useLocalStorage(`viteconf:2024:pyramid.pyramid`, pyramidCode),
	},
	{
		name: '/src/components/Scene.vue',
		originalCode: sceneCode,
		code: useLocalStorage(`viteconf:2024:pyramid.scene`, sceneCode),
	},
].map((fileInfo) => {
	const file = {
		...fileInfo,
		mode: getMode(fileInfo.name),
		write: debounce(async (newCode: string) => {
			file.code.value = newCode;
			if (webcontainerInstance) {
				await webcontainerInstance.fs.writeFile(fileInfo.name, newCode);
			}
		}, 500),
	};
	return file;
});

const currentFile = ref(0);

const code = computed(() => {
	const fileInfo = files[currentFile.value];
	return fileInfo.code.value;
});

let webcontainerInstance: WebContainer | undefined;

onMounted(async () => {
	const { getWebContainer } = await import('../../wc');

	webcontainerInstance = await getWebContainer();
	files.forEach(async (file) => {
		await webcontainerInstance!.fs.writeFile(file.name, file.code.value);
	});	
});

function resetFile() {
	files[currentFile.value].write(files[currentFile.value].originalCode);
}
</script>

<template>
	<div class="pyramid-editors">
		<div class="editor-file-tabs">
			<template v-for="(file, i) in files" :key="file.name">
				<button
					:class="`editor-file-tab${currentFile === i ? ' active' : ''}`"
					@click="currentFile = i"
				>
					{{ file.name.split('/').pop() }}
				</button>
			</template>
			<div class="editor-actions">
				<button @click="resetFile()" class="editor-action" title="Restart">
					Restart
				</button>
				<a
					href="https://stackblitz.com/github/alvarosabu/viteconf-pyraminx?file=src/solve.js"
					target="_blank"
					class="editor-action stackblitz"
					title="Play in StackBlitz"
				>
					<img
						width="24"
						height="24"
						src="/stackblitz.svg"
						aria-hidden="true"
					/>
				</a>
			</div>
		</div>
		<div class="pyramid-editor-container">
			<div
				class="pyramid-editor"
				v-for="(file, i) in files"
				:key="file.name"
				:class="currentFile === i ? 'active' : ''"
			>
				<CodeMirror
					:value="file.code.value"
					:mode="file.mode"
					@change="(value) => file.write(value)"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.pyramid-editors {
	position: relative;
	--border-opacity: 0.04;
	--border-color-rgb: 255, 255, 255;
	--border-glow-opacity: 0;
	--border-glow-size: 8px 0;
	display: flex;
	flex-direction: column;
	width: 100%;
	border-radius: 8px;
	box-shadow: 0 0 0 1px rgba(var(--border-color-rgb), var(--border-opacity)),
		0 1px 0 0 rgba(255, 255, 255, 0.04), inset 0 2px 4px 0 rgba(0, 0, 0, 0.24),
		0 0 var(--border-glow-size)
			rgba(var(--border-color-rgb), var(--border-glow-opacity));
	background-color: rgba(0, 0, 0, 0.24);
	overflow: hidden;
}

.pyramid-editor-container {
	position: relative;
	height: 690px;
	width: 100%;
	box-shadow: 0 -1px 0 0 rgba(var(--border-color-rgb), var(--border-opacity));
	background-color: rgba(0, 0, 0, 0.24);
}

.pyramid-editor {
	height: 690px;
	width: 100%;
	position: absolute;
	top: 15px;
	left: 0;
	opacity: 0;
	transition: opacity 0.25s, top 0.25s;
	pointer-events: none;
	&.active {
		opacity: 1;
		top: 0;
		pointer-events: all;
	}
}

.editor-file-tabs {
	color: white;
	display: flex;
	flex-direction: row;
	gap: 4px;
	align-items: flex-start;
	padding: 6px;
}

button.editor-file-tab {
	border: none;
	color: white;
	--border-opacity: 0.05;
	display: flex;
	cursor: pointer;
	align-items: center;
	align-self: flex-start;
	padding: 8px 18px;
	font-size: 13px;
	border-radius: 4px;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, var(--border-opacity)),
		0 2px 4px 0 rgba(0, 0, 0, 0.4);
	background-color: #111318;
	background-image: radial-gradient(
		62% 80% at 0% 50%,
		hsla(287, 47%, 49%, 0.1),
		transparent
	);
	user-select: none;
	transition: var(--transition-fast);
}
.editor-file-tab:hover {
	--border-opacity: 0.12;
	background-color: hsla(287, 47%, 49%, 0.25);
}
.editor-file-tab.active {
	background-color: hsla(287, 47%, 49%, 0.5);
}

.editor-actions {
	flex: 1;
	display: flex;
	justify-content: flex-end;
	gap: 4px;
}
.editor-action {
	border: none;
	color: white;
	width: 4.5rem;
	--border-opacity: 0.05;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 36px;
	border-radius: 4px;
	background-color: #111318;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, var(--border-opacity)),
		0 2px 4px 0 rgba(0, 0, 0, 0.4);
	transition: var(--transition-fast);
}
.editor-action.stackblitz {
	width: 36px;
}
.editor-action:hover {
	--border-opacity: 0.12;
	background-color: hsla(287, 47%, 49%, 0.25);
}
.editor-action img {
	width: 24px;
	height: 24px;
	filter: grayscale(100%) brightness(2);
}
</style>

<style>
.CodeMirror {
	font-size: 12.5px;
}
.CodeMirror-scroll {
	padding: 8px 16px;
}
.CodeMirror-gutters {
	border-right-color: var(--bg);
	transform: translateX(24px);
}
.CodeMirror-guttermarker-subtle {
	transform: translateX(4px);
}
</style>
