import { Snackbar, Alert } from '@mui/material'

export function FormSnackbar({ snackbar, onClose }) {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity={snackbar.severity}
        onClose={onClose}
        sx={{ borderRadius: 2 }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  )
}
