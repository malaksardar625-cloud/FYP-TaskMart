import { useState } from 'react'
import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material'

import { ItemCard, CouponBanner, Footer } from '../../components/shared.jsx'
import servicesData from '../../mockData/services.json'

// All unique categories derived from data
const ALL_CATEGORIES = ['All', ...new Set(servicesData.map((s) => s.category))]

export default function ServicesPage({ addToCart }) {
  const [activeCat, setActiveCat] = useState('All')

  const sections =
    activeCat === 'All'
      ? [...new Set(servicesData.map((s) => s.category))]
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
          Browse Services
        </Typography>
        <Typography
          sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, mx: 'auto' }}
        >
          Find skilled professionals for any task, big or small
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* ── Category Filter Chips ──────────────────────────── */}
        <Stack
          direction="row"
          gap={1.5}
          mb={4}
          sx={{ flexWrap: 'wrap', rowGap: 1.5 }}
        >
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
                mb: 3,
                ml: '1rem',
                height: 36,
                borderRadius: 99,
                '&:hover': { bgcolor: activeCat === c ? undefined : '#e8ecf4' },
              }}
            />
          ))}
        </Stack>

        {/* ── Service Sections ───────────────────────────────── */}
        {sections.map((section) => {
          const items = servicesData.filter((s) => s.category === section)
          return (
            <Box key={section} mb={6}>
              <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
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
                    label={`${items.length} services`}
                    size="small"
                    sx={{ fontSize: '0.72rem' }}
                  />
                </Stack>
              </Stack>

              <Grid container spacing={3}>
                {items.map((s) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={s.id}>
                    <ItemCard item={s} addToCart={addToCart} isService />
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
