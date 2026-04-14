import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material'
import { styles } from './Auth.styles.js'

export default function VerifyOtp() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMsg, setResendMsg] = useState('')

  const inputRefs = useRef([])

  // ✅ Move focus to next box automatically
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return
    const updated = [...otp]
    updated[index] = value
    setOtp(updated)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // ✅ Allow backspace to go back
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async () => {
    const code = otp.join('')
    if (code.length < 6) {
      setError('Please enter all 6 digits.')
      return
    }
    setError('')
    setLoading(true)
    setServerError('')
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp: code }),
      })
      const result = await response.json()
      if (!response.ok) {
        setServerError(result.message || 'Invalid OTP.')
        return
      }
      // ✅ Pass email + verified token to reset screen
      navigate('/reset-password', { state: { email, token: result.token } })
    } catch {
      setServerError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResendLoading(true)
    setResendMsg('')
    setServerError('')
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      })
      const result = await response.json()
      if (!response.ok) {
        setServerError(result.message || 'Could not resend OTP.')
        return
      }
      setResendMsg('A new OTP has been sent to your email.')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch {
      setServerError('Network error. Please check your connection.')
    } finally {
      setResendLoading(false)
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
            Verify OTP
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Enter the 6-digit code sent to{' '}
            <strong>{email || 'your email'}</strong>
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError}
            </Alert>
          )}
          {resendMsg && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {resendMsg}
            </Alert>
          )}

          {/* ✅ 6 individual OTP boxes */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ mt: 3, justifyContent: 'center' }}
          >
            {otp.map((digit, index) => (
              <TextField
                key={index}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center', fontSize: 22, fontWeight: 700 },
                }}
                sx={{ width: 48 }}
                error={!!error}
              />
            ))}
          </Stack>

          {error && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 1, display: 'block', textAlign: 'center' }}
            >
              {error}
            </Typography>
          )}

          <Stack spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ borderRadius: 2, py: 1.2 }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                'Verify OTP'
              )}
            </Button>

            <Button
              variant="text"
              fullWidth
              onClick={handleResend}
              disabled={resendLoading}
            >
              {resendLoading ? (
                <CircularProgress size={18} />
              ) : (
                "Didn't receive it? Resend OTP"
              )}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}
