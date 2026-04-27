export const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    bgcolor: 'background.default',
  },

  sidebar: {
    width: 240,
    flexShrink: 0,
    bgcolor: 'background.paper',
    borderRight: '1px solid',
    borderColor: 'divider',
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    p: 1.5,
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
    overflow: 'hidden',
  },

  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 2,
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    flexShrink: 0,
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

  main: {
    flex: 1,
    p: { xs: 2, md: 3.5 },
    maxWidth: '100%',
    overflow: 'hidden',
  },

  iconBtn: {
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
  },

  topAvatar: {
    width: 38,
    height: 38,
    bgcolor: 'primary.main',
    fontSize: '0.9rem',
    fontWeight: 700,
  },

  statCard: {
    p: 2.5,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
    height: '100%',
  },

  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 2.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  section: {
    p: 2.5,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
  },

  orderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1.5,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    gap: 2,
    transition: 'all 0.15s ease',
    '&:hover': {
      bgcolor: 'action.hover',
      cursor: 'pointer',
    },
  },

  orderIcon: {
    width: 36,
    height: 36,
    borderRadius: 2,
    bgcolor: 'action.hover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  actionCard: {
    border: '1px solid',
    borderColor: 'divider',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      borderColor: 'primary.main',
      bgcolor: 'primary.light',
    },
  },

  actionIcon: {
    color: 'primary.main',
    mb: 0.5,
    display: 'flex',
  },
}
