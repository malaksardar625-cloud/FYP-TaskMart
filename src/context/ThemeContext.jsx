import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const ThemeContext = createContext({
  mode: 'system',
  toggleMode: () => {},
  resolvedMode: 'light',
})

export const useThemeMode = () => useContext(ThemeContext)

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
            main: '#2563eb',
            dark: '#1d4ed8',
            light: resolvedMode === 'light' ? '#eff6ff' : '#1e3a5f',
            contrastText: '#ffffff',
          },
          secondary: { main: '#7c3aed' },
          background: {
            default: resolvedMode === 'light' ? '#f1f5f9' : '#0f172a',
            paper: resolvedMode === 'light' ? '#f8f8ff' : '#1e293b',
          },
          text: {
            primary: resolvedMode === 'light' ? '#0f172a' : '#f1f5f9',
            secondary: resolvedMode === 'light' ? '#64748b' : '#94a3b8',
          },
          divider: resolvedMode === 'light' ? '#e2e8f0' : '#334155',
          grey: {
            100: resolvedMode === 'light' ? '#f1f5f9' : '#1e293b',
            200: resolvedMode === 'light' ? '#e2e8f0' : '#334155',
            300: resolvedMode === 'light' ? '#cbd5e1' : '#475569',
            400: resolvedMode === 'light' ? '#94a3b8' : '#64748b',
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
                    theme.palette.mode === 'light' ? '#f8fafc' : '#0f172a',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563eb',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563eb',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#2563eb' },
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
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
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
                color: '#2563eb',
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
