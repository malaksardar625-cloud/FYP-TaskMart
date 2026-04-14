import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { forgotPasswordSchema as schema } from './auth.schemas.js'
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
} from '@mui/material'
import { EmailOutlined, ArrowBackOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { styles } from './Auth.styles.js'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) })

  const onSubmit = async (data) => {
    setLoading(true)
    setServerError('')
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: data.email }),
      })
      const result = await response.json()
      if (!response.ok) {
        setServerError(result.message || 'Something went wrong.')
        return
      }
      // ✅ Pass email to OTP screen so backend knows which account
      navigate('/verify-otp', { state: { email: data.email } })
    } catch {
      setServerError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        {/* Brand */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box sx={styles.logoMark} />
          <Typography variant="h6" fontWeight={700}>
            TaskMart
          </Typography>
        </Stack>

        <Paper elevation={0} sx={{ ...styles.card, mt: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            Forgot password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Enter your email and we'll send you a 6-digit OTP.
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
            <TextField
              label="Email address"
              fullWidth
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined fontSize="small" />
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
                'Send OTP'
              )}
            </Button>

            <Button
              variant="text"
              startIcon={<ArrowBackOutlined />}
              onClick={() => navigate('/login')}
              sx={{ alignSelf: 'center' }}
            >
              Back to Login
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}
