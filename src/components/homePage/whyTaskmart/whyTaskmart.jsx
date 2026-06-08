import { Box, Container, Grid, Typography } from '@mui/material'
import {
  Payments,
  VerifiedUser,
  LocalShipping,
  Gavel,
  AttachMoney,
  PhoneAndroid,
} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { whyCard, whyIconBox } from './whyTaskmart.Styles'

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

/**
 * Props:
 *   pad      – sx padding object
 *   isWatch  – boolean
 *   isMobile – boolean
 *   isDark   – boolean
 *   colSize  – Grid md column span
 */
export default function WhyTaskmart({
  pad,
  isWatch,
  isMobile,
  isDark,
  colSize,
}) {
  const theme = useTheme()

  return (
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
            <Grid
              size={{ xs: 12, sm: 6, md: colSize }}
              key={w.title}
              sx={{ display: 'flex' }}
            >
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
  )
}
