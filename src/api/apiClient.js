import { API_BASE } from './apiConfig'

let isRefreshing = false

export const apiClient = async (endpoint, options = {}, navigate) => {
  const request = async () => {
    return fetch(`${API_BASE}${endpoint}`, {
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },

      ...options,
    })
  }

  let response = await request()

  // -------------------------------------------------
  // Access Token Expired
  // -------------------------------------------------

  if (response.status === 401) {
    try {
      if (!isRefreshing) {
        isRefreshing = true

        const refreshRes = await fetch(`${API_BASE}/auth/refresh-token`, {
          method: 'GET',
          credentials: 'include',
        })

        if (!refreshRes.ok) {
          throw new Error('Refresh Failed')
        }

        isRefreshing = false
      }

      response = await request()
    } catch (error) {
      isRefreshing = false

      console.error('Refresh token failed:', error)

      localStorage.removeItem('user')

      if (navigate) {
        navigate('/login')
      }

      throw new Error('Session expired')
    }
  }

  // -------------------------------------------------
  // Handle Errors
  // -------------------------------------------------

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)

    // Profile incomplete

    if (errorData?.code === 'PROFILE_INCOMPLETE') {
      navigate?.('/create-profile')
    }

    throw new Error(errorData?.message || 'Something went wrong')
  }

  return response.json()
}
