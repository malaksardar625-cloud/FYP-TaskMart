import { TextField, InputAdornment } from '@mui/material'

export function FormField({ label, icon, error, helperText, ...rest }) {
  return (
    <TextField
      label={label}
      fullWidth
      error={!!error}
      helperText={error?.message ?? helperText}
      slotProps={
        icon
          ? {
              input: {
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              },
            }
          : undefined
      }
      {...rest}
    />
  )
}
