export const messageBubbleRow = (isMine) => ({
  display: 'flex',
  justifyContent: isMine ? 'flex-end' : 'flex-start',
  mb: 0.25,
})

export const messageBubble = (isMine) => ({
  maxWidth: { xs: '80%', sm: '60%' },
  px: 1.5,
  py: 1,
  borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  bgcolor: isMine ? 'primary.main' : 'background.paper',
  color: isMine ? 'primary.contrastText' : 'text.primary',
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  wordBreak: 'break-word',
  border: isMine ? 'none' : '1px solid',
  borderColor: isMine ? 'transparent' : 'divider',
})

export const messageText = {
  fontSize: '0.9rem',
  lineHeight: 1.5,
}

export const messageMeta = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 0.5,
  mt: 0.25,
})

export const messageTime = (isMine) => ({
  fontSize: '0.65rem',
  opacity: 0.75,
  color: isMine ? 'primary.contrastText' : 'text.disabled',
})

export const messageStatusIcon = {
  fontSize: '0.75rem !important',
  opacity: 0.8,
}
