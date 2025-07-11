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
  getGlobalSummary: async (params = {}) => {
    const queryParams = new URLSearchParams()
    
    // Agregar parámetros si existen
    if (params.dateFrom) queryParams.append('fecha_desde', params.dateFrom)
    if (params.dateTo) queryParams.append('fecha_hasta', params.dateTo)
    if (params.clientType && params.clientType !== 'all') queryParams.append('tipo_cliente', params.clientType)
    if (params.paymentStatus && params.paymentStatus !== 'all') queryParams.append('estado_pago', params.paymentStatus)
    if (params.amountMin) queryParams.append('monto_minimo', params.amountMin)
    if (params.amountMax) queryParams.append('monto_maximo', params.amountMax)
    
    const queryString = queryParams.toString()
    const url = queryString ? `/resumen-estadisticas-pago?${queryString}` : '/resumen-estadisticas-pago'
    
    const response = await apiClient.get(url)
    return response.data
  },
  
  // Obtener estadísticas por cliente
  getClientStatistics: async (params = {}) => {
    const queryParams = new URLSearchParams()
    
    // Agregar parámetros si existen
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.dateFrom) queryParams.append('fecha_desde', params.dateFrom)
    if (params.dateTo) queryParams.append('fecha_hasta', params.dateTo)
    if (params.clientType && params.clientType !== 'all') queryParams.append('tipo_cliente', params.clientType)
    if (params.paymentStatus && params.paymentStatus !== 'all') queryParams.append('estado_pago', params.paymentStatus)
    if (params.amountMin) queryParams.append('monto_minimo', params.amountMin)
    if (params.amountMax) queryParams.append('monto_maximo', params.amountMax)
    
    const queryString = queryParams.toString()
    const url = queryString ? `/estadisticas-por-cliente?${queryString}` : '/estadisticas-por-cliente'
    
    const response = await apiClient.get(url)
    return response.data
  },
  
  // Obtener tendencias temporales
  getTemporalTrends: async (params = {}) => {
    const queryParams = new URLSearchParams()
    
    // Agregar parámetros si existen
    if (params.dateFrom) queryParams.append('fecha_desde', params.dateFrom)
    if (params.dateTo) queryParams.append('fecha_hasta', params.dateTo)
    if (params.agrupacion) queryParams.append('agrupacion', params.agrupacion) // 'month', 'quarter', 'year'
    if (params.año) queryParams.append('año', params.año)
    if (params.clientType && params.clientType !== 'all') queryParams.append('tipo_cliente', params.clientType)
    if (params.paymentStatus && params.paymentStatus !== 'all') queryParams.append('estado_pago', params.paymentStatus)
    
    const queryString = queryParams.toString()
    const url = queryString ? `/tendencias-temporales?${queryString}` : '/tendencias-temporales'
    
    const response = await apiClient.get(url)
    return response.data
  },
  
  // Obtener distribución de pagos por rangos
  getPaymentDistribution: async (params = {}) => {
    const queryParams = new URLSearchParams()
    
    // Agregar parámetros si existen
    if (params.dateFrom) queryParams.append('fecha_desde', params.dateFrom)
    if (params.dateTo) queryParams.append('fecha_hasta', params.dateTo)
    if (params.clientType && params.clientType !== 'all') queryParams.append('tipo_cliente', params.clientType)
    if (params.paymentStatus && params.paymentStatus !== 'all') queryParams.append('estado_pago', params.paymentStatus)
    
    const queryString = queryParams.toString()
    const url = queryString ? `/distribucion-pagos?${queryString}` : '/distribucion-pagos'
    
    const response = await apiClient.get(url)
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
    const queryParams = new URLSearchParams()
    
    // Agregar parámetros si existen
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.ordenar_por) queryParams.append('ordenar_por', params.ordenar_por) // 'fecha_emision', 'fecha_vencimiento', 'monto'
    if (params.orden) queryParams.append('orden', params.orden) // 'asc', 'desc'
    if (params.cliente) queryParams.append('cliente', params.cliente)
    if (params.estado) queryParams.append('estado', params.estado) // 'pendiente', 'vencida'
    if (params.fecha_desde) queryParams.append('fecha_desde', params.fecha_desde)
    if (params.fecha_hasta) queryParams.append('fecha_hasta', params.fecha_hasta)
    if (params.monto_min) queryParams.append('monto_min', params.monto_min)
    if (params.monto_max) queryParams.append('monto_max', params.monto_max)
    
    const queryString = queryParams.toString()
    const url = queryString ? `/facturas-pendientes?${queryString}` : '/facturas-pendientes'
    
    const response = await apiClient.get(url)
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
  },
  
  // Marcar factura como pagada
  marcarComoPagada: async (facturaId, fechaPago = null) => {
    const response = await apiClient.patch(`/facturas/${facturaId}/pagar`, { 
      fecha_pago: fechaPago || new Date().toISOString().split('T')[0] 
    })
    return response.data
  },
  
  // Enviar recordatorio de pago
  enviarRecordatorio: async (facturaId, tipo = 'email') => {
    const response = await apiClient.post(`/facturas/${facturaId}/recordatorio`, { tipo })
    return response.data
  }
}
