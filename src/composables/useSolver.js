import { solve } from '../solve.js'

let currentSolve = solve

export async function useSolver(pyramid, autoSolve) {
    while (true) {
        await sleep(1000)
        if (!autoSolve.value) {
            continue
        }
        try {
            currentSolve(pyramid)
        }
        catch(e) {
            console.error(e)
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

if (import.meta.hot) {
    import.meta.hot.accept('../solve.js', (newSolver) => {
        currentSolve = newSolver?.solve ?? (() => {})
        autoSolve.value = true
    })
}
  