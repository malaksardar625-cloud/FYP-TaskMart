import { useState } from 'react'
import { Stack, Button, CircularProgress } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AuthLayout,
  AuthCard,
  OtpInput,
  SubmitButton,
  ServerAlert,
} from '../../components/auth'
import { verifyResetOtp, forgotPassword } from '../../api/authApi'

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
      const result = await verifyResetOtp({ email, otp: code }, navigate)

      navigate('/reset-password', {
        state: {
          email,
          token: result.token,
        },
      })
    } catch (err) {
      console.error('OTP verification error:', err)

      setServerError(err.message || 'Invalid OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResendLoading(true)
    setResendMsg('')
    setServerError('')

    try {
      await forgotPassword(email, navigate)

      setResendMsg('A new OTP has been sent to your email.')

      setOtp(['', '', '', '', '', ''])
    } catch (err) {
      console.error('Resend OTP error:', err)

      setServerError(err.message || 'Could not resend OTP.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Verify OTP"
        subtitle={
          <>
            Enter the 6-digit code sent to{' '}
            <strong>{email || 'your email'}</strong>
          </>
        }
      >
        <ServerAlert message={serverError} />
        <ServerAlert message={resendMsg} severity="success" />

        <OtpInput value={otp} onChange={setOtp} error={error} />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <SubmitButton loading={loading} onClick={handleSubmit}>
            Verify OTP
          </SubmitButton>

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
      </AuthCard>
    </AuthLayout>
  )
}
