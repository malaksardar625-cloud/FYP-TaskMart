export const styles = {
  paper: {
    p: 3,
    border: '1px solid',
    borderRadius: 3,
    position: 'relative',
    overflow: 'hidden',
    transition: 'border-color 0.2s',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    borderRadius: '4px 0 0 4px',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statusChip: { fontWeight: 600, fontSize: '0.7rem' },
  featureCheck: { fontSize: 14, color: 'text.disabled' },
}
