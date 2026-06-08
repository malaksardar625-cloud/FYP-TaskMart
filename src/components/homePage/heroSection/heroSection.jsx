import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import {
  ArrowForward,
  Security,
  LocalShipping,
  Replay,
  SupportAgent,
} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

import StatsBar from '../statsBar/statsBar'
import {
  heroSection,
  heroGlassCard,
  heroContent,
  heroFeatureCard,
} from './heroSection.Styles'
import { sectionContainer, ctaBtn } from '../../../styles/shared.Styles'

const ABOUT_FEATURES = [
  {
    icon: <Security />,
    title: '100% Secure',
    desc: 'Verified sellers & escrow payments',
  },
  {
    icon: <LocalShipping />,
    title: 'Fast Delivery',
    desc: 'Same-day delivery in major cities',
  },
  {
    icon: <Replay />,
    title: 'Easy Returns',
    desc: '7-day hassle-free returns',
  },
  {
    icon: <SupportAgent />,
    title: '24/7 Support',
    desc: 'Always here to help you',
  },
]

/**
 * Props:
 *   overlay  – sx overlay object
 *   pad      – sx padding object
 *   isWatch  – boolean
 *   isMobile – boolean
 *   onJoin   – click handler
 */
export default function HeroSection({
  overlay,
  pad,
  isWatch,
  isMobile,
  onJoin,
}) {
  const theme = useTheme()

  return (
    <Box sx={{ ...heroSection, ...pad }}>
      <Box sx={overlay} />

      <Container maxWidth="lg" sx={sectionContainer}>
        <Grid
          container
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* Glass rating card */}
          {!isWatch && (
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Box sx={heroGlassCard(theme)}>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 800, color: '#fff', lineHeight: 1 }}
                >
                  4.9★
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.72)', mt: 1 }}
                >
                  Customer Rating
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    height: 4,
                    bgcolor: theme.palette.primary.light,
                    borderRadius: 2,
                    width: 48,
                    mx: 'auto',
                  }}
                />
              </Box>
            </Grid>
          )}

          {/* Headline + features */}
          <Grid size={{ xs: 12, md: isWatch ? 12 : 8 }} sx={heroContent}>
            <Chip
              label="About TaskMart"
              sx={{
                mb: 2,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 700,
              }}
            />

            <Typography
              variant={isWatch ? 'h5' : isMobile ? 'h4' : 'h3'}
              sx={{ fontWeight: 800, color: '#fff', lineHeight: 1.2, mb: 1.5 }}
            >
              Your Complete{' '}
              <Box
                component="span"
                sx={{ color: theme.palette.secondary.light }}
              >
                Digital Marketplace
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.78)',
                mb: 4,
                lineHeight: 1.8,
                maxWidth: 560,
              }}
            >
              TaskMart is Pakistan's fastest-growing platform connecting
              everyday buyers with trusted product sellers and skilled service
              providers. Electronics, furniture, home repair, we've got it all.
            </Typography>

            {/* Feature mini-cards */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {ABOUT_FEATURES.map((f) => (
                <Grid size={{ xs: isWatch ? 12 : 6, sm: 6 }} key={f.title}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: 'start', justifyContent: 'flex-start' }}
                    style={heroFeatureCard(theme)}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.light,
                        fontSize: '1.4rem',
                        mt: 0.1,
                        flexShrink: 0,
                      }}
                    >
                      {f.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: '#fff' }}
                      >
                        {f.title}
                      </Typography>
                      {!isWatch && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(255,255,255,0.65)',
                            lineHeight: 1.5,
                          }}
                        >
                          {f.desc}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              color="primary"
              size={isWatch ? 'small' : 'large'}
              endIcon={!isWatch && <ArrowForward />}
              onClick={onJoin}
              sx={{
                ...ctaBtn(theme),
                px: isWatch ? 2.5 : 5,
                py: isWatch ? 0.8 : 1.5,
                mt: 2,
              }}
            >
              Join Us Now
            </Button>
          </Grid>
        </Grid>

        <StatsBar />
      </Container>
    </Box>
  )
}
