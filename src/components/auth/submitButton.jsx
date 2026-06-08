import { Button, CircularProgress } from '@mui/material'

export function SubmitButton({ loading = false, children, sx, ...rest }) {
  return (
    <Button
      variant="contained"
      fullWidth
      size="large"
      disabled={loading}
      sx={{ borderRadius: 2, py: 1.2, ...sx }}
      {...rest}
    >
      {loading ? <CircularProgress size={22} color="inherit" /> : children}
    </Button>
  )
}
