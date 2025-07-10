import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { authService } from '@/services/api'
import { useMutation } from '@/hooks/useApi'
import { Loader2, CheckCircle, XCircle, Wifi, WifiOff } from 'lucide-react'

export default function ApiTestComponent() {
  const [connectionStatus, setConnectionStatus] = useState('idle')
  const { mutate, loading: mutateLoading } = useMutation()

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
      await mutate(authService.getProfile)
      console.log('✅ Auth test passed')
    } catch (error) {
      console.log('ℹ️ Auth test failed (expected if not logged in):', error.message)
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
        return <Badge className="bg-green-100 text-green-800">Conectado</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      case 'testing':
        return <Badge variant="outline">Probando...</Badge>
      default:
        return <Badge variant="secondary">Sin probar</Badge>
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            Test de Conexión API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
            {getStatusBadge()}
          </div>
          
          <div className="text-sm text-gray-600">
            <strong>URL de API:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={testConnection}
              disabled={connectionStatus === 'testing'}
            >
              {connectionStatus === 'testing' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Probar Conexión
            </Button>
            
            <Button 
              variant="outline"
              onClick={testAuth}
              disabled={mutateLoading}
            >
              {mutateLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Test Auth
            </Button>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>• <strong>Probar Conexión:</strong> Verifica si el servidor Laravel está accesible</p>
            <p>• <strong>Test Auth:</strong> Prueba los endpoints de autenticación (revisa la consola)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div><strong>Entorno:</strong> {import.meta.env.VITE_APP_ENV || 'development'}</div>
          <div><strong>API Base URL:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}</div>
          <div><strong>App Name:</strong> {import.meta.env.VITE_APP_NAME || 'HACKADISC Frontend'}</div>
        </CardContent>
      </Card>
    </div>
  )
}
