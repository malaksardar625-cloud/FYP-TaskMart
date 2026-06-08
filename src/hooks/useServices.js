import { useState, useEffect } from 'react'
import { getServices } from '../api/serviceApi'

export function useServices(limit = 6) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchServices = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await getServices()

        const data =
          res?.data?.services || res?.data || res?.services || res || []

        if (isMounted) {
          setServices(data.slice?.(0, limit) ?? data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Failed to load services')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchServices()

    return () => {
      isMounted = false
    }
  }, [limit])

  return { services, loading, error }
}
