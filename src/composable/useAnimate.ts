// src/composables/useAnimate.js
import { Quaternion } from 'three'
import { ref } from 'vue'

export const easeFunctions = {
  'linear': t => t,
  'ease-in': t => t * t,
  'ease-out': t => t * (2 - t),
  'ease-in-out': t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
}

export function useAnimate() {
  const requestRef = ref()
  const startTimeRef = ref()

  const parseValue = (start, value) => {
    if (typeof value === 'string') {
      const match = value.match(/^([+-]=)(.*)$/)
      if (match) {
        const sign = match[1]
        const relativeValue = Number.parseFloat(match[2])
        if (sign === '+=') { return start + relativeValue }
        if (sign === '-=') { return start - relativeValue }
      }
    }
    return value
  }

  const animate = (target, from, to, { duration = 1, easing = 'linear' } = {}) => {
    const easingFunction = easeFunctions[easing] || easeFunctions.linear

    const keys = Object.keys(to)
    keys.forEach((key) => {
      from[key] = from[key] ?? target[key] // Use current value if from value is not specified
      to[key] = parseValue(from[key], to[key])
    })

    const start = performance.now()

    const step = (currentTime) => {
      if (!startTimeRef.value) { startTimeRef.value = currentTime }
      const elapsed = currentTime - start

      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easedProgress = easingFunction(progress)

      keys.forEach((key) => {
        target[key] = from[key] + (to[key] - from[key]) * easedProgress
      })

      if (progress < 1) {
        requestRef.value = requestAnimationFrame(step)
      }
      else {
        cancelAnimationFrame(requestRef.value)
      }
    }

    requestRef.value = requestAnimationFrame(step)
  }

  const animateQuaternion = (object, startQuaternion, endQuaternion, { duration = 1, easing = 'linear' } = {}) => {
    const easingFunction = easeFunctions[easing] || easeFunctions.linear
    const startTime = performance.now()
    const currentQuaternion = startQuaternion.clone() // Clone to avoid mutating the startQuaternion

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easedProgress = easingFunction(progress)

      // Use the slerp method on the currentQuaternion to interpolate towards endQuaternion
      object.quaternion.copy(currentQuaternion).slerp(endQuaternion, easedProgress)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  const animateTo = (target, to, options) => {
    const from = {}
    Object.keys(to).forEach((key) => {
      from[key] = target[key]
    })
    animate(target, from, to, options)
  }

  return { animate, animateTo, animateQuaternion }
}
