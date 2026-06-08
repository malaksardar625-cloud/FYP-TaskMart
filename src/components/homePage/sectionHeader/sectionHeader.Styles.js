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
