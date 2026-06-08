export const styles = {
  section: {
    p: 3,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
  },
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1.5,
    borderRadius: 1.5,
    '&:hover': { bgcolor: 'action.hover' },
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: 1.5,
    bgcolor: 'primary.50',
    color: 'primary.main',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    py: 4,
  },
}
