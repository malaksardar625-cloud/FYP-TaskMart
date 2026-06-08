export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    bgcolor: 'background.default',
  },

  topBar: {
    px: { xs: 2, md: 3 },
    py: 1.25,
    borderBottom: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    flexShrink: 0,
    flexWrap: 'wrap',
  },

  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  mapWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },

  floatingControls: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    width: 280,
  },
  locateBtn: {
    position: 'absolute',
    bottom: 100,
    right: 12,
    zIndex: 10,
  },
  statsBar: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    zIndex: 10,
  },
  statsPaper: {
    px: 1.5,
    py: 0.75,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    boxShadow: 1,
  },
}
