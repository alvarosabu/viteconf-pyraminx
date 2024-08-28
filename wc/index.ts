import { WebContainer, WebContainerProcess } from '@webcontainer/api';
import { modulesPromise } from './modules.mjs';

export interface PromiseWithResolvers<T> {
	promise: Promise<T>;
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (reason?: any) => void;
}
export function promiseWithResolvers<T>(): PromiseWithResolvers<T> {
	let resolve: any;
	let reject: any;
	const promise = new Promise<T>((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});
	return { promise, resolve, reject };
}

/**
 * Checks if WebContainer is supported on the current browser.
 * TODO: fallback using this function
 */
export function isWebContainerSupported() {
	if (typeof window === 'undefined') {
		return false;
	}
	const hasSharedArrayBuffer = 'SharedArrayBuffer' in window;
	const looksLikeChrome = navigator.userAgent.toLowerCase().includes('chrome');
	const looksLikeFirefox = navigator.userAgent.includes('Firefox');
	const looksLikeSafari = navigator.userAgent.includes('Safari');

	if (hasSharedArrayBuffer && (looksLikeChrome || looksLikeFirefox)) {
		return true;
	}

	if (hasSharedArrayBuffer && looksLikeSafari) {
		// we only support Safari 16.4 and up so we check for the version here
		const match = navigator.userAgent.match(
			/Version\/(\d+)\.(\d+) (?:Mobile\/.*?)?Safari/
		);
		const majorVersion = match ? Number(match?.[1]) : 0;
		const minorVersion = match ? Number(match?.[2]) : 0;

		return majorVersion > 16 || (majorVersion === 16 && minorVersion >= 4);
	}

	// Allow overriding the support check with localStorage.webcontainer_any_ua = 1
	try {
		return Boolean(localStorage.getItem('webcontainer_any_ua'));
	} catch {
		return false;
	}
}

const vsCodeDarkPlusTerminalTheme = {
	cursor: '#eff0eb',
	cursorAccent: '#00000000',
	foreground: '#eff0eb',
	background: '#16181D',
	red: '#ff5c57',
	green: '#5af78e',
	yellow: '#f3f99d',
	blue: '#57c7ff',
	magenta: '#ff6ac1',
	cyan: '#9aedfe',
	white: '#f1f1f0',
	brightBlack: '#686868',
	brightRed: '#ff5c57',
	brightGreen: '#5af78e',
	brightYellow: '#f3f99d',
	brightBlue: '#57c7ff',
	brightMagenta: '#ff6ac1',
	brightCyan: '#9aedfe',
	brightWhite: '#f1f1f0',
	selectionBackground: '#97979b33',
};

const webcontainerPromise = promiseWithResolvers<WebContainer>();

let webcontainerInstance: WebContainer | null = null;
let currentProcess: WebContainerProcess;
let shellWriter: WritableStreamDefaultWriter<string>;
let terminal: (import('xterm').Terminal & { fit?: () => void }) | undefined;

export async function getWebContainer() {
	return webcontainerInstance || webcontainerPromise.promise;
}

/* TODO
	onResize() {
      terminal.fit?.();

      currentProcess?.resize({
        cols: terminal.cols,
        rows: terminal.rows,
      });
    }
*/

export async function bootWebContainer(terminalElement: HTMLElement) {
	let wcInstancePromise = WebContainer.boot({ workdirName: 'pyramid' });

	terminal = await createTerminal(terminalElement);

	terminal.reset();

	const wcInstance = await wcInstancePromise;

	await mountModules(wcInstance);

	terminal.reset();

	setupTerminal(wcInstance);

	webcontainerInstance = wcInstance;

	webcontainerPromise.resolve(wcInstance);

	return webcontainerInstance;
}

// Same scheme from learn.svelte.dev
async function mountModules(wcInstance: WebContainer) {
	const modules = await modulesPromise;
	await wcInstance.mount({
		'modules.zip': {
			file: { contents: new Uint8Array(modules.zipped) },
		},
		'unzip.cjs': {
			file: { contents: modules.unzip },
		},
	});
	const unzip = await wcInstance.spawn('node', ['unzip.cjs']);
	await unzip.exit;

	await wcInstance.spawn('chmod', ['a+x', 'node_modules/vite/bin/vite.js']);
}

let jshReady = promiseWithResolvers<void>();

export const terminalReady = jshReady.promise;

async function setupTerminal(wcInstance: WebContainer) {
	if (!terminal) {
		return;
	}
	// we set an infinite loop so that when the user runs the `exit` command, we restart
	while (true) {
		currentProcess = await wcInstance.spawn('jsh', {
			terminal: {
				cols: terminal.cols,
				rows: terminal.rows,
			},
		});

		let isJSHReady = false;

		// write the process output to the terminal
		currentProcess.output.pipeTo(
			new WritableStream({
				write(data) {
					if (data.includes('❯') && !isJSHReady) {
						isJSHReady = true;
						jshReady.resolve();
					}
					terminal!.write(data);
				},
			})
		);

		shellWriter = currentProcess.input.getWriter();

		await jshReady.promise;

		// write the terminal input to the process
		const terminalWriter = terminal.onData((data) => {
			shellWriter.write(data);
		});

		// wait for the process to finish
		await currentProcess.exit;

		terminal.clear();
		terminalWriter.dispose();
		jshReady = promiseWithResolvers<void>();
	}
}

async function createTerminal(element: HTMLElement) {
	element.innerHTML = '';
	if (terminal) {
		terminal.open(element);
		return terminal;
	}

	const { Terminal } = await import('xterm');
	const { FitAddon } = await import('xterm-addon-fit');
	const { WebLinksAddon } = await import('xterm-addon-web-links');

	terminal = new Terminal({
		convertEol: true,
		cursorStyle: 'bar',
		cursorInactiveStyle: 'none',
		cursorBlink: true,
		disableStdin: false,
		theme: vsCodeDarkPlusTerminalTheme,
		fontSize: 12,
		fontFamily: 'Menlo, courier-new, courier, monospace',
	});

	terminal.open(element);

	// we attach a FitAddon instance to help with resizing. Every time
	// we feel like the terminal element has changed size, we'll use the
	// addon to force a re-render
	const fitAddon = new FitAddon();
	terminal.loadAddon(fitAddon);
	terminal.loadAddon(new WebLinksAddon());

	fitAddon.fit();

	// attach a `fit()` method to the terminal so we can easily resize it
	terminal = Object.assign(terminal, {
		fit() {
			fitAddon.fit();
		},
	});
	return terminal;
}

export async function initWebContainer() {
	await jshReady.promise;
	await shellWriter.write('npm run dev\n');
}
