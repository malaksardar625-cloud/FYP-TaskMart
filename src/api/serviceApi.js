import { apiClient } from './apiClient'

export const getServices = (navigate) => {
  return apiClient('/services', {}, navigate)
}

export const getService = (id, navigate) => {
  return apiClient(`/services/${id}`, {}, navigate)
}

export const createService = (data, navigate) => {
  return apiClient(
    '/services',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    navigate
  )
}

export const updateService = (id, data, navigate) => {
  return apiClient(
    `/services/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
    navigate
  )
}

export const deleteService = (id, navigate) => {
  return apiClient(
    `/services/${id}`,
    {
      method: 'DELETE',
    },
    navigate
  )
}
