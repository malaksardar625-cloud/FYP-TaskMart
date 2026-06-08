import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { Stack, Button } from '@mui/material'
import { PersonOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { loginSchema as schema } from './auth.schemas'
import {
  AuthLayout,
  AuthCard,
  AuthDivider,
  AuthLink,
  FormField,
  PasswordField,
  SubmitButton,
  ServerAlert,
} from '../../components/Auth'

import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
import { handleLogin } from '../../utils/auth/loginHandler'

export default function Login() {
  const navigate = useNavigate()
  const ctx = useContext(AuthContext)
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login: authLogin } = ctx
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) })

  const onSubmit = async (data) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.identifier)

    const payload = isEmail
      ? { email: data.identifier, password: data.password }
      : { userName: data.identifier, password: data.password }

    await handleLogin({
      payload,
      navigate,
      setServerError,
      setLoading,
      login: authLogin,
      onSuccess: (user) => {
        // ✅ PROFILE CHECK HERE
        if (!user?.baseProfile) {
          navigate('/create-profile')
        } else {
          navigate('/dashboard')
        }
      },
    })
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to your account to continue"
      >
        <ServerAlert message={serverError} />

        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2.5}
          sx={{ mt: 2 }}
        >
          <FormField
            label="Email or Username"
            icon={<PersonOutlined />}
            helperText={
              !errors.identifier
                ? 'You can use either your email or userName'
                : undefined
            }
            error={errors.identifier}
            {...register('identifier')}
          />

          <PasswordField
            label="Password"
            error={errors.password}
            {...register('password')}
          />

          <Button
            variant="text"
            size="small"
            onClick={() => navigate('/forgot-password')}
            sx={{ alignSelf: 'flex-end' }}
          >
            Forgot password?
          </Button>

          <SubmitButton type="submit" loading={loading}>
            Sign In
          </SubmitButton>
        </Stack>

        <AuthDivider />

        <AuthLink
          text="Don't have an account?"
          linkText="Create one"
          to="/signup"
        />
      </AuthCard>
    </AuthLayout>
  )
}
