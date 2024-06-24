
import { onMounted } from 'vue'

export function useKeybindings(rotateSection) {
    onMounted(() => {
        if (!globalThis.window) return
        
        window.document.addEventListener('keydown', (event) => {
            const k = event.key.toUpperCase()
            if (k === 'L' || k === 'R' || k === 'U' || k === 'B') {
                rotateSection(event.altKey ? k.toLowerCase() : k, event.shiftKey)
            }    
        })
    })
}