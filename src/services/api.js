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

// Servicios para el agente de IA Capi
export const capiService = {
  // Preguntar por texto
  ask: async (question) => {
    const response = await apiClient.post('/capi/ask', { question })
    return response.data
  },
  
  // Obtener información sobre Capi
  about: async () => {
    const response = await apiClient.get('/capi/about')
    return response.data
  },
  
  // Enviar audio y recibir respuesta por voz
  voiceChat: async (audioBlob) => {
    const formData = new FormData()
    formData.append('audio', audioBlob)
    
    const response = await apiClient.post('/capi/voice/chat', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },
  
  // Convertir texto a voz
  textToSpeech: async (text) => {
    const response = await apiClient.post('/capi/voice/text-to-speech', { text })
    return response.data
  }
}
