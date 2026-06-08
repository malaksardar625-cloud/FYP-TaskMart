export const styles = {
  // ─── Card shell
  root: {
    p: 1.5,
    minWidth: 220,
    maxWidth: 270,
    fontFamily: 'inherit',
  },

  // ─── Header row
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 1.5,
    flexShrink: 0,
  },
  name: {
    fontWeight: 700,
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  chip: { fontSize: '0.65rem', height: 18 },

  distRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    mt: 0.75,
  },

  viewBtn: {
    mt: 1,
    borderRadius: 1.5,
    fontWeight: 600,
    fontSize: '0.8rem',
    textTransform: 'none',
  },
}
