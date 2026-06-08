export const styles = {
  paper: { p: 3, borderRadius: 2.5, border: '1px solid', mb: 2.5 },
  chipBox: {
    border: '1px solid',
    borderRadius: 1.5,
    p: 1.25,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.75,
    cursor: 'text',
    minHeight: 56,
    '&:focus-within': {
      borderColor: 'primary.main',
      boxShadow: (t) => `0 0 0 2px ${t.palette.primary.main}22`,
    },
  },
  nativeInput: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '0.875rem',
    color: 'text.primary',
    fontFamily: 'inherit',
    minWidth: 140,
    flex: 1,
    '&::placeholder': { color: 'text.disabled' },
  },
  chip: { fontWeight: 500, fontSize: '0.78rem' },
  suggestion: {
    fontSize: '0.72rem',
    height: 26,
    '& .MuiChip-icon': { fontSize: 14 },
  },
}
