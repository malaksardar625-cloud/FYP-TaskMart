import { useState, useEffect, useRef } from 'react'

export function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return count
}
