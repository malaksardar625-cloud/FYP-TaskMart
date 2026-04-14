import { createContext, useContext, useState, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const ThemeContext = createContext({
  mode: 'light',
  toggleMode: () => {},
})

export const useThemeMode = () => useContext(ThemeContext)

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState('light')

  const toggleMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#2563eb',
            dark: '#1d4ed8',
            light: mode === 'light' ? '#eff6ff' : '#1e3a5f',
            contrastText: '#ffffff',
          },
          secondary: { main: '#7c3aed' },
          background: {
            default: mode === 'light' ? '#f1f5f9' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
          text: {
            primary: mode === 'light' ? '#0f172a' : '#f1f5f9',
            secondary: mode === 'light' ? '#64748b' : '#94a3b8',
          },
          divider: mode === 'light' ? '#e2e8f0' : '#334155',
          grey: {
            100: mode === 'light' ? '#f1f5f9' : '#1e293b',
            200: mode === 'light' ? '#e2e8f0' : '#334155',
            300: mode === 'light' ? '#cbd5e1' : '#475569',
            400: mode === 'light' ? '#94a3b8' : '#64748b',
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
    [mode]
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
