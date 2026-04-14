export const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    bgcolor: 'background.default',
    py: 2,
    px: 2,
  },

  container: {
    width: '100%',
    maxWidth: 600,
  },

  brandRow: {
    mb: 3,
  },

  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 2,
    background: (theme) =>
      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    boxShadow: (theme) => `0 2px 8px ${theme.palette.primary.main}44`,
  },

  card: {
    p: { xs: 3, sm: 4 },
    borderRadius: 1.5,
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
    boxShadow: (theme) =>
      theme.palette.mode === 'dark'
        ? '0 4px 24px rgba(0,0,0,0.4)'
        : '0 4px 24px rgba(0,0,0,0.06)',
  },

  avatar: {
    width: 72,
    height: 72,
    bgcolor: 'action.hover',
    color: 'text.secondary',
    border: '2px dashed',
    borderColor: 'divider',
    transition: 'border-color 0.2s',
    '&:hover': {
      borderColor: 'primary.main',
    },
  },
}
