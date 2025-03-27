import axios from 'axios'

export const apiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || '' })

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    // console.log('Sending token in request:', token)
    if (token) {
      // Set the Authorization header as expected by the backend
      config.headers['Authorization'] = `${token}`
      
      // Keep x-auth-token for middleware if needed
      config.headers['x-auth-token'] = token
    }
  }
  return config
})
