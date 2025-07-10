import apiClient from '@/lib/api'

// Servicios de autenticación (sin middleware para hackathon)
export const authService = {
  // Login simple
  login: async (credentials) => {
    const response = await apiClient.post('/login', credentials)
    return response.data
  },
  
  // Obtener usuario actual
  getUser: async () => {
    const response = await apiClient.get('/user')
    return response.data
  },
  
  // Logout simple
  logout: async () => {
    const response = await apiClient.post('/logout')
    return response.data
  },
  
  // Obtener todos los usuarios (admin)
  getAllUsers: async () => {
    const response = await apiClient.get('/admin/users')
    return response.data
  }
}
