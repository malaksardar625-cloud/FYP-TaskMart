import { LinearProgress } from '@mui/material'

export function SubmittingBar({ show }) {
  if (!show) return null
  return (
    <LinearProgress
      sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
    />
  )
}
