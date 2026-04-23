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
  Security,
  LocalShipping,
  Replay,
  SupportAgent,
  Payments,
  VerifiedUser,
  Inventory,
  Gavel,
  AttachMoney,
  PhoneAndroid,
} from '@mui/icons-material'
import { ArrowForward, FlashOn, LocalOffer } from '@mui/icons-material'

import { ItemCard, Footer, PAGES } from '../../components/shared.jsx'
import productsData from '../../mockData/Products.json'
import servicesData from '../../mockData/services.json'
import * as S from './homepage.styles.js'
import { Navbar } from '../../components/Navbar.jsx'
import { useNavigate } from 'react-router-dom'

// ── STATIC DATA ───────────────────────────────────────────────

const STATS = [
  { label: 'Active Users', value: '50K+' },
  { label: 'Products Listed', value: '120K+' },
  { label: 'Service Providers', value: '8K+' },
  { label: 'Orders Completed', value: '200K+' },
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
    desc: '7-day hassle-free returns'
  },
  { 
    icon: <SupportAgent />,
    title: '24/7 Support',
    desc: 'Always here to help you'
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

// ── COMPONENT ─────────────────────────────────────────────────

export default function HomePage({ setPage, addToCart }) {
  const navigate = useNavigate()
  return (
    <Box>
      {/* ── Navbar ──────────────────────────────────────────── */}
      <Navbar setPage={setPage} />

      {/* ── HERO/ About Section ──────────────────────────────────────────── */}
      <Box sx={S.aboutSection}>
        <Container maxWidth="lg" sx={S.aboutContainer}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={S.aboutImageWrapper}>
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
                    sx={{ width: '75%', display: 'block' }}
                  />
                </Box>
                <Box sx={S.aboutRatingBadge}>
                  <Typography variant="h2" sx={{ fontWeight: 500 }}>
                    4.9★
                  </Typography>
                  <Typography variant="caption">Customer Rating</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Chip label="About TaskMart" sx={S.aboutChip} />
              <Typography variant="h3" sx={S.aboutHeading}>
                Your Complete
                <br />
                <Box component="span" sx={S.aboutHeadingAccent}>
                  Digital Marketplace
                </Box>
              </Typography>
              <Typography sx={S.aboutBody}>
                TaskMart is Pakistan's fastest-growing platform connecting
                everyday buyers with trusted product sellers and skilled service
                providers. Whether you need the latest electronics, home
                furniture, or a professional for home repair — we've got it all.
              </Typography>

              <Grid container spacing={2} mb={3}>
                {ABOUT_FEATURES.map((f) => (
                  <Grid item xs={6} key={f.title}>
                    <Stack
                      direction="row"
                      gap={1.5}
                      alignItems="flex-start"
                      sx={S.aboutFeatureCard}
                    >
                      <Box sx={{ fontSize: '1.4rem', mt: 0.2 }}>{f.icon}</Box>
                      <Box>
                        <Typography variant="body2" sx={S.aboutFeatureTitle}>
                          {f.title}
                        </Typography>
                        <Typography variant="caption" sx={S.aboutFeatureDesc}>
                          {f.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForward />}
                sx={{ px: 4 }}
              >
                Join Us Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── PRODUCTS ──────────────────────────────────────── */}
      <Box sx={S.productsSection}>
        <Container maxWidth="xl" sx={S.sectionContainer}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Box>
              <Chip
                label="Shop Now"
                color="secondary"
                sx={{ mb: 1, fontWeight: 700 }}
              />
              <Typography variant="h3" sx={S.sectionHeading}>
                Browse Products
              </Typography>
              <Typography sx={S.sectionSubtitle, { mb: 2 }}>
                Discover the best deals on our wide range of products
              </Typography>
            </Box>
            <Button
              endIcon={<ArrowForward />}
              onClick={() => navigate('/products')}
              sx={S.sectionViewAllBtn}
            ></Button>
          </Stack>

          <Grid container spacing={3}>
            {productsData.slice(0, 6).map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <ItemCard item={p} addToCart={addToCart} />
              </Grid>
            ))}
          </Grid>

          <Box sx={S.couponStrip}>
            <LocalOffer sx={{ color: 'secondary.main', fontSize: 28 }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={S.couponText}>
                🎉 Use code{' '}
                <Box component="span" sx={S.couponCode}>
                  TASKMART10
                </Box>{' '}
                for 10% off your first order!
              </Typography>
              <Typography variant="caption" sx={S.couponCaption}>
                Valid for orders above PKR 5,000 · New users only · Expires June
                30
              </Typography>
            </Box>
            <Button variant="contained" color="secondary" size="small">
              Claim Offer
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <Box sx={S.servicesSection}>
        <Container maxWidth="xl" sx={S.sectionContainer}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Box>
              <Chip
                label="Hire Experts"
                color="primary"
                sx={{ mb: 1, fontWeight: 700 }}
              />
              <Typography variant="h3" sx={S.sectionHeading}>
                Browse Services
              </Typography>
              <Typography sx={S.sectionSubtitle, { mb: 2 }}>
                Top-rated professionals at your doorstep
              </Typography>
            </Box>
            <Button
              endIcon={<ArrowForward />}
              onClick={() => navigate('/services')}
              sx={S.sectionViewAllBtn}
            ></Button>
          </Stack>

          <Grid container spacing={3}>
            {servicesData.slice(0, 6).map((s) => (
              <Grid item xs={12} sm={6} md={4} key={s.id}>
                <ItemCard item={s} addToCart={addToCart} isService />
              </Grid>
            ))}
          </Grid>

          <Box sx={S.offerStrip}>
            <FlashOn sx={{ color: 'primary.light', fontSize: 28 }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={S.offerText}>
                ⚡ New providers get{' '}
                <Box component="span" sx={S.offerAccent}>
                  50% commission discount
                </Box>{' '}
                for first 3 months!
              </Typography>
              <Typography variant="caption" sx={S.offerCaption}>
                Register as a Service Provider today · Limited offer · Use code
                NEWPRO50
              </Typography>
            </Box>
            <Button variant="contained" color="primary" size="small">
              Become a Provider
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── WHY TASKMART ──────────────────────────────────── */}
      <Box sx={S.whySection}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={S.whyHeading}>
            Why Choose TaskMart?
          </Typography>
          <Typography sx={S.whySubtitle}>
            Everything you need, nothing you don't
          </Typography>
          <Grid container spacing={3}>
            {WHY_CARDS.map((w) => (
              <Grid item xs={12} sm={6} md={4} key={w.title}>
                <Box sx={S.whyCard}>
                  <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>
                    {w.icon}
                  </Typography>
                  <Typography variant="h6" sx={S.whyCardTitle}>
                    {w.title}
                  </Typography>
                  <Typography sx={S.whyCardDesc}>{w.desc}</Typography>
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
