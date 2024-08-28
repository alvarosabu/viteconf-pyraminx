import { onMounted } from 'vue';

const ergonomicMap: Record<string, string> = { A: 'L', D: 'R', W: 'U', S: 'B' };

export function useKeybindings(doMove, autoSolve) {
	function doAction(move: string) {
		if (move === 'P') {
			autoSolve.value = !autoSolve.value;
		} else {
			autoSolve.value = false;
			doMove(move);
		}
	}
	onMounted(() => {
		if (!globalThis.window) return;

		window.addEventListener('message', function (event) {
			// Message received from parent
			console.log('Message received from parent:', event.data);
			if (event.data.pyramidAction) {
				doAction(event.data.pyramidAction);
			}
		});

		window.document.addEventListener('keydown', (event) => {
			if (
				event.target?.tagName !== 'INPUT' &&
				event.target?.tagName !== 'TEXTAREA' &&
				!event.target?.isContentEditable
			) {
				const k = event.key.toUpperCase();
				if (
					k === 'P' ||
					k === 'L' ||
					k === 'R' ||
					k === 'U' ||
					k === 'B' ||
					// Ergonomic keys
					ergonomicMap[k]
				) {
					const mappedMove = ergonomicMap[k] ?? k;
					const move =
						mappedMove === 'P'
							? 'P'
							: event.shiftKey
							? mappedMove.toLowerCase()
							: mappedMove;
					const pyramidIframe =
						window.document.getElementById('pyramid-iframe');
					if (
						pyramidIframe !== null &&
						pyramidIframe.attributes.getNamedItem('src')?.value
					) {
						pyramidIframe.contentWindow.postMessage(
							{ pyramidAction: move },
							'*'
						);
					} else {
						doAction(move);
					}
				}
			}
		});
	});
}
