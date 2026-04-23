import { Margin } from '@mui/icons-material'
import { alpha } from '@mui/material/styles'

// ── HERO ─────────────────────────────────────────────────────
export const heroSection = (theme) => ({
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg,
      rgba(10,15,30,0.90) 0%,
      ${alpha(theme.palette.primary.dark, 0.78)} 60%,
      rgba(10,15,30,0.72) 100%)`,
    zIndex: 0,
  },
})

export const heroContainer = {
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  pt: 8,
}

export const heroChip = (theme) => ({
  mb: 3,
  bgcolor: alpha(theme.palette.secondary.main, 0.15),
  color: theme.palette.secondary.main,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
  fontWeight: 700,
})

export const heroHeading = {
  color: 'common.white',
  fontSize: { xs: '2.4rem', md: '3.8rem' },
  mb: 2,
  lineHeight: 1.1,
}

export const heroHeadingAccent = { color: 'secondary.main' }

export const heroSubtitle = {
  color: 'rgba(255,255,255,0.80)',
  fontSize: '1.15rem',
  mb: 4,
  maxWidth: 560,
  mx: 'auto',
  lineHeight: 1.7,
}

export const heroOutlinedBtn = {
  px: 4,
  py: 1.5,
  color: 'common.white',
  borderColor: 'rgba(255,255,255,0.5)',
  fontSize: '1rem',
  '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' },
}

export const heroStatCard = (theme) => ({
  bgcolor: alpha(theme.palette.common.white, 0.1),
  backdropFilter: 'blur(8px)',
  borderRadius: 2.5,
  p: 2.5,
  border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
})

export const heroStatValue = { color: 'secondary.main', fontWeight: 800 }

export const heroStatLabel = {
  color: 'rgba(255,255,255,0.80)',
  fontSize: '0.85rem',
}

// ── ABOUT ─────────────────────────────────────────────────────
export const aboutSection = (theme) => ({
  py: 9,
  position: 'relative',
  backgroundImage: `url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg,
      rgba(10,15,30,0.92) 0%,
      ${alpha(theme.palette.primary.dark, 0.84)} 60%,
      rgba(10,15,30,0.82) 100%)`,
    zIndex: 0,
  },
})

export const aboutContainer = { position: 'relative', zIndex: 1 }

export const aboutImageWrapper = {
  borderRadius: 4,
  overflow: 'hidden',
  boxShadow: 8,
  border: '2px solid rgba(255,255,255,0.15)',
}

export const aboutRatingBadge = {
  position: 'absolute',
  bottom: -20,
  right: -20,
  bgcolor: 'secondary.main',
  borderRadius: 3,
  p: 2.5,
  boxShadow: 4,
  color: 'secondary.contrastText',
}

export const aboutChip = (theme) => ({
  mb: 2,
  fontWeight: 700,
  bgcolor: alpha(theme.palette.secondary.main, 0.15),
  color: theme.palette.secondary.main,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
})

export const aboutHeading = { mb: 2, lineHeight: 1.2, color: 'common.white' }

export const aboutHeadingAccent = { color: 'secondary.main' }

export const aboutBody = {
  color: 'rgba(255,255,255,0.75)',
  mb: 3,
  lineHeight: 1.8,
  fontSize: '1.05rem',
}

export const aboutFeatureCard = (theme) => ({
  bgcolor: alpha(theme.palette.common.white, 0.08),
  borderRadius: 2,
  p: 1.5,
  border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
  backdropFilter: 'blur(6px)',
})

export const aboutFeatureTitle = { fontWeight: 700, color: 'common.white' }

export const aboutFeatureDesc = { color: 'rgba(255,255,255,0.60)' }

// ── PRODUCTS ──────────────────────────────────────────────────
export const productsSection = (theme) => ({
  py: 8,
  position: 'relative',
  backgroundImage: `url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(160deg,
      rgba(10,25,41,0.93) 0%,
      ${alpha(theme.palette.primary.dark, 0.88)} 100%)`,
    zIndex: 0,
  },
})

// shared by products + services sections
export const sectionContainer = { position: 'relative', zIndex: 1 }

export const sectionHeading = { fontWeight: 800, color: 'common.white' }

export const sectionSubtitle = { color: 'rgba(255,255,255,0.65)', mt: 0.5 }

export const sectionViewAllBtn = (theme) => ({
  color: 'common.white',
  borderColor: alpha(theme.palette.common.white, 0.4),
  '&:hover': {
    borderColor: 'common.white',
    bgcolor: alpha(theme.palette.common.white, 0.08),
    Margin: '0 4px',
  },
})

export const couponStrip = (theme) => ({
  mt: 5,
  p: 3,
  borderRadius: 3,
  bgcolor: alpha(theme.palette.common.white, 0.08),
  border: `1.5px solid ${alpha(theme.palette.secondary.main, 0.55)}`,
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexWrap: 'wrap',
})

export const couponText = { fontWeight: 700, color: 'common.white' }

export const couponCode = { color: 'secondary.main', fontFamily: 'monospace' }

export const couponCaption = { color: 'rgba(255,255,255,0.55)' }

// ── SERVICES ──────────────────────────────────────────────────
export const servicesSection = (theme) => ({
  py: 8,
  position: 'relative',
  backgroundImage: `url(https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(160deg,
      rgba(10,25,41,0.93) 0%,
      ${alpha(theme.palette.primary.dark, 0.88)} 100%)`,
    zIndex: 0,
  },
})

export const offerStrip = (theme) => ({
  mt: 5,
  p: 3,
  borderRadius: 3,
  bgcolor: alpha(theme.palette.common.white, 0.08),
  border: `1.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexWrap: 'wrap',
})

export const offerText = { fontWeight: 700, color: 'common.white' }

export const offerAccent = { color: 'primary.light' }

export const offerCaption = { color: 'rgba(255,255,255,0.55)' }

// ── WHY TASKMART ──────────────────────────────────────────────
export const whySection = (theme) => ({
  background: `linear-gradient(135deg,
    ${theme.palette.primary.dark} 0%,
    ${theme.palette.primary.main} 100%)`,
  py: 9,
})

export const whyHeading = { color: 'common.white', textAlign: 'center', mb: 1 }

export const whySubtitle = {
  color: 'rgba(255,255,255,0.65)',
  textAlign: 'center',
  mb: 6,
}

export const whyCard = (theme) => ({
  bgcolor: alpha(theme.palette.common.white, 0.07),
  borderRadius: 3,
  p: 3,
  border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
  height: '100%',
  transition: 'all .2s',
  '&:hover': {
    bgcolor: alpha(theme.palette.common.white, 0.12),
    transform: 'translateY(-2px)',
  },
})

export const whyCardTitle = { color: 'common.white', mb: 1 }

export const whyCardDesc = {
  color: 'rgba(255,255,255,0.65)',
  fontSize: '0.9rem',
  lineHeight: 1.7,
}
