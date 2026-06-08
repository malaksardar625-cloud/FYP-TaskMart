import { alpha } from '@mui/material/styles'

// ── SHARED STRIP BASE ─────────────────────────────────────────
const stripBase = (theme, borderColor) => ({
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

// ── COUPON STRIP (products section) ──────────────────────────
export const couponStrip = (theme) =>
  stripBase(theme, theme.palette.secondary?.main ?? theme.palette.primary.light)

// ── OFFER STRIP (services section) ───────────────────────────
export const offerStrip = (theme) =>
  stripBase(theme, theme.palette.primary.main)
