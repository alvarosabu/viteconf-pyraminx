import { onMounted } from 'vue';

export function useKeybindings(doMove, autoSolve) {
	onMounted(() => {
		if (!globalThis.window) return;

		window.document.addEventListener('keydown', (event) => {
			if (
				event.target?.tagName !== 'INPUT' &&
				event.target?.tagName !== 'TEXTAREA' &&
				!event.target?.isContentEditable
			) {
				const k = event.key.toUpperCase();
				if (
					k === 'L' ||
					k === 'R' ||
					k === 'U' ||
					k === 'B' ||
					k === 'H' ||
					k === 'J' ||
					k === 'K' ||
					k === 'M'
				) {
					const move =
						k === 'H'
							? 'R'
							: k === 'J'
							? 'B'
							: k === 'K'
							? 'L'
							: k === 'M'
							? 'U'
							: k;
					autoSolve.value = false;
					doMove(event.shiftKey ? move.toLowerCase() : move);
				}
				if (k === 'S') {
					autoSolve.value = !autoSolve.value;
				}
			}
		});
	});
}
