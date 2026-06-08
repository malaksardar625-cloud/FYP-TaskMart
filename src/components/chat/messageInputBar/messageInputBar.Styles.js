export const inputBar = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: 1,
  px: 2,
  py: 1.5,
  bgcolor: 'background.paper',
  borderTop: '1px solid',
  borderColor: 'divider',
  flexShrink: 0,
}

export const inputWrapper = (theme) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'flex-end',
  border: `1.5px solid ${theme.palette.divider}`,
  borderRadius: 3,
  bgcolor: 'background.default',
  px: 1.5,
  py: 0.75,
  '&:focus-within': { borderColor: theme.palette.primary.main },
})

export const messageInput = {
  flex: 1,
  fontSize: '0.9rem',
  color: 'text.primary',
  resize: 'none',
  maxHeight: 120,
  lineHeight: 1.5,
  '& ::placeholder': { color: 'text.disabled' },
}

export const attachBtn = {
  color: 'text.secondary',
  '&:hover': { color: 'primary.main' },
  flexShrink: 0,
  mb: 0.25,
}

export const sendBtn = (hasText) => ({
  width: 44,
  height: 44,
  bgcolor: hasText ? 'primary.main' : 'action.disabledBackground',
  color: hasText ? 'primary.contrastText' : 'text.disabled',
  borderRadius: 2,
  flexShrink: 0,
  transition: 'all 0.2s',
  '&:hover': {
    bgcolor: hasText ? 'primary.dark' : 'action.disabledBackground',
  },
})
