import { alpha } from '@mui/material/styles'

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
  transition: 'transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease',
  '&:hover': {
    transform:
      'perspective(600px) rotateY(4deg) rotateX(-3deg) translateZ(10px) scale(1.025)',
    boxShadow: isDark
      ? `0 20px 50px ${alpha('#000', 0.55)}`
      : `0 20px 50px ${alpha(theme.palette.primary.dark, 0.22)}`,
    borderColor: alpha(theme.palette.primary.main, 0.45),
  },
})

// ── WHY TASKMART ICON BOX ─────────────────────────────────────
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
