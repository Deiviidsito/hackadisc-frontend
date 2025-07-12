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

// ============ NUEVOS SERVICIOS PARA TU API DE DASHBOARD ============

// Servicios principales del dashboard (datos completos)
export const dashboardService = {
  // Dashboard completo - Retorna TODOS los datos en una sola llamada
  getCompleto: async () => {
    const response = await apiClient.get('/dashboard/completo')
    return response.data
  },

  // Ventas por mes (todos los años disponibles)
  getVentasMes: async () => {
    const response = await apiClient.get('/dashboard/ventas-mes')
    return response.data
  },

  // Resumen anual (todos los años disponibles)
  getResumenAnual: async () => {
    const response = await apiClient.get('/dashboard/resumen-anual')
    return response.data
  },

  // Análisis de tiempos de pago
  getTiempoPagoPromedio: async () => {
    const response = await apiClient.get('/dashboard/tiempo-pago-promedio')
    return response.data
  },

  getDistribucionPagos: async () => {
    const response = await apiClient.get('/dashboard/distribucion-pagos')
    return response.data
  },

  getMorosidadClientes: async () => {
    const response = await apiClient.get('/dashboard/morosidad-clientes')
    return response.data
  },

  // Análisis de etapas de venta
  getTiempoEtapas: async () => {
    const response = await apiClient.get('/dashboard/tiempo-etapas')
    return response.data
  },

  getEtapasPorCliente: async () => {
    const response = await apiClient.get('/dashboard/etapas-por-cliente')
    return response.data
  },

  getDistribucionEtapas: async () => {
    const response = await apiClient.get('/dashboard/distribucion-etapas')
    return response.data
  },

  // Análisis de facturación
  getTiempoFacturacion: async () => {
    const response = await apiClient.get('/dashboard/tiempo-facturacion')
    return response.data
  },

  getFacturacionPorCliente: async () => {
    const response = await apiClient.get('/dashboard/facturacion-por-cliente')
    return response.data
  },

  getDistribucionFacturacion: async () => {
    const response = await apiClient.get('/dashboard/distribucion-facturacion')
    return response.data
  },

  // Análisis de tipos de flujo
  getTiposFlujo: async () => {
    const response = await apiClient.get('/dashboard/tipos-flujo')
    return response.data
  },

  getPreferenciasFlujo: async () => {
    const response = await apiClient.get('/dashboard/preferencias-flujo')
    return response.data
  },

  getEficienciaFlujo: async () => {
    const response = await apiClient.get('/dashboard/eficiencia-flujo')
    return response.data
  },

  // Tiempo de pago completo
  getPagoTiempoCompleto: async () => {
    const response = await apiClient.get('/dashboard/pago-tiempo-completo')
    return response.data
  }
}

// ============ NUEVOS SERVICIOS PARA ANALÍTICAS POR CLIENTE ============

// Servicios de clientes - analíticas personalizadas
export const clientesService = {
  // Lista de todos los clientes con estadísticas básicas
  listar: async () => {
    const response = await apiClient.get('/clientes/listar')
    return response.data
  },

  // Lista simplificada para dashboard
  listarSimple: async () => {
    const response = await apiClient.get('/dashboard/clientes-lista')
    return response.data
  },

  // Analíticas completas de un cliente específico
  getAnalytics: async (clienteId) => {
    const response = await apiClient.get(`/clientes/${clienteId}/analytics`)
    return response.data
  },

  // Comparar dos clientes
  comparar: async (cliente1Id, cliente2Id) => {
    const response = await apiClient.get(`/clientes/${cliente1Id}/comparar?cliente_comparacion=${cliente2Id}`)
    return response.data
  }
}

// Servicios con parámetros personalizables
export const dashboardCustomService = {
  // Ventas por mes con filtros
  getVentasMesCustom: async (params = {}) => {
    const response = await apiClient.get('/dashboard/ventas-mes-custom', { params })
    return response.data
  },

  // Tiempo de pago con filtros
  getTiempoPagoCustom: async (params = {}) => {
    const response = await apiClient.get('/dashboard/tiempo-pago-custom', { params })
    return response.data
  },

  // Morosidad con filtros
  getMorosidadCustom: async (params = {}) => {
    const response = await apiClient.get('/dashboard/morosidad-custom', { params })
    return response.data
  },

  // Etapas con filtros
  getEtapasCustom: async (params = {}) => {
    const response = await apiClient.get('/dashboard/etapas-custom', { params })
    return response.data
  },

  // Facturación con filtros
  getFacturacionCustom: async (params = {}) => {
    const response = await apiClient.get('/dashboard/facturacion-custom', { params })
    return response.data
  },

  // Tipos de flujo con filtros
  getTiposFlujoCust: async (params = {}) => {
    const response = await apiClient.get('/dashboard/tipos-flujo-custom', { params })
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

// Mantener compatibilidad con el store actual - mapear a los nuevos endpoints
export const statisticsService = {
  // Mapear los métodos antiguos a los nuevos endpoints
  getGlobalSummary: async (params = {}) => {
    // Usar el endpoint completo o resumen anual según los parámetros
    if (params && Object.keys(params).length > 0) {
      // Si hay filtros, usar endpoints custom
      return dashboardCustomService.getVentasMesCustom(params)
    }
    return dashboardService.getResumenAnual()
  },

  getClientStatistics: async (params = {}) => {
    // Usar morosidad de clientes como estadísticas de clientes
    if (params && Object.keys(params).length > 0) {
      return dashboardCustomService.getMorosidadCustom(params)
    }
    return dashboardService.getMorosidadClientes()
  },

  getTemporalTrends: async (params = {}) => {
    // Usar ventas por mes para tendencias temporales
    if (params && Object.keys(params).length > 0) {
      return dashboardCustomService.getVentasMesCustom(params)
    }
    return dashboardService.getVentasMes()
  },

  getPaymentDistribution: async () => {
    // Usar distribución de pagos
    return dashboardService.getDistribucionPagos()
  },

  getComparativeAnalysis: async () => {
    // Usar análisis de eficiencia de flujo para comparativas
    return dashboardService.getEficienciaFlujo()
  }
}
