import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buildApiUrl, getAuthHeaders } from '@/config/api'
import { 
  Upload, 
  Users, 
  ShoppingCart, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  FileText 
} from 'lucide-react'

export default function ImportJsonComponent() {
  const [usuariosFile, setUsuariosFile] = useState(null)
  const [ventasFile, setVentasFile] = useState(null)
  const [uploading, setUploading] = useState({ usuarios: false, ventas: false })
  const [results, setResults] = useState({ usuarios: null, ventas: null })
  const [debugInfo, setDebugInfo] = useState(null)

  // Mostrar información de debug del entorno
  React.useEffect(() => {
    setDebugInfo({
      environment: import.meta.env.MODE,
      apiUrl: import.meta.env.VITE_API_URL,
      productionUrl: import.meta.env.VITE_API_PRODUCTION_URL,
      currentBaseUrl: buildApiUrl(''),
      hasAuthToken: !!(localStorage.getItem('auth_token') || localStorage.getItem('token'))
    })
  }, [])

  const handleFileChange = (type, file) => {
    if (type === 'usuarios') {
      setUsuariosFile(file)
      setResults(prev => ({ ...prev, usuarios: null }))
    } else {
      setVentasFile(file)
      setResults(prev => ({ ...prev, ventas: null }))
    }
  }

  const importData = async (type) => {
    const file = type === 'usuarios' ? usuariosFile : ventasFile
    if (!file) return

    // Validar que sea un archivo JSON
    if (!file.name.endsWith('.json')) {
      setResults(prev => ({
        ...prev,
        [type]: { success: false, message: 'El archivo debe ser un JSON válido (.json)' }
      }))
      return
    }

    // Validar que el archivo contenga JSON válido
    try {
      const fileText = await file.text()
      JSON.parse(fileText)
      console.log('✅ Archivo JSON válido:', {
        fileName: file.name,
        size: file.size,
        preview: fileText.substring(0, 100) + '...'
      })
    } catch (jsonError) {
      console.error('❌ Archivo JSON inválido:', jsonError)
      setResults(prev => ({
        ...prev,
        [type]: { 
          success: false, 
          message: 'El archivo no contiene JSON válido',
          error: jsonError.message
        }
      }))
      return
    }

    setUploading(prev => ({ ...prev, [type]: true }))
    
    try {
      const formData = new FormData()
      formData.append('archivos', file)

      const endpoint = type === 'usuarios' ? '/importarUsuariosJson' : '/importarVentasJson'
      const apiUrl = buildApiUrl(endpoint)
      const headers = getAuthHeaders(true)
      
      console.log('🚀 Enviando importación:', {
        type,
        fileName: file.name,
        fileSize: file.size,
        endpoint,
        apiUrl,
        headers,
        environment: import.meta.env.MODE,
        baseUrl: import.meta.env.VITE_API_URL,
        productionUrl: import.meta.env.VITE_API_PRODUCTION_URL
      })

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: formData
      })

      console.log('📡 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      })

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error('❌ Error parseando JSON de respuesta:', jsonError)
        const textResponse = await response.text()
        console.error('📄 Respuesta como texto:', textResponse)
        throw new Error(`Error del servidor (${response.status}): ${response.statusText}. Respuesta: ${textResponse.substring(0, 200)}`)
      }

      if (response.ok) {
        console.log('✅ Importación exitosa:', data)
        setResults(prev => ({
          ...prev,
          [type]: {
            success: true,
            message: data.message || `${type} importados correctamente`,
            details: data
          }
        }))
        // Limpiar el archivo después de la importación exitosa
        if (type === 'usuarios') setUsuariosFile(null)
        else setVentasFile(null)
      } else {
        console.error('❌ Error en importación:', {
          status: response.status,
          data
        })
        setResults(prev => ({
          ...prev,
          [type]: {
            success: false,
            message: data.message || `Error al importar ${type}`,
            error: data.error || data.errors || data
          }
        }))
      }
    } catch (error) {
      console.error(`Error importing ${type}:`, error)
      setResults(prev => ({
        ...prev,
        [type]: {
          success: false,
          message: `Error de conexión al importar ${type}`,
          error: error.message
        }
      }))
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }))
    }
  }

  const ResultMessage = ({ result }) => {
    if (!result) return null

    return (
      <div className={`mt-4 p-4 rounded-lg border ${
        result.success 
          ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200' 
          : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          {result.success ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <span className="font-medium">{result.message}</span>
        </div>
        
        {result.details && result.success && (
          <div className="text-sm mt-2">
            {result.details.total && (
              <p>Total procesados: <span className="font-semibold">{result.details.total}</span></p>
            )}
            {result.details.created && (
              <p>Creados: <span className="font-semibold text-green-600">{result.details.created}</span></p>
            )}
            {result.details.updated && (
              <p>Actualizados: <span className="font-semibold text-blue-600">{result.details.updated}</span></p>
            )}
          </div>
        )}
        
        {result.error && (
          <div className="text-sm mt-2">
            <p className="font-medium">Detalles del error:</p>
            <pre className="mt-1 text-xs bg-red-100 dark:bg-red-900/30 p-2 rounded overflow-auto">
              {typeof result.error === 'object' ? JSON.stringify(result.error, null, 2) : result.error}
            </pre>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Importación de Datos JSON
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Importa usuarios y ventas desde archivos JSON a la base de datos de producción
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Importar Usuarios */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Importar Usuarios
              <Badge variant="outline" className="ml-auto">JSON</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seleccionar archivo de usuarios
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileChange('usuarios', e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                />
              </div>
              {usuariosFile && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <FileText className="w-4 h-4" />
                  {usuariosFile.name} ({(usuariosFile.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>

            <Button
              onClick={() => importData('usuarios')}
              disabled={!usuariosFile || uploading.usuarios}
              className="w-full"
              size="lg"
            >
              {uploading.usuarios ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Importando usuarios...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Importar Usuarios
                </>
              )}
            </Button>

            <ResultMessage result={results.usuarios} />
          </CardContent>
        </Card>

        {/* Importar Ventas */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              Importar Ventas
              <Badge variant="outline" className="ml-auto">JSON</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seleccionar archivo de ventas
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileChange('ventas', e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900/20 dark:file:text-green-400"
                />
              </div>
              {ventasFile && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <FileText className="w-4 h-4" />
                  {ventasFile.name} ({(ventasFile.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>

            <Button
              onClick={() => importData('ventas')}
              disabled={!ventasFile || uploading.ventas}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {uploading.ventas ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Importando ventas...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Importar Ventas
                </>
              )}
            </Button>

            <ResultMessage result={results.ventas} />
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-2">Instrucciones de uso:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Los archivos deben estar en formato JSON válido</li>
                <li>Asegúrate de tener permisos de administrador</li>
                <li>Los datos se procesarán e insertarán en la base de datos de producción</li>
                <li>Se mostrarán estadísticas detalladas del proceso de importación</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de Debug */}
      {debugInfo && (
        <Card className="bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-sm">
              <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">🔧 Información de Debug:</p>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400">
                <div>
                  <strong>Entorno:</strong> {debugInfo.environment}
                </div>
                <div>
                  <strong>URL Base:</strong> {debugInfo.currentBaseUrl}
                </div>
                <div>
                  <strong>Token Auth:</strong> {debugInfo.hasAuthToken ? '✅ Presente' : '❌ Ausente'}
                </div>
                <div>
                  <strong>API Desarrollo:</strong> {debugInfo.apiUrl || 'No configurada'}
                </div>
                <div className="col-span-2">
                  <strong>API Producción:</strong> {debugInfo.productionUrl || 'No configurada'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
