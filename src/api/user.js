export const updateUserRole = async (role, token) => {
  const response = await fetch('/api/user/role', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || 'Failed to update role')
  return result
}
