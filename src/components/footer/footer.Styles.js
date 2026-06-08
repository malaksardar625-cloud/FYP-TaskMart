import { alpha } from '@mui/material/styles'

// ── FOOTER ROOT ───────────────────────────────────────────────
export const footerRoot = (theme) => ({
  bgcolor: theme.palette.grey[900],
  color: theme.palette.common.white,
  pt: { xs: 6, md: 10 },
  pb: { xs: 3, md: 5 },
})

// ── BRAND DESCRIPTION ─────────────────────────────────────────
export const footerDesc = (theme) => ({
  mt: 2,
  mb: 3,
  variant: 'body2',
  color: alpha(theme.palette.common.white, 0.55),
  lineHeight: 1.8,
  fontSize: '0.82rem',
})

// ── SOCIAL BUTTON ─────────────────────────────────────────────
export const footerSocialBtn = (theme) => ({
  color: alpha(theme.palette.common.white, 0.6),
  border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  borderRadius: 2,
  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
  '&:hover': {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
    bgcolor: alpha(theme.palette.primary.main, 0.12),
  },
})

// ── COLUMN TITLE ──────────────────────────────────────────────
export const footerColTitle = (theme) => ({
  fontWeight: 700,
  mb: 2,
  color: theme.palette.common.white,
  fontSize: '0.9rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
})

// ── NAV LINK ──────────────────────────────────────────────────
export const footerLink = (theme) => ({
  color: alpha(theme.palette.common.white, 0.55),
  cursor: 'pointer',
  transition: 'color 0.2s, padding-left 0.2s',
  '&:hover': {
    color: theme.palette.primary.light,
    pl: 0.5,
  },
})

// ── CONTACT ROW ───────────────────────────────────────────────
export const footerContactRow = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 1.2,
  mb: 1.5,
}

// ── CONTACT ICON BOX ──────────────────────────────────────────
export const footerContactIcon = (theme) => ({
  mt: '2px',
  flexShrink: 0,
  color: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
})

// ── CONTACT TEXT ──────────────────────────────────────────────
export const footerContactText = (theme) => ({
  color: alpha(theme.palette.common.white, 0.55),
  lineHeight: 1.6,
})

// ── NEWSLETTER LABEL ──────────────────────────────────────────
export const footerNewsletterLabel = (theme) => ({
  display: 'block',
  mb: 1,
  color: alpha(theme.palette.common.white, 0.55),
  fontSize: '0.75rem',
})

// ── NEWSLETTER INPUT ──────────────────────────────────────────
export const footerNewsletterInput = (theme) => ({
  flex: 1,
  px: 1.5,
  py: 0.5,
  borderRadius: 1.5,
  fontSize: '0.82rem',
  color: theme.palette.common.white,
  bgcolor: alpha(theme.palette.common.white, 0.07),
  border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  transition: 'border-color 0.2s, background 0.2s',
  '&:hover': {
    bgcolor: alpha(theme.palette.common.white, 0.11),
    borderColor: alpha(theme.palette.common.white, 0.28),
  },
  '&.Mui-focused': {
    borderColor: theme.palette.primary.light,
    bgcolor: alpha(theme.palette.common.white, 0.11),
  },
  '& input::placeholder': {
    color: alpha(theme.palette.common.white, 0.35),
    opacity: 1,
  },
})

// ── BOTTOM ROW ────────────────────────────────────────────────
export const footerBottomRow = {
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'flex-start', sm: 'center' },
  gap: 1.5,
}

// ── COPYRIGHT TEXT ────────────────────────────────────────────
export const footerCopyright = (theme) => ({
  color: alpha(theme.palette.common.white, 0.38),
})

// ── LEGAL LINK ────────────────────────────────────────────────
export const footerLegalLink = (theme) => ({
  color: alpha(theme.palette.common.white, 0.38),
  cursor: 'pointer',
  transition: 'color 0.2s',
  '&:hover': {
    color: theme.palette.primary.light,
  },
})
