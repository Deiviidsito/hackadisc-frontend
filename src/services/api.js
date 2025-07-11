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

// Servicios de estadísticas de pagos
export const statisticsService = {
  // Obtener resumen global de estadísticas
  getGlobalSummary: async () => {
    const response = await apiClient.get('/resumen-estadisticas-pago')
    return response.data
  },
  
  // Obtener estadísticas por cliente
  getClientStatistics: async (params = {}) => {
    const response = await apiClient.get('/estadisticas-por-cliente')
    return response.data
  },
  
  // Obtener tendencias temporales
  getTemporalTrends: async (params = {}) => {
    const response = await apiClient.get('/tendencias-temporales')
    return response.data
  },
  
  // Obtener distribución de pagos por rangos
  getPaymentDistribution: async () => {
    const response = await apiClient.get('/distribucion-pagos')
    return response.data
  },
  
  // Obtener análisis comparativo entre períodos
  getComparativeAnalysis: async (params = {}) => {
    // Si no hay parámetros, usar valores por defecto
    const defaultParams = {
      fechaInicioPeriodo1: '2024-01-01',
      fechaFinPeriodo1: '2024-06-30',
      fechaInicioPeriodo2: '2024-07-01', 
      fechaFinPeriodo2: '2024-12-31'
    }
    
    const finalParams = { ...defaultParams, ...params }
    
    const queryParams = new URLSearchParams({
      fecha_inicio_periodo1: finalParams.fechaInicioPeriodo1,
      fecha_fin_periodo1: finalParams.fechaFinPeriodo1,
      fecha_inicio_periodo2: finalParams.fechaInicioPeriodo2,
      fecha_fin_periodo2: finalParams.fechaFinPeriodo2
    })
    
    const response = await apiClient.get(`/analisis-comparativo?${queryParams}`)
    return response.data
  }
}

// Servicio de facturas
export const facturasService = {
  // Obtener todas las facturas pendientes
  getFacturasPendientes: async (params = {}) => {
    const queryParams = new URLSearchParams(params)
    const response = await apiClient.get(`/facturas-pendientes?${queryParams}`)
    return response.data
  },
  
  // Obtener facturas por empresa
  getFacturasByEmpresa: async (empresaId, params = {}) => {
    const queryParams = new URLSearchParams(params)
    const response = await apiClient.get(`/empresas/${empresaId}/facturas?${queryParams}`)
    return response.data
  },
  
  // Obtener detalle de una factura
  getFacturaDetail: async (facturaId) => {
    const response = await apiClient.get(`/facturas/${facturaId}`)
    return response.data
  },
  
  // Actualizar estado de una factura
  updateFacturaEstado: async (facturaId, estado) => {
    const response = await apiClient.patch(`/facturas/${facturaId}/estado`, { estado })
    return response.data
  },
  
  // Obtener estadísticas de facturas
  getFacturasStats: async () => {
    const response = await apiClient.get('/facturas/estadisticas')
    return response.data
  }
}
