export const messageArea = {
  flex: 1,
  overflowY: 'auto',
  px: 2,
  py: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  '&::-webkit-scrollbar': { width: 4 },
  '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
  '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 2 },
}

export const loadingWrapper = {
  ...{
    flex: 1,
    overflowY: 'auto',
    px: 2,
    py: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },
  alignItems: 'center',
  justifyContent: 'center',
}
