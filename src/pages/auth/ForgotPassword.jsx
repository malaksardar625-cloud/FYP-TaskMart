import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { forgotPasswordSchema as schema } from './auth.schemas.js'
import { Stack, Button, Typography } from '@mui/material'
import {
  EmailOutlined,
  ArrowBackOutlined,
  MarkEmailReadOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {
  AuthLayout,
  AuthCard,
  FormField,
  SubmitButton,
  ServerAlert,
} from '../../components/Auth'
import { forgotPassword } from '../../api/authApi'

export default function ForgotPassword() {
  const navigate = useNavigate()

  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [sentToEmail, setSentToEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) })

  const onSubmit = async (data) => {
    setLoading(true)
    setServerError('')

    try {
      await forgotPassword(data.email, navigate)

      setSentToEmail(data.email)
      setEmailSent(true)
    } catch (err) {
      console.error('Forgot password error:', err)

      setServerError(
        err.message || 'Network error. Please check your connection.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        {emailSent ? (
          /* ── Success state ── */
          <Stack spacing={2} sx={{ py: 2, alignItems: 'center' }}>
            <MarkEmailReadOutlined
              sx={{ fontSize: 56, color: 'success.main' }}
            />

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ textAlign: 'center' }}
            >
              Check your inbox
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              We sent a 6-digit OTP to{' '}
              <Typography
                component="span"
                variant="body2"
                fontWeight={600}
                color="text.primary"
              >
                {sentToEmail}
              </Typography>
              . It expires in 10 minutes.
            </Typography>

            <SubmitButton
              sx={{ mt: 1 }}
              onClick={() =>
                navigate('/verify-otp', { state: { email: sentToEmail } })
              }
            >
              Enter OTP
            </SubmitButton>

            <Button
              variant="text"
              size="small"
              onClick={() => {
                setEmailSent(false)
                setServerError('')
              }}
            >
              Use a different email
            </Button>
          </Stack>
        ) : (
          /* ── Form state ── */
          <>
            <Typography variant="h5" fontWeight={700}>
              Reset your password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Enter your email and we'll send you a 6-digit OTP.
            </Typography>

            <ServerAlert message={serverError} />

            <Stack
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={3}
              sx={{ mt: 3 }}
            >
              <FormField
                label="Email address"
                type="email"
                icon={<EmailOutlined fontSize="small" />}
                error={errors.email}
                {...register('email')}
              />

              <SubmitButton type="submit" loading={loading}>
                Send OTP
              </SubmitButton>

              <Button
                variant="text"
                startIcon={<ArrowBackOutlined />}
                onClick={() => navigate('/login')}
                sx={{ alignSelf: 'center' }}
              >
                Back to Login
              </Button>
            </Stack>
          </>
        )}
      </AuthCard>
    </AuthLayout>
  )
}
