import { apiClient } from './apiClient'

export const getProducts = (navigate) => {
  return apiClient('/products', {}, navigate)
}

export const getProduct = (id, navigate) => {
  return apiClient(`/products/${id}`, {}, navigate)
}

export const createProduct = (product, navigate) => {
  return apiClient(
    '/products',
    {
      method: 'POST',
      body: JSON.stringify(product),
    },
    navigate
  )
}
