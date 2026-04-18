export const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    bgcolor: 'background.default',
  },

  sidebar: {
    width: 260,
    flexShrink: 0,
    bgcolor: 'background.paper',
    borderRight: '1px solid',
    borderColor: 'divider',
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    p: 3,
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
  },

  main: {
    flex: 1,
    p: { xs: 2, md: 3.5 },
    maxWidth: '100%',
    overflow: 'hidden',
  },

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    px: 1.5,
    py: 1,
    borderRadius: 2,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      bgcolor: 'action.hover',
    },
  },

  navItemActive: {
    bgcolor: 'primary.light',
    '&:hover': {
      bgcolor: 'primary.light',
    },
  },

  card: {
    p: 3,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
  },

  profileAvatar: {
    width: 56,
    height: 56,
    bgcolor: 'primary.main',
    fontSize: '1.2rem',
    fontWeight: 700,
  },

  themeOption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    borderRadius: 2,
    border: '2px solid',
    borderColor: 'divider',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      borderColor: 'primary.main',
      bgcolor: 'action.hover',
    },
  },

  themeOptionActive: {
    borderColor: 'primary.main',
    bgcolor: 'primary.light',
  },

  themeIcon: {
    width: 40,
    height: 40,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  },

  previewBox: {
    mt: 2.5,
    p: 1.5,
    borderRadius: 2,
    bgcolor: 'action.hover',
    border: '1px solid',
    borderColor: 'divider',
  },
}
