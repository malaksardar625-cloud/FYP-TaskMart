export const typingIndicator = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  px: 1.5,
  py: 0.5,
  mb: 1,
}

export const typingDots = {
  display: 'flex',
  gap: 0.5,
  alignItems: 'center',
}

export const typingDot = (delay) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  bgcolor: 'text.disabled',
  animation: 'bounce 1.4s infinite ease-in-out',
  animationDelay: delay,
  '@keyframes bounce': {
    '0%, 80%, 100%': { transform: 'scale(0)' },
    '40%': { transform: 'scale(1)' },
  },
})
