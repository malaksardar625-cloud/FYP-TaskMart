import { alpha } from '@mui/material/styles'

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

// ── SECTION CONTAINER ─────────────────────────────────────────
export const sectionContainer = { position: 'relative', zIndex: 1 }

// ── PARALLAX BG SECTION (products / services) ─────────────────
export const parallaxSection = (imageUrl) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundAttachment: { xs: 'scroll', md: 'fixed' },
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
