export const chatHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 2,
  py: 1.5,
  bgcolor: 'background.paper',
  borderBottom: '1px solid',
  borderColor: 'divider',
  flexShrink: 0,
}

export const avatarWrapper = {
  position: 'relative',
  flexShrink: 0,
}

export const chatHeaderAvatar = {
  width: 42,
  height: 42,
  bgcolor: 'primary.main',
  fontSize: '0.85rem',
  fontWeight: 700,
}

export const onlineDot = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  bgcolor: '#44c767',
  border: '2px solid',
  borderColor: 'background.paper',
  position: 'absolute',
  bottom: 2,
  right: 2,
}

export const chatHeaderName = {
  fontWeight: 700,
  fontSize: '0.95rem',
  color: 'text.primary',
  lineHeight: 1.2,
}

export const chatHeaderStatus = {
  fontSize: '0.75rem',
  color: 'text.secondary',
  lineHeight: 1,
}

export const chatHeaderStatusOnline = {
  fontSize: '0.75rem',
  color: '#44c767',
  fontWeight: 600,
  lineHeight: 1,
}

export const chatHeaderActions = {
  ml: 'auto',
  display: 'flex',
  gap: 0.5,
}

export const chatHeaderBtn = {
  color: 'text.secondary',
  '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
}

export const mobileBackBtn = {
  display: { xs: 'flex', md: 'none' },
  color: 'text.secondary',
  mr: 0.5,
}
