import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

/**
 * ProtectedRoute — redirects to /login if not authenticated.
 */
export function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

/**
 * RoleRoute — only allows users with one of the given roles.
 * Buyers hitting /dashboard are redirected to /my-account.
 */
export function RoleRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const userRole = user.role || 'buyer'

  if (!allowedRoles.includes(userRole)) {
    // Buyer trying to go to /dashboard → send them to My Account
    if (location.pathname.startsWith('/dashboard')) {
      return <Navigate to="/my-account" replace />
    }
    // For any other restricted page → home
    return <Navigate to="/home" replace />
  }

  return children
}
