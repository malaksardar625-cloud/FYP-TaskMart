import { apiClient } from './apiClient'

export const getProfile = (navigate) => {
  return apiClient('/profiles/me', {}, navigate)
}

export const uploadAvatar = async (file) => {
  const formData = new FormData()
  formData.append('avatar', file)

  return apiClient('/profile/avatar', {
    method: 'POST',
    body: formData,
  })
}

export const updateProfile = (profileData, navigate) => {
  return apiClient(
    '/profiles/me',
    {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    },
    navigate
  )
}

export const uploadCover = (file, navigate) => {
  const formData = new FormData()
  formData.append('cover', file)

  return apiClient(
    '/profile/cover',
    {
      method: 'PATCH',
      body: formData,
    },
    navigate
  )
}
