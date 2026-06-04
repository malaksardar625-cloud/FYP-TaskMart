import { Box, Stack, Typography, Grid } from '@mui/material'
import { LocalOffer } from '@mui/icons-material'
import couponsData from '../mockData/coupons.json'

export function CouponBanner() {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 2,
        p: 3,
        borderRadius: 3,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 2, mb: 2 }}>
        <LocalOffer sx={{ color: 'secondary.main', fontSize: 32 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Active Coupons & Offers
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {couponsData.map((coupon) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={coupon.code}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.12)',
                borderRadius: 2,
                p: 2,
                border: '1.5px dashed rgba(255,255,255,0.3)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: 'secondary.main',
                  letterSpacing: 1,
                }}
              >
                {coupon.code}
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {coupon.discount}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Min. order: PKR {coupon.minOrder.toLocaleString()}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: 'block', opacity: 0.65 }}
              >
                Valid till: {coupon.validUntil}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
