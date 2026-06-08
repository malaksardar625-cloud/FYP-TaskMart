import { Box } from '@mui/material'
import { Logo } from '../logo/logo'

export function AuthLayout({ children, wide = false }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
        py: 6,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: wide ? 480 : 440 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Logo />
        </Box>

        {children}
      </Box>
    </Box>
  )
}
