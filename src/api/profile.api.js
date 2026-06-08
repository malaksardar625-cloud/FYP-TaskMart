import { apiClient } from './apiClient'

export const getProfile = (navigate) => {
  return apiClient('/profiles/me', {}, navigate)
}

export const updateProfile = (data, navigate) => {
  return apiClient(
    '/profiles/me',
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
    navigate
  )
}

export const uploadAvatar = (file, navigate) => {
  const formData = new FormData()
  formData.append('avatar', file)

  return apiClient(
    '/profiles/avatar',
    {
      method: 'POST',
      body: formData,
      headers: {},
    },
    navigate
  )
}

export const uploadCover = (file, navigate) => {
  const formData = new FormData()
  formData.append('cover', file)

  return apiClient(
    '/profiles/cover',
    {
      method: 'POST',
      body: formData,
      headers: {},
    },
    navigate
  )
}
