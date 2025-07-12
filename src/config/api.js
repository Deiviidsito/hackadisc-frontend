// Configuración de la API
const API_CONFIG = {
  // URL base para desarrollo local
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // URL base para producción (Railway)
  PRODUCTION_URL: import.meta.env.VITE_API_PRODUCTION_URL || 'https://tu-api-railway.up.railway.app/api',
  
  // Timeout para las peticiones (30 segundos)
  TIMEOUT: 30000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  // Headers para formularios (FormData)
  FORM_HEADERS: {
    'Accept': 'application/json',
  }
}

// Endpoints de la API
export const API_ENDPOINTS = {
  // Endpoints existentes
  ventasMes: '/ventas-mes',
  tiempoPago: '/tiempo-pago-promedio',
  distribucionEtapas: '/distribucion-etapas',
  tiempoFacturacion: '/tiempo-facturacion',
  
  // Nuevos endpoints de importación
  importarUsuarios: '/importarUsuariosJson',
  importarVentas: '/importarVentasJson'
}

// Función para obtener la URL base según el entorno
export const getApiBaseUrl = () => {
  return import.meta.env.MODE === 'production' 
    ? API_CONFIG.PRODUCTION_URL 
    : API_CONFIG.BASE_URL
}

// Función para obtener headers con autenticación
export const getAuthHeaders = (isFormData = false) => {
  const baseHeaders = isFormData ? API_CONFIG.FORM_HEADERS : API_CONFIG.DEFAULT_HEADERS
  
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
  
  return {
    ...baseHeaders,
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// Función para construir URL completa del endpoint
export const buildApiUrl = (endpoint) => {
  return `${getApiBaseUrl()}${endpoint}`
}

export default API_CONFIG
