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

export default function ServicesPage() {
  const cartContext = useContext(CartContext)
  const addToCart = cartContext?.addToCart

  const [activeCat, setActiveCat] = useState('All')
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [allCategories, setAllCategories] = useState(['All'])

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        setFetchError(null)

        const res = await apiClient('/services')

        // ✅ FIX: correct backend structure
        const list = res?.data || []

        setServices(list)

        const categories = [
          'All',
          ...new Set(list.map((s) => s.category).filter(Boolean)),
        ]

        setAllCategories(categories)
      } catch (err) {
        setFetchError(err.message || 'Could not load services')
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const filteredServices =
    activeCat === 'All'
      ? services
      : services.filter((s) => s.category === activeCat)

  return (
    <Box>
      <Navbar />

      <Box sx={{ py: 8, textAlign: 'center', bgcolor: '#0d2035' }}>
        <Typography variant="h3" sx={{ color: '#fff' }}>
          Browse Services
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
              {allCategories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setActiveCat(cat)}
                  variant={activeCat === cat ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>

            <Grid container spacing={3}>
              {filteredServices.map((service) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>
                  <ItemCard item={service} addToCart={addToCart} isService />
                </Grid>
              ))}
            </Grid>

            {services.length > 0 && <CouponBanner />}
          </>
        )}
      </Container>

      <Footer />
    </Box>
  )
}
