import { Paper, Typography } from '@mui/material'

export function AuthCard({ title, subtitle, sx, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
    >
      {title && (
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 0.5 }}
        >
          {subtitle}
        </Typography>
      )}

      {children}
    </Paper>
  )
}
