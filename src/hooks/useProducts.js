import { useState, useEffect } from 'react'
import { getProducts } from '../api/productApi'

export function useProducts(limit = 6) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await getProducts()

        const data =
          res?.data?.products || res?.data || res?.products || res || []

        const finalData = Array.isArray(data) ? data.slice(0, limit) : []

        if (isMounted) {
          setProducts(finalData)
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Failed to load products')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [limit])

  return { products, loading, error }
}
