import { apiClient } from './apiClient'

export const loginUser = (credentials, navigate) => {
  return apiClient(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(credentials),
    },
    navigate
  )
}

export const signupUser = (data, navigate) => {
  return apiClient(
    '/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    navigate
  )
}

export const forgotPassword = (email, navigate) => {
  return apiClient(
    '/auth/forgot-password',
    {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
    navigate
  )
}

export const resetPassword = (payload, navigate) => {
  return apiClient(
    '/auth/reset-password',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    navigate
  )
}

export const verifyResetOtp = (payload, navigate) => {
  return apiClient(
    '/auth/verify-reset-otp',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    navigate
  )
}

export const logoutUser = (navigate) => {
  return apiClient(
    '/auth/logout',
    {
      method: 'POST',
    },
    navigate
  )
}

export const getCurrentUser = (navigate) => {
  return apiClient('/auth/me', {}, navigate)
}
