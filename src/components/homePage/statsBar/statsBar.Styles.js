import { alpha } from '@mui/material/styles'

// ── STATS BAR WRAPPER ─────────────────────────────────────────
export const statsBar = (theme) => ({
  mt: { xs: 5, md: 8, mt: 6 },
  bgcolor: theme.palette.primary.main,
  borderRadius: 3,
  overflow: 'hidden',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.dark, 0.55)}`,
  width: '100%',
})

// ── INDIVIDUAL STAT CELL ──────────────────────────────────────
export const statItem = {
  textAlign: 'center',
  px: { xs: 1, sm: 3 },
  py: { xs: 2, sm: 3 },
  flex: 1,
  borderRight: '1px solid rgba(255,255,255,0.18)',
  '&:last-of-type': { borderRight: 'none' },
}
