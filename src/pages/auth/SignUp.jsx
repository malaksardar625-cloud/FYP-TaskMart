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
  Dialog,
  DialogContent,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  PersonOutlined,
  LockOutlined,
  MarkEmailReadOutlined,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { styles } from './auth.styles.js'
import { signupSchema as schema } from './auth.schemas.js'
import { Logo } from '../../components/shared.jsx'

// ─── Email Sent Dialog ────────────────────────────────────────────────────────
function EmailVerificationDialog({ open, email }) {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Coloured top band */}
        <Box
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MarkEmailReadOutlined
              sx={{ fontSize: 36, color: 'primary.contrastText' }}
            />
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: '#fff', letterSpacing: '-0.3px' }}
          >
            Check your inbox
          </Typography>
        </Box>

        {/* Body */}
        <Stack spacing={2} sx={{ px: 3.5, py: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
            We've sent a verification link to{' '}
            <Typography
              component="span"
              variant="body2"
              fontWeight={600}
              color="text.primary"
            >
              {email}
            </Typography>
            . Click the link in the email to activate your account.
          </Typography>

          <Alert
            severity="info"
            variant="outlined"
            sx={{ textAlign: 'left', fontSize: 12 }}
          >
            Didn't get it? Check your spam folder, or wait a minute and try
            again.
          </Alert>

          <Typography variant="caption" color="text.disabled">
            The link expires in 10 minutes.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

// ─── SignUp ───────────────────────────────────────────────────────────────────
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRetype, setShowRetype] = useState(false)
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [verifyDialog, setVerifyDialog] = useState({ open: false, email: '' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) })

  const onSubmit = async (data) => {
    setLoading(true)
    setServerError('')
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          userName: data.userName,
          password: data.password,
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        setServerError(result.message || 'Signup failed.')
        return
      }
      // ✅ Show the verification dialog instead of navigating
      setVerifyDialog({ open: true, email: data.email })
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
            Create your account
          </Typography>
          <Typography variant="body2" sx={styles.subheading}>
            Join thousands of buyers and sellers on TaskMart
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
              label="Email address"
              type="email"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={styles.icon} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="UserName"
              fullWidth
              {...register('userName')}
              error={!!errors.userName}
              helperText={errors.userName?.message}
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

            <TextField
              label="Retype password"
              type={showRetype ? 'text' : 'password'}
              fullWidth
              {...register('retypePassword')}
              error={!!errors.retypePassword}
              helperText={errors.retypePassword?.message}
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
                        onClick={() => setShowRetype((p) => !p)}
                        edge="end"
                        size="small"
                      >
                        {showRetype ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={styles.submitBtn}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                'Create Account'
              )}
            </Button>
          </Stack>

          <Divider sx={styles.divider} />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={styles.footerText}
          >
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Box>

      {/* ✅ Email verification dialog — no close button, user must verify */}
      <EmailVerificationDialog
        open={verifyDialog.open}
        email={verifyDialog.email}
      />
    </Box>
  )
}
