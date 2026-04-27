import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp
 * ─────────────────────────────────────────────────────────────
 * Animates a number from 0 → end with ease-out cubic easing.
 * Starts automatically when the target element enters the viewport.
 *
 * @param {number}  end       Target number
 * @param {number}  duration  Animation duration in ms (default 2200)
 * @returns {{ count: number, ref: React.RefObject }}
 *
 * Usage (attach ref to ANY ancestor of the number):
 *   const { count, ref } = useCountUp(200)
 *   <Box ref={ref}>{count}K+</Box>
 */
export function useCountUp(end, duration = 2200) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  // watch for element entering viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // run animation once started
  useEffect(() => {
    if (!started) return
    let startTime = null
    const tick = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, end, duration])

  return { count, ref }
}
