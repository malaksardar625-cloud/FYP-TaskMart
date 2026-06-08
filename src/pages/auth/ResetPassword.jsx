import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { resetPasswordSchema as schema } from './auth.schemas.js'
import { Stack } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AuthLayout,
  AuthCard,
  PasswordField,
  SubmitButton,
  ServerAlert,
} from '../../components/Auth'
import { resetPassword } from '../../api/authApi'

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const resetToken = new URLSearchParams(location.search).get('token')

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
      await resetPassword(
        {
          resetToken,
          newPassword: data.password,
        },
        navigate
      )

      navigate('/login', {
        state: {
          message: 'Password reset successfully. Please log in.',
        },
      })
    } catch (err) {
      console.error('Reset password error:', err)

      setServerError(
        err.message || 'Network error. Please check your connection.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Reset password"
        subtitle="Choose a strong new password for your account."
      >
        <ServerAlert message={serverError} />

        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={3}
          sx={{ mt: 3 }}
        >
          <PasswordField
            label="New password"
            helperText="Min 8 chars · uppercase · lowercase · number"
            error={errors.password}
            {...register('password')}
          />

          <PasswordField
            label="Confirm password"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />

          <SubmitButton type="submit" loading={loading}>
            Reset Password
          </SubmitButton>
        </Stack>
      </AuthCard>
    </AuthLayout>
  )
}
