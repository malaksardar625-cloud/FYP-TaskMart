export const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'
export const API_TIMEOUT = 10000 // 10 seconds
export const API_HEADERS = {
  'Content-Type': 'application/json',
}
