import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { resetPasswordSchema as schema } from './auth.schemas.js'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  CircularProgress,
  Stack,
  IconButton,
} from '@mui/material'
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { styles } from './Auth.styles.js'

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()

  // ✅ GET TOKEN FROM URL
  const queryParams = new URLSearchParams(location.search)
  const resetToken = queryParams.get('token')

  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) })

  const onSubmit = async (data) => {
    setLoading(true)
    setServerError('')

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          resetToken, // ✅ REQUIRED BY BACKEND
          newPassword: data.password, // ✅ REQUIRED BY BACKEND
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setServerError(result.message || 'Failed to reset password.')
        return
      }

      navigate('/login', {
        state: { message: 'Password reset successfully. Please log in.' },
      })
    } catch {
      setServerError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box sx={styles.logoMark} />
          <Typography variant="h6" fontWeight={700}>
            TaskMart
          </Typography>
        </Stack>

        <Paper elevation={0} sx={{ ...styles.card, mt: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            Reset password
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Choose a strong new password for your account.
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError}
            </Alert>
          )}

          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={3}
            sx={{ mt: 3 }}
          >
            {/* New Password */}
            <TextField
              label="New password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={
                errors.password?.message ||
                'Min 8 chars · uppercase · lowercase · number'
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((p) => !p)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm password"
              fullWidth
              type={showConfirm ? 'text' : 'password'}
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm((p) => !p)}>
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ borderRadius: 2, py: 1.2 }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                'Reset Password'
              )}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}
