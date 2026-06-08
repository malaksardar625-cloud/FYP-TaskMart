import { alpha } from '@mui/material/styles'

// ── HERO SECTION WRAPPER ──────────────────────────────────────
export const heroSection = {
  position: 'relative',
  overflow: 'hidden',
  backgroundImage:
    'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80)',
  backgroundSize: '100%',
  backgroundPosition: 'center',
  animation: 'heroBgZoom 14s ease-in-out infinite alternate',
}

// ── GLASS RATING CARD ─────────────────────────────────────────
export const heroGlassCard = (theme) => ({
  bgcolor: alpha(theme.palette.common.white, 0.09),
  backdropFilter: 'blur(18px)',
  border: `2.5px solid ${alpha(theme.palette.common.white, 0.22)}`,
  borderRadius: 2,
  p: { xs: 3, md: 5 },
  textAlign: 'center',
  maxWidth: 280,
  width: '100%',
  animation: 'fadeUp 0.85s ease both, floatY 6s ease-in-out infinite',
  animationDelay: '0.1s, 1s',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  '&:hover': {
    transform: 'perspective(600px) rotateY(-6deg) rotateX(3deg) scale(1.04)',
    boxShadow: `0 24px 60px ${alpha('#000', 0.45)}`,
  },
})

// ── HERO CONTENT COLUMN ───────────────────────────────────────
export const heroContent = {
  animation: 'fadeUp 0.75s ease both',
}

// ── FEATURE MINI-CARD ─────────────────────────────────────────
export const heroFeatureCard = (theme) => ({
  p: { xs: 1.5, sm: 2 },
  bgcolor: alpha(theme.palette.common.white, 0.09),
  backdropFilter: 'blur(8px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.16)}`,
  borderRadius: 2.5,
  height: '100%',
  transition: 'background 0.22s, transform 0.3s, box-shadow 0.3s',
  transformStyle: 'preserve-3d',
  '&:hover': {
    bgcolor: alpha(theme.palette.common.white, 0.18),
    transform: 'perspective(500px) translateZ(12px) translateY(-4px)',
    boxShadow: `0 12px 32px ${alpha('#000', 0.35)}`,
  },
})
