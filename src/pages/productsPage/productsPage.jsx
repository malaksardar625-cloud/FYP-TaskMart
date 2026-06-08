import { useState, useContext, useEffect } from 'react'
import {
  Box,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  Alert,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { ItemCard } from '../../components/itemCard/itemCard'
import { CouponBanner } from '../../components/generalComponents/couponBanner'
import { Footer } from '../../components/footer/footer'
import Navbar from '../../components/navbar/navbar'
import { CartContext } from '../../context/cartContext'
import { apiClient } from '../../api/apiClient'

export default function ProductsPage() {
  const cartContext = useContext(CartContext)
  const addToCart = cartContext?.addToCart

  const [activeCat, setActiveCat] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [allCategories, setAllCategories] = useState(['All'])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setFetchError(null)

        const res = await apiClient('/products')

        // ✅ correct API contract
        const list = res?.data || []

        setProducts(list)

        const categories = [
          'All',
          ...new Set(list.map((p) => p.category).filter(Boolean)),
        ]

        setAllCategories(categories)
      } catch (err) {
        setFetchError(err.message || 'Could not load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts =
    activeCat === 'All'
      ? products
      : products.filter((p) => p.category === activeCat)

  return (
    <Box>
      <Navbar />

      <Box sx={{ py: 8, textAlign: 'center', bgcolor: '#0d2035' }}>
        <Typography variant="h3" sx={{ color: '#fff' }}>
          Browse Products
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {fetchError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {fetchError}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Stack direction="row" gap={1.5} flexWrap="wrap" mb={4}>
              {allCategories.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  onClick={() => setActiveCat(c)}
                  variant={activeCat === c ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>

            <Grid container spacing={3}>
              {filteredProducts.map((p) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={p._id || p.id}>
                  <ItemCard item={p} addToCart={addToCart} />
                </Grid>
              ))}
            </Grid>

            {products.length > 0 && <CouponBanner />}
          </>
        )}
      </Container>

      <Footer />
    </Box>
  )
}
