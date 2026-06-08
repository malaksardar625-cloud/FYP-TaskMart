export const logoWrapper = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
  cursor: 'pointer',
  flexShrink: 0,
  userSelect: 'none',
}

export const logoIconBox = {
  width: 36,
  height: 36,
  borderRadius: 2,
  bgcolor: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 2,
}

export const logoText = {
  fontWeight: 800,
  letterSpacing: '-0.5px',
  display: { xs: 'none', sm: 'block' },
  color: 'text.primary',
  fontSize: '1.2rem',
}

export const logoAccent = { color: 'primary.main' }
