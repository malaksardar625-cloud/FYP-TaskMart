import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Link,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  PersonOutlined,
  LockOutlined,
} from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { styles } from './auth.styles.js'
import { loginSchema as schema } from './auth.schemas.js'
import { Logo } from '../../components/shared.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
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
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.identifier)
    const payload = isEmail
      ? { email: data.identifier, password: data.password }
      : { userName: data.identifier, password: data.password }
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) {
        setServerError(result.message || 'Invalid credentials.')
        return
      }
      if (result.data.profileStatus === 'INCOMPLETE') {
        navigate('/profile-setup')
      } else {
        navigate('/dashboard')
      }
    } catch {
      setServerError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.wrapper}>
        {/* Brand */}
        <Logo />

        <Paper elevation={0} sx={styles.card}>
          <Typography variant="h5" color="text.primary" sx={styles.heading}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={styles.subheading}>
            Sign in to your account to continue
          </Typography>

          {serverError && (
            <Alert severity="error" sx={styles.alert}>
              {serverError}
            </Alert>
          )}

          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={2.5}
          >
            <TextField
              label="Email or Username"
              fullWidth
              {...register('identifier')}
              error={!!errors.identifier}
              helperText={
                errors.identifier?.message ||
                'You can use either your email or userName'
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined sx={styles.icon} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={styles.icon} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="text"
              size="small"
              onClick={() => navigate('/forgot-password')}
              sx={{ alignSelf: 'flex-end' }}
            >
              Forgot password?
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
          </Stack>

          <Divider sx={styles.divider}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/signup">
              Create one
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
