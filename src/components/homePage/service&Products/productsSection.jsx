import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { LocalOffer } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

import SectionHeader from '../sectionHeader/sectionHeader'
import { ItemCard } from '../../itemCard/itemCard'
import {
  parallaxSection,
  sectionContainer,
  ctaBtn,
} from '../../../styles/shared.Styles'
import { couponStrip } from '../../../styles/strips.Styles'

const BG =
  'https://kerisys.com/wp-content/uploads/2023/07/AdobeStock_603529245-scaled.jpeg'

/**
 * Props:
 *   overlay   – sx overlay object
 *   pad       – sx padding object
 *   isWatch   – boolean
 *   isMobile  – boolean
 *   colSize   – Grid md column span
 *   products  – array of product objects
 *   loading   – boolean
 *   onViewAll – navigate handler
 *   addToCart – cart context fn
 */
export default function ProductsSection({
  overlay,
  pad,
  isWatch,
  isMobile,
  colSize,
  products,
  loading,
  onViewAll,
  addToCart,
}) {
  const theme = useTheme()

  return (
    <Box sx={{ ...parallaxSection(BG), ...pad }}>
      <Box sx={overlay} />

      <Container maxWidth="xl" sx={sectionContainer}>
        <SectionHeader
          chip="Shop Now"
          title="Browse Products"
          subtitle="Discover the best deals on our wide range of products"
          onViewAll={onViewAll}
          isWatch={isWatch}
          isMobile={isMobile}
          light
        />

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 4,
              width: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {products.map((p) => (
              <Grid
                size={{ xs: 12, sm: 6, md: colSize }}
                key={p._id || p.id}
                sx={{ display: 'flex' }}
              >
                <Box sx={{ width: '100%' }}>
                  <ItemCard item={p} addToCart={addToCart} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Coupon strip */}
        <Box sx={couponStrip(theme)}>
          <LocalOffer
            sx={{
              color: theme.palette.primary.main,
              fontSize: isWatch ? 20 : 28,
              flexShrink: 0,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              variant={isWatch ? 'caption' : 'body2'}
              sx={{ fontWeight: 600, color: theme.palette.text.primary }}
            >
              🎉 Use code{' '}
              <Box
                component="span"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  px: 1,
                  py: 0.2,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontWeight: 800,
                }}
              >
                TASKMART10
              </Box>{' '}
              for 10% off your first order!
            </Typography>

            {!isWatch && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  display: 'block',
                  mt: 0.4,
                }}
              >
                Valid for orders above PKR 5,000 · New users only · Expires June
                30
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            color="primary"
            size={isWatch ? 'small' : 'medium'}
            sx={ctaBtn(theme)}
          >
            Claim Offer
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
