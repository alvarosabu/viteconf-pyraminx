import { solve } from '../solve.js'

let _solve = solve
let _autoSolve

export async function useSolver(pyramid, autoSolve) {
    _autoSolve = autoSolve
    while (true) {
        await sleep(1000)
        if (!autoSolve.value) {
            continue
        }
        try {
            _solve(pyramid)
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
        if (newSolver?.solve) {
            _solve = newSolver?.solve
            if (_autoSolve) {
                _autoSolve.value = true
            }
        }
    })
}
  