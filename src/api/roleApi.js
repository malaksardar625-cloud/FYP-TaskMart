import { apiClient } from './apiClient'

export const updateUserRole = (role, navigate) => {
  return apiClient(
    '/user/role',
    {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    },
    navigate
  )
}
