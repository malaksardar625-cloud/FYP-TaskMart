export const newChatDialog = {
  '& .MuiDialog-paper': {
    borderRadius: 3,
    width: 420,
    maxWidth: '100%',
  },
}

export const newChatDialogHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 3,
  py: 2,
  borderBottom: '1px solid',
  borderColor: 'divider',
}

export const recipientItem = (isSelected) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 2,
  py: 1.25,
  cursor: 'pointer',
  borderRadius: 2,
  bgcolor: isSelected ? 'primary.light' : 'transparent',
  '&:hover': { bgcolor: isSelected ? 'primary.light' : 'action.hover' },
})
