import { Stack, Button } from '@mui/material'

export function FormActions({
  onCancel,
  onSubmit,
  submitting,
  submitLabel,
  submitIcon,
}) {
  return (
    <Stack direction="row" spacing={1.5}>
      <Button variant="outlined" onClick={onCancel} disabled={submitting}>
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={submitting}
        startIcon={submitIcon}
      >
        {submitting ? 'Submitting…' : submitLabel}
      </Button>
    </Stack>
  )
}
