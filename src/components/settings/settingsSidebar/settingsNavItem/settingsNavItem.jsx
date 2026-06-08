import { Box, Typography } from '@mui/material'

export function SettingsNavItem({ icon, label, active, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: '8px 10px',
        borderRadius: 1,
        cursor: 'pointer',
        transition: '0.2s',

        backgroundColor: active ? 'rgba(25, 118, 210, 0.12)' : 'transparent',

        '&:hover': {
          backgroundColor: active
            ? 'rgba(25, 118, 210, 0.18)'
            : 'rgba(0,0,0,0.04)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          color: active ? 'primary.main' : 'text.secondary',
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="body2"
        fontWeight={active ? 600 : 400}
        color={active ? 'primary.main' : 'text.secondary'}
      >
        {label}
      </Typography>
    </Box>
  )
}
