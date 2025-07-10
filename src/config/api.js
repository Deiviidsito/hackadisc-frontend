// Configuración de la API
const API_CONFIG = {
  // URL base para desarrollo local
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // Timeout para las peticiones (30 segundos)
  TIMEOUT: 30000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

export default API_CONFIG
