export const styles = {
  section: {
    p: 3,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
  },
  actionCard: {
    border: '1px solid',
    borderColor: 'divider',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
  },
  actionIcon: {
    color: 'primary.main',
    mb: 0.5,
  },
}
