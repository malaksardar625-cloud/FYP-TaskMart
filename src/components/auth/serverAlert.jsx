import { Alert } from '@mui/material'

export function ServerAlert({ message, severity = 'error', sx }) {
  if (!message) return null

  return (
    <Alert severity={severity} sx={{ mt: 2, ...sx }}>
      {message}
    </Alert>
  )
}
