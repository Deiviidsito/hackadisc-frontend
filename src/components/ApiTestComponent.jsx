import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { authService } from '@/services/api'
import { Loader2, CheckCircle, XCircle, Wifi, WifiOff } from 'lucide-react'

export default function ApiTestComponent() {
  const [connectionStatus, setConnectionStatus] = useState('idle')
  const [authLoading, setAuthLoading] = useState(false)

  // Test de conexión básica
  const testConnection = async () => {
    try {
      setConnectionStatus('testing')
      
      // Hacer una petición simple para verificar conexión
      const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:8000/api')
      
      if (response.ok || response.status === 404) {
        setConnectionStatus('connected')
      } else {
        setConnectionStatus('error')
      }
    } catch (error) {
      console.error('Connection test failed:', error)
      setConnectionStatus('error')
    }
  }

  // Test de autenticación (solo ejemplo)
  const testAuth = async () => {
    try {
      setAuthLoading(true)
      await authService.getUser()
      console.log('✅ Auth test passed')
    } catch (error) {
      console.log('ℹ️ Auth test failed (expected if not logged in):', error.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'testing':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'Probando conexión...'
      case 'connected':
        return 'Conectado'
      case 'error':
        return 'Error de conexión'
      default:
        return 'Sin probar'
    }
  }

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Conectado</Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Error</Badge>
      case 'testing':
        return <Badge variant="outline">Probando...</Badge>
      default:
        return <Badge variant="secondary">Sin probar</Badge>
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card className="border-[#00B2E3]/20 bg-white/80 backdrop-blur-sm shadow-lg shadow-[#00B2E3]/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#003057]">
            <Wifi className="w-5 h-5" />
            Test de Conexión API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#003057]">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
            {getStatusBadge()}
          </div>
          
          <div className="text-sm text-[#003057]/70">
            <strong>URL de API:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={testConnection}
              disabled={connectionStatus === 'testing'}
              className="bg-[#00B2E3] hover:bg-[#00B2E3]/90 text-white"
            >
              {connectionStatus === 'testing' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Probar Conexión
            </Button>
            
            <Button 
              variant="outline"
              onClick={testAuth}
              disabled={authLoading}
              className="border-[#003057] text-[#003057] hover:bg-[#003057] hover:text-white"
            >
              {authLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Test Auth
            </Button>
          </div>
          
          <div className="text-xs text-[#003057]/50">
            <p>• <strong>Probar Conexión:</strong> Verifica si el servidor Laravel está accesible</p>
            <p>• <strong>Test Auth:</strong> Prueba los endpoints de autenticación (revisa la consola)</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#00B2E3]/20 bg-white/80 backdrop-blur-sm shadow-lg shadow-[#00B2E3]/10">
        <CardHeader>
          <CardTitle className="text-[#003057]">Información de Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-[#003057]/70">
          <div><strong>Entorno:</strong> {import.meta.env.VITE_APP_ENV || 'development'}</div>
          <div><strong>API Base URL:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}</div>
          <div><strong>App Name:</strong> {import.meta.env.VITE_APP_NAME || 'HACKADISC Frontend'}</div>
        </CardContent>
      </Card>
    </div>
  )
}
