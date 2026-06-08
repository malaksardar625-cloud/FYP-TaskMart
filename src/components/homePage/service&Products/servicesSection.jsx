import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { FlashOn } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

import SectionHeader from '../sectionHeader/sectionHeader'
import { ItemCard } from '../../itemCard/itemCard'
import {
  parallaxSection,
  sectionContainer,
  ctaBtn,
} from '../../../styles/shared.Styles'
import { offerStrip } from '../../../styles/strips.Styles'

const BG =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80'

/**
 * Props:
 *   overlay   – sx overlay object
 *   pad       – sx padding object
 *   isWatch   – boolean
 *   isMobile  – boolean
 *   colSize   – Grid md column span
 *   services  – array of service objects
 *   loading   – boolean
 *   onViewAll – navigate handler
 *   addToCart – cart context fn
 */
export default function ServicesSection({
  overlay,
  pad,
  isWatch,
  isMobile,
  colSize,
  services,
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
          chip="Hire Experts"
          title="Browse Services"
          subtitle="Top-rated professionals at your doorstep"
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
            {services.map((s) => (
              <Grid
                size={{ xs: 12, sm: 6, md: colSize }}
                key={s._id || s.id}
                sx={{ display: 'flex' }}
              >
                <Box sx={{ width: '100%' }}>
                  <ItemCard item={s} addToCart={addToCart} isService />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Offer strip */}
        <Box sx={offerStrip(theme)}>
          <FlashOn
            sx={{
              color: theme.palette.primary.light,
              fontSize: isWatch ? 20 : 28,
              flexShrink: 0,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              variant={isWatch ? 'caption' : 'body2'}
              sx={{ fontWeight: 600, color: '#fff' }}
            >
              ⚡ New providers get{' '}
              <Box
                component="span"
                sx={{ color: theme.palette.primary.light, fontWeight: 800 }}
              >
                50% commission discount
              </Box>{' '}
              for first 3 months!
            </Typography>

            {!isWatch && (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.62)',
                  display: 'block',
                  mt: 0.4,
                }}
              >
                Register as a Service Provider today · Limited offer · Use code
                NEWPRO50
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            color="primary"
            size={isWatch ? 'small' : 'medium'}
            sx={ctaBtn(theme)}
          >
            {isWatch ? 'Join' : 'Become a Provider'}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
