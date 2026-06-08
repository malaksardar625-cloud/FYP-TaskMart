import { loginUser } from '../../api/authApi'

export const handleLogin = async ({
  payload,
  setServerError,
  setLoading,
  login,
  navigate,
}) => {
  try {
    setLoading(true)
    setServerError('')

    const result = await loginUser(payload, navigate)

    // ✅ backend returns: { success, message, data: user }
    const userData = result?.data

    if (!userData) {
      setServerError('Invalid server response')
      return
    }

    // update auth context
    login(userData)

    // ✅ PROFILE CHECK (correct field from schema)
    if (!userData?.baseProfile) {
      navigate('/profile-setup')
      return
    }

    // ✅ ROLE-BASED ROUTING
    const role = userData?.role

    if (role === 'admin') {
      navigate('/dashboard')
    } else if (role === 'serviceProvider') {
      navigate('/provider/dashboard')
    } else if (role === 'productSeller') {
      navigate('/seller/dashboard')
    } else {
      navigate('/my-account')
    }
  } catch (err) {
    console.error('Login error:', err)
    setServerError(err.message || 'Network error. Please try again.')
  } finally {
    setLoading(false)
  }
}
