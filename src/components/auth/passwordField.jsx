import { useState, forwardRef } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'

export const PasswordField = forwardRef(function PasswordField(
  { label = 'Password', error, helperText, ...rest },
  ref
) {
  const [visible, setVisible] = useState(false)

  return (
    <TextField
      label={label}
      fullWidth
      inputRef={ref}
      type={visible ? 'text' : 'password'}
      error={!!error}
      helperText={error?.message ?? helperText}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setVisible((v) => !v)}
                edge="end"
                size="small"
                aria-label={visible ? 'Hide password' : 'Show password'}
              >
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  )
})
