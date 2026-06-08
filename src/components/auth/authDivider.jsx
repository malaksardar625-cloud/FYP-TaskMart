import { Divider, Typography } from '@mui/material'

export function AuthDivider({ label = 'or', sx }) {
  return (
    <Divider sx={{ my: 2.5, ...sx }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Divider>
  )
}
