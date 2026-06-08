import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { EmailOutlined, PersonOutlined } from '@mui/icons-material'
import { signupSchema as schema } from './auth.schemas'
import { AuthContext } from '../../context/authContext'
import {
  AuthLayout,
  AuthCard,
  AuthDivider,
  AuthLink,
  FormField,
  PasswordField,
  SubmitButton,
  ServerAlert,
  EmailVerificationDialog,
} from '../../components/auth'
import { signupUser } from '../../api/authApi'

export default function SignUp() {
  const navigate = useNavigate()
  const login = useContext(AuthContext)

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
      const result = await signupUser(
        {
          email: data.email,
          userName: data.userName,
          password: data.password,
        },
        navigate
      )

      const user = result.data?.user || result.data

      if (!user) {
        setServerError('Invalid server response')
        return
      }

      // login user into context
      login(user)

      // open verification dialog
      setVerifyDialog({
        open: true,
        email: data.email,
      })
    } catch (err) {
      console.error('Signup error:', err)
      setServerError(err.message || 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        subtitle="Join thousands of buyers and sellers on TaskMart"
      >
        <ServerAlert message={serverError} />

        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2.5}
          sx={{ mt: 2 }}
        >
          <FormField
            label="Email address"
            type="email"
            icon={<EmailOutlined />}
            error={errors.email}
            {...register('email')}
          />

          <FormField
            label="Username"
            icon={<PersonOutlined />}
            error={errors.userName}
            {...register('userName')}
          />

          <PasswordField
            label="Password"
            error={errors.password}
            {...register('password')}
          />

          <PasswordField
            label="Retype password"
            error={errors.retypePassword}
            {...register('retypePassword')}
          />

          <SubmitButton type="submit" loading={loading}>
            Create Account
          </SubmitButton>
        </Stack>

        <AuthDivider />

        <AuthLink
          text="Already have an account?"
          linkText="Sign in"
          to="/login"
        />
      </AuthCard>

      <EmailVerificationDialog
        open={verifyDialog.open}
        email={verifyDialog.email}
      />
    </AuthLayout>
  )
}
