import { IconButton, Tooltip } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { useThemeMode } from '../context/appThemeProvider.jsx'

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode()

  return (
    <Tooltip
      title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <IconButton
        onClick={toggleMode}
        size="medium"
        sx={{
          position: 'absolute',
          top: 18,
          right: 18,
          zIndex: 1300,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
          width: 42,
          height: 42,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'primary.light',
            borderColor: 'primary.main',
            transform: 'scale(1.08)',
          },
        }}
      >
        {mode === 'light' ? (
          <DarkMode sx={{ fontSize: 20, color: 'text.primary' }} />
        ) : (
          <LightMode sx={{ fontSize: 20, color: 'warning.main' }} />
        )}
      </IconButton>
    </Tooltip>
  )
}
