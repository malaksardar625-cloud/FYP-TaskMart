import { alpha } from '@mui/material/styles'

export const emptyState = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  color: 'text.secondary',
  p: 4,
}

export const emptyStateIcon = (theme) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  bgcolor: alpha(theme.palette.primary.main, 0.08),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 1,
})
