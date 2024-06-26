
import { onMounted } from 'vue'

export function useKeybindings(rotateSection, autoSolve) {
    onMounted(() => {
        if (!globalThis.window) return
        
        window.document.addEventListener('keydown', (event) => {
            if (event.target?.tagName !== 'INPUT' && event.target?.tagName !== 'TEXTAREA' && !event.target?.isContentEditable) {
                const k = event.key.toUpperCase()
                if (k === 'L' || k === 'R' || k === 'U' || k === 'B') {
                    autoSolve.value = false
                    rotateSection(event.shiftKey ? k : k.toLowerCase(), true);
                }
                if (k === 'S') {
                    autoSolve.value = !autoSolve.value
                }
            }
        })
    })
}