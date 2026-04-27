import { createContext, useContext } from 'react'

export const ThemeContext = createContext({
  mode: 'system',
  toggleMode: () => {},
  resolvedMode: 'light',
})

export const useThemeMode = () => useContext(ThemeContext)
