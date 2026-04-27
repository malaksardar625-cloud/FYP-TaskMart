import { useState, useMemo, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeContext } from './themeContext.js'
import CssBaseline from '@mui/material/CssBaseline'

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState('system')

  // Detect OS preference
  const getSystemPreference = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const [systemPreference, setSystemPreference] = useState(getSystemPreference)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => setSystemPreference(e.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const resolvedMode = mode === 'system' ? systemPreference : mode

  const toggleMode = (value) => setMode(value)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedMode,
          primary: {
            main: '#235347',
            dark: '#163B32',
            light: resolvedMode === 'light' ? '#DAF1DE' : '#0B2B26',
            contrastText: '#DAF1DE',
          },
          secondary: { main: '#8EB69B' },
          background: {
            default: resolvedMode === 'light' ? '#DAF1DE' : '#051F20',
            paper: resolvedMode === 'light' ? '#ffffff' : '#0B2B26',
          },
          text: {
            primary: resolvedMode === 'light' ? '#051F20' : '#DAF1DE',
            secondary: resolvedMode === 'light' ? '#235347' : '#8EB69B',
          },
          divider: resolvedMode === 'light' ? '#8EB69B' : '#163B32',
          grey: {
            100: resolvedMode === 'light' ? '#DAF1DE' : '#0B2B26',
            200: resolvedMode === 'light' ? '#8EB69B' : '#163B32',
            300: resolvedMode === 'light' ? '#235347' : '#8EB69B',
            400: resolvedMode === 'light' ? '#163B32' : '#DAF1DE',
          },
        },
        typography: {
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          h5: { fontWeight: 700, letterSpacing: '-0.3px' },
        },
        shape: { borderRadius: 10 },
        components: {
          MuiTextField: {
            defaultProps: { variant: 'outlined', size: 'medium' },
            styleOverrides: {
              root: ({ theme }) => ({
                '& .MuiOutlinedInput-root': {
                  borderRadius: 10,
                  backgroundColor:
                    theme.palette.mode === 'light' ? '#DAF1DE' : '#051F20',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#235347',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#235347',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#235347' },
              }),
            },
          },
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                borderRadius: 10,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '11px 24px',
              },
              containedPrimary: {
                background: 'linear-gradient(135deg, #235347 0%, #64748b 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #163B32 0%, #64748b 100%)',
                },
                '&.Mui-disabled': { background: '#334155', color: '#64748b' },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              },
            },
          },
          MuiAlert: { styleOverrides: { root: { borderRadius: 10 } } },
          MuiChip: { styleOverrides: { root: { borderRadius: 8 } } },
          MuiLink: {
            styleOverrides: {
              root: {
                color: '#235347',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              },
            },
          },
        },
      }),
    [resolvedMode]
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, resolvedMode }}>
      {' '}
      {/* ← added resolvedMode */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
