import { alpha } from '@mui/material/styles'

// ─────────────────────────────────────────────────────────────
// homeStyles.js
// All sx / style objects consumed by HomePage.jsx.
// Every value derives from the MUI theme — zero hard-coded colors.
// ─────────────────────────────────────────────────────────────

// ── SHARED KEYFRAMES (inject once via GlobalStyles in App) ────
export const globalKeyframes = `
  @keyframes heroBgZoom {
    from { background-size: 108%; }
    to   { background-size: 122%; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0);    }
    50%      { transform: translateY(-8px); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes perspectiveTilt {
    0%,100% { transform: perspective(800px) rotateX(0deg)   rotateY(0deg);   }
    25%      { transform: perspective(800px) rotateX(2deg)   rotateY(-2deg);  }
    75%      { transform: perspective(800px) rotateX(-2deg)  rotateY(2deg);   }
  }
`

// ── OVERLAY ───────────────────────────────────────────────────
export const darkOverlay = (theme, opacity = 0.82) => ({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  bgcolor: alpha(theme.palette.primary.dark, opacity),
})

// ── SECTION PADDING ───────────────────────────────────────────
export const sectionPad = (isWatch) => ({
  py: isWatch ? 5 : 9,
  px: isWatch ? 1.5 : 0,
})

// ── HERO ──────────────────────────────────────────────────────
export const heroSection = {
  position: 'relative',
  overflow: 'hidden',
  backgroundImage:
    'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80)',
  backgroundSize: '110%',
  backgroundPosition: 'center',
  animation: 'heroBgZoom 14s ease-in-out infinite alternate',
}

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

export const heroContent = {
  animation: 'fadeUp 0.75s ease both',
}

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

// ── STATS BAR ─────────────────────────────────────────────────
export const statsBar = (theme) => ({
  mt: { xs: 5, md: 8 },
  bgcolor: theme.palette.primary.main,
  borderRadius: 3,
  overflow: 'hidden',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.dark, 0.55)}`,
  width: '100%',
})

export const statItem = {
  textAlign: 'center',
  px: { xs: 1, sm: 3 },
  py: { xs: 2, sm: 3 },
  flex: 1, // each cell stretches equally
  borderRight: '1px solid rgba(255,255,255,0.18)',
  '&:last-of-type': { borderRight: 'none' },
}

// ── PARALLAX BG SECTION (products / services) ─────────────────
export const parallaxSection = (imageUrl) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundAttachment: { xs: 'scroll', md: 'fixed' },
})

// ── SECTION HEADER ROW ────────────────────────────────────────
export const sectionContainer = { position: 'relative', zIndex: 1 }

// ── VIEW ALL BUTTON ───────────────────────────────────────────
export const viewAllBtn = (theme) => ({
  color: theme.palette.common.white,
  fontWeight: 700,
  borderRadius: 99,
  px: 2.5,
  transition: 'letter-spacing 0.22s, opacity 0.22s',
  '&:hover': {
    letterSpacing: '0.04em',
    opacity: 0.85,
    bgcolor: 'transparent',
  },
})

// ── COUPON / OFFER STRIP ──────────────────────────────────────
const _strip = (theme, borderColor) => ({
  mt: 5,
  p: { xs: 2, sm: 3 },
  borderRadius: 3,
  bgcolor: alpha(theme.palette.common.white, 0.08),
  border: `1.5px solid ${alpha(borderColor, 0.55)}`,
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexWrap: 'wrap',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'perspective(800px) rotateX(1.5deg) translateY(-3px)',
    boxShadow: `0 16px 40px ${alpha(theme.palette.primary.dark, 0.4)}`,
  },
})

export const couponStrip = (theme) =>
  _strip(theme, theme.palette.secondary?.main ?? theme.palette.primary.light)

export const offerStrip = (theme) => _strip(theme, theme.palette.primary.main)

// ── WHY TASKMART CARD ─────────────────────────────────────────
export const whyCard = (theme, isDark) => ({
  width: '35rem',
  bgcolor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 3,
  p: { xs: 2.5, sm: 3, md: 3.5 },
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
  transformStyle: 'preserve-3d',
  transition:
    'transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease',
  '&:hover': {
    transform:
      'perspective(600px) rotateY(4deg) rotateX(-3deg) translateZ(10px) scale(1.025)',
    boxShadow: isDark
      ? `0 20px 50px ${alpha('#000', 0.55)}`
      : `0 20px 50px ${alpha(theme.palette.primary.dark, 0.22)}`,
    borderColor: alpha(theme.palette.primary.main, 0.45),
  },
})

export const whyIconBox = (theme, isDark, isWatch) => ({
  width: isWatch ? 38 : 50,
  height: isWatch ? 38 : 50,
  borderRadius: 2.5,
  bgcolor: isDark
    ? theme.palette.primary.dark
    : alpha(theme.palette.primary.light, 0.25),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: isWatch ? '1.1rem' : '1.5rem',
  transition: 'transform 0.3s ease',
  '.MuiBox-root:hover &': {
    transform: 'perspective(300px) translateZ(10px) scale(1.12)',
  },
})

// ── CTA BUTTON ────────────────────────────────────────────────
export const ctaBtn = (theme) => ({
  fontWeight: 700,
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  '&:hover': {
    transform: 'perspective(400px) translateZ(8px) scale(1.04)',
    boxShadow: `0 10px 28px ${alpha(theme.palette.primary.dark, 0.45)}`,
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
})
