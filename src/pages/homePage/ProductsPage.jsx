import { useState } from 'react'
import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material'

import { ItemCard, CouponBanner, Footer } from '../../components/shared'
import productsData from '../../mockData/products.json'

// All unique categories derived from data (keeps it DRY)
const ALL_CATEGORIES = ['All', ...new Set(productsData.map((p) => p.category))]

export default function ProductsPage({ addToCart }) {
  const [activeCat, setActiveCat] = useState('All')

  // Sections to render: if "All" show every category, else just the selected one
  const sections =
    activeCat === 'All'
      ? [...new Set(productsData.map((p) => p.category))]
      : [activeCat]

  return (
    <Box>
      {/* ── Page Header ─────────────────────────────────────── */}
      <Box
        sx={{
          background:
            'linear-gradient(135deg,#0d2035 0%,#1a3c5e 50%,#1a5080 100%)',
          py: 8,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" sx={{ color: '#fff', mb: 2, fontWeight: 700 }}>
          Browse Products
        </Typography>
        <Typography
          sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, mx: 'auto' }}
        >
          Discover thousands of products from verified sellers across Pakistan
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* ── Category Filter Chips ──────────────────────────── */}
        <Stack direction="row" gap={1} mb={4} sx={{ flexWrap: 'wrap' }}>
          {ALL_CATEGORIES.map((c) => (
            <Chip
              key={c}
              label={c}
              onClick={() => setActiveCat(c)}
              variant={activeCat === c ? 'filled' : 'outlined'}
              color={activeCat === c ? 'primary' : 'default'}
              sx={{
                fontWeight: 700,
                cursor: 'pointer',
                px: 1.5,
                mb: 1.5,
                ml: '1rem',
                height: 36,
                borderRadius: 99,
                '&:hover': { bgcolor: activeCat === c ? undefined : '#e8ecf4' },
              }}
            />
          ))}
        </Stack>

        {/* ── Product Sections ───────────────────────────────── */}
        {sections.map((section) => {
          const items = productsData.filter((p) => p.category === section)
          return (
            <Box key={section} mb={6}>
              <Stack
                direction="row"
                gap={1.5}
                mb={4}
                sx={{ flexWrap: 'wrap', rowGap: 1.5, m: 3 }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 28,
                    bgcolor: 'secondary.main',
                    borderRadius: 2,
                    mb: 1.5,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {section}
                </Typography>
                <Chip
                  label={`${items.length} items`}
                  size="small"
                  sx={{ fontSize: '0.72rem' }}
                />
              </Stack>

              <Grid container spacing={3}>
                {items.map((p) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
                    <ItemCard item={p} addToCart={addToCart} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )
        })}

        {/* ── Coupon Banner ──────────────────────────────────── */}
        <CouponBanner />
      </Container>

      <Footer />
    </Box>
  )
}
