import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  GlobalStyles,
} from '@mui/material'
import {
  Security,
  LocalShipping,
  Replay,
  SupportAgent,
  Payments,
  VerifiedUser,
  Gavel,
  AttachMoney,
  PhoneAndroid,
  ArrowForward,
  FlashOn,
  LocalOffer,
} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

import { ItemCard, Footer } from '../../components/shared.jsx'
import { Navbar } from '../../components/Navbar.jsx'
import productsData from '../../mockData/Products.json'
import servicesData from '../../mockData/services.json'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../../hooks/useResponsive.js'
import { useCountUp } from '../../hooks/useCountUp.js'

import {
  globalKeyframes,
  darkOverlay,
  sectionPad,
  heroSection,
  heroGlassCard,
  heroContent,
  heroFeatureCard,
  statsBar,
  statItem,
  parallaxSection,
  sectionContainer,
  viewAllBtn,
  couponStrip,
  offerStrip,
  whyCard,
  whyIconBox,
  ctaBtn,
} from './homePage.Styles.js'

// ── STATIC DATA ───────────────────────────────────────────────

const STATS = [
  { label: 'Active Users', end: 50, suffix: 'K+' },
  { label: 'Products Listed', end: 120, suffix: 'K+' },
  { label: 'Service Providers', end: 8, suffix: 'K+' },
  { label: 'Orders Completed', end: 200, suffix: 'K+' },
]

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

const WHY_CARDS = [
  {
    icon: <Payments />,
    title: 'Secure Payments',
    desc: 'All transactions protected with bank-grade encryption and escrow.',
  },
  {
    icon: <VerifiedUser />,
    title: 'Verified Sellers',
    desc: 'Every seller goes through identity & quality verification before listing.',
  },
  {
    icon: <LocalShipping />,
    title: 'Fast Shipping',
    desc: 'Nationwide delivery with real-time tracking and delivery guarantee.',
  },
  {
    icon: <Gavel />,
    title: 'Dispute Resolution',
    desc: 'Our team resolves disputes fairly within 48 hours, always.',
  },
  {
    icon: <AttachMoney />,
    title: 'Best Prices',
    desc: 'Price match guarantee and exclusive TaskMart-only deals every day.',
  },
  {
    icon: <PhoneAndroid />,
    title: 'Mobile Ready',
    desc: 'Manage everything from your phone with our Android & iOS apps.',
  },
]

// ── STAT ITEM ─────────────────────────────────────────────────

function StatItem({ stat }) {
  const { count, ref } = useCountUp(stat.end)
  const { isWatch } = useResponsive()
  const theme = useTheme()

  return (
    <Box ref={ref} sx={statItem}>
      <Typography
        variant={isWatch ? 'h6' : 'h4'}
        sx={{
          fontWeight: 800,
          color: theme.palette.primary.contrastText,
          lineHeight: 1,
        }}
      >
        {count}
        {stat.suffix}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.primary.contrastText,
          opacity: 0.72,
          display: 'block',
          mt: 0.4,
        }}
      >
        {stat.label}
      </Typography>
    </Box>
  )
}

// ── SECTION HEADER ─────────────────────────────────────────────

function SectionHeader({
  chip,
  title,
  subtitle,
  onViewAll,
  isWatch,
  isMobile,
  light = false,
}) {
  const theme = useTheme()
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      mb={5}
      gap={2}
    >
      <Box>
        <Chip
          label={chip}
          sx={{
            mb: 1.5,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
          }}
        />
        <Typography
          variant={isWatch ? 'h6' : isMobile ? 'h5' : 'h4'}
          sx={{
            fontWeight: 800,
            color: light ? '#fff' : theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            mb: 2,
            lineHeight: 1.7,
            color: light
              ? 'rgba(255,255,255,0.70)'
              : theme.palette.text.secondary,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
      <Button
        variant="text"
        endIcon={<ArrowForward />}
        onClick={onViewAll}
        disableRipple
        sx={viewAllBtn(theme)}
      >
        {isWatch ? 'All' : 'View All'}
      </Button>
    </Stack>
  )
}

// ── HOME PAGE ─────────────────────────────────────────────────

export default function HomePage({ setPage, addToCart }) {
  const navigate = useNavigate()
  const theme = useTheme()
  const { isWatch, isMobile, isDark } = useResponsive()
  const overlay = darkOverlay(theme, isDark ? 0.88 : 0.78)
  const pad = sectionPad(isWatch)

  const colProps = (xs = 12, sm = 6, md = 4) => ({
    item: true,
    xs: isWatch ? 12 : xs,
    sm,
    md,
    sx: { display: 'flex' },
  })

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {/* Inject global keyframes once */}
      <GlobalStyles styles={globalKeyframes} />

      {/* ── Navbar ─────────────────────────────────────── */}
      <Navbar setPage={setPage} />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <Box sx={{ ...heroSection, ...pad }}>
        <Box sx={overlay} />

        <Container maxWidth="lg" sx={sectionContainer}>
          <Grid size={12} alignItems="center" justifyContent="center">
            {/* Glass rating card */}
            {!isWatch && (
              <Grid
                item
                xs={12}
                md={4}
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
            <Grid item xs={12} md={isWatch ? 12 : 8} sx={heroContent}>
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
                sx={{
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.2,
                  mb: 1.5,
                }}
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
                providers. Electronics, furniture, home repair — we've got it
                all.
              </Typography>

              {/* Feature mini-cards */}
              <Grid container spacing={2} mb={4}>
                {ABOUT_FEATURES.map((f) => (
                  <Grid item xs={isWatch ? 12 : 6} sm={6} key={f.title}>
                    <Stack
                      direction="row"
                      gap={1.5}
                      alignItems="flex-start"
                      sx={heroFeatureCard(theme)}
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
                onClick={() => navigate('/signup')}
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

          {/* Stats bar */}
          <Box sx={statsBar(theme)}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              {STATS.map((s) => (
                <StatItem key={s.label} stat={s} />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════════════ */}
      <Box
        sx={{
          ...parallaxSection(
            'https://kerisys.com/wp-content/uploads/2023/07/AdobeStock_603529245-scaled.jpeg'
          ),
          ...pad,
        }}
      >
        <Box sx={overlay} />
        <Container maxWidth="xl" sx={sectionContainer}>
          <SectionHeader
            chip="Shop Now"
            title="Browse Products"
            subtitle="Discover the best deals on our wide range of products"
            onViewAll={() => navigate('/products')}
            isWatch={isWatch}
            isMobile={isMobile}
            light
          />

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {productsData.slice(0, isWatch ? 2 : 6).map((p) => (
              <Grid {...colProps()} key={p.id}>
                <Box sx={{ width: '100%' }}>
                  <ItemCard item={p} addToCart={addToCart} />
                </Box>
              </Grid>
            ))}
          </Grid>

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
                  Valid for orders above PKR 5,000 · New users only · Expires
                  June 30
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

      {/* ══════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════ */}
      <Box
        sx={{
          ...parallaxSection(
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80'
          ),
          ...pad,
        }}
      >
        <Box sx={overlay} />
        <Container maxWidth="xl" sx={sectionContainer}>
          <SectionHeader
            chip="Hire Experts"
            title="Browse Services"
            subtitle="Top-rated professionals at your doorstep"
            onViewAll={() => navigate('/services')}
            isWatch={isWatch}
            isMobile={isMobile}
            light
          />

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {servicesData.slice(0, isWatch ? 2 : 6).map((s) => (
              <Grid {...colProps()} key={s.id}>
                <Box sx={{ width: '100%' }}>
                  <ItemCard item={s} addToCart={addToCart} isService />
                </Box>
              </Grid>
            ))}
          </Grid>

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
                  Register as a Service Provider today · Limited offer · Use
                  code NEWPRO50
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

      {/* ══════════════════════════════════════════════════
          WHY TASKMART
      ══════════════════════════════════════════════════ */}
      <Box sx={{ ...pad, bgcolor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 7 } }}>
            <Typography
              variant={isWatch ? 'h6' : isMobile ? 'h5' : 'h4'}
              sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1 }}
            >
              Why Choose TaskMart?
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              Everything you need, nothing you don't
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {WHY_CARDS.map((w) => (
              <Grid {...colProps()} key={w.title}>
                <Box sx={whyCard(theme, isDark)}>
                  <Box sx={whyIconBox(theme, isDark, isWatch)}>{w.icon}</Box>
                  <Typography
                    variant={isWatch ? 'body2' : 'subtitle1'}
                    sx={{ fontWeight: 700, color: theme.palette.text.primary }}
                  >
                    {w.title}
                  </Typography>
                  {!isWatch && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                      }}
                    >
                      {w.desc}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
