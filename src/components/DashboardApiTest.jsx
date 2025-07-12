import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'
import { dashboardService, dashboardCustomService } from '@/services/api'

const DashboardApiTest = () => {
  const [testResults, setTestResults] = useState({})
  const [isTestingAll, setIsTestingAll] = useState(false)

  // Lista de endpoints principales para probar
  const endpoints = [
    { 
      key: 'completo', 
      name: 'Dashboard Completo', 
      service: dashboardService.getCompleto,
      description: 'Todos los datos del dashboard'
    },
    { 
      key: 'resumenAnual', 
      name: 'Resumen Anual', 
      service: dashboardService.getResumenAnual,
      description: 'Resumen de todos los años'
    },
    { 
      key: 'ventasMes', 
      name: 'Ventas por Mes', 
      service: dashboardService.getVentasMes,
      description: 'Ventas mensuales históricas'
    },
    { 
      key: 'tiempoPago', 
      name: 'Tiempo de Pago Promedio', 
      service: dashboardService.getTiempoPagoPromedio,
      description: 'Análisis de tiempos de pago'
    },
    { 
      key: 'morosidadClientes', 
      name: 'Morosidad por Cliente', 
      service: dashboardService.getMorosidadClientes,
      description: 'Análisis de morosidad'
    },
    { 
      key: 'tiempoEtapas', 
      name: 'Tiempo entre Etapas', 
      service: dashboardService.getTiempoEtapas,
      description: 'Análisis de etapas 0→1'
    },
    { 
      key: 'distribucionPagos', 
      name: 'Distribución de Pagos', 
      service: dashboardService.getDistribucionPagos,
      description: 'Distribución de tiempos'
    },
    { 
      key: 'eficienciaFlujo', 
      name: 'Eficiencia por Flujo', 
      service: dashboardService.getEficienciaFlujo,
      description: 'Análisis de eficiencia'
    }
  ]

  // Endpoints custom para probar con parámetros
  const customEndpoints = [
    { 
      key: 'ventasMesCustom', 
      name: 'Ventas Mes Custom', 
      service: () => dashboardCustomService.getVentasMesCustom({ año: 2024, mes_inicio: 1, mes_fin: 6 }),
      description: 'Con filtros: año=2024, meses 1-6'
    },
    { 
      key: 'morosidadCustom', 
      name: 'Morosidad Custom', 
      service: () => dashboardCustomService.getMorosidadCustom({ año: 2024, tipo_factura: 'cliente' }),
      description: 'Con filtros: año=2024, tipo cliente'
    }
  ]

  const testEndpoint = async (endpoint) => {
    setTestResults(prev => ({
      ...prev,
      [endpoint.key]: { status: 'testing', data: null, error: null, time: 0 }
    }))

    const startTime = Date.now()
    
    try {
      const response = await endpoint.service()
      const endTime = Date.now()
      
      setTestResults(prev => ({
        ...prev,
        [endpoint.key]: { 
          status: 'success', 
          data: response, 
          error: null,
          time: endTime - startTime
        }
      }))
    } catch (error) {
      const endTime = Date.now()
      
      setTestResults(prev => ({
        ...prev,
        [endpoint.key]: { 
          status: 'error', 
          data: null, 
          error: error.message,
          time: endTime - startTime
        }
      }))
    }
  }

  const testAllEndpoints = async () => {
    setIsTestingAll(true)
    
    // Probar endpoints principales
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint)
      // Pequeña pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    // Probar endpoints custom
    for (const endpoint of customEndpoints) {
      await testEndpoint(endpoint)
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setIsTestingAll(false)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'testing':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'testing':
        return <Badge variant="outline" className="text-yellow-600">Probando...</Badge>
      case 'success':
        return <Badge className="bg-green-500">Exitoso</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">No probado</Badge>
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-[#003057]">
          🧪 Prueba de API Dashboard
        </h1>
        <p className="text-gray-600">
          Prueba la conectividad con los endpoints de análisis de ventas y pagos
        </p>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={testAllEndpoints}
            disabled={isTestingAll}
            className="bg-[#00B2E3] hover:bg-[#0037FF]"
          >
            {isTestingAll ? 'Probando...' : 'Probar Todos los Endpoints'}
          </Button>
        </div>
      </div>

      {/* Información de configuración */}
      <Card>
        <CardHeader>
          <CardTitle>🔧 Configuración Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div><strong>URL Base:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}</div>
            <div><strong>Endpoints principales:</strong> {endpoints.length}</div>
            <div><strong>Endpoints con filtros:</strong> {customEndpoints.length}</div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados de endpoints principales */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Endpoints Principales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {endpoints.map((endpoint) => {
              const result = testResults[endpoint.key]
              
              return (
                <div key={endpoint.key} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result?.status)}
                      <h3 className="font-semibold text-sm">{endpoint.name}</h3>
                    </div>
                    {getStatusBadge(result?.status)}
                  </div>
                  
                  <p className="text-xs text-gray-600">{endpoint.description}</p>
                  
                  {result?.time && (
                    <p className="text-xs text-gray-500">
                      Tiempo: {result.time}ms
                    </p>
                  )}
                  
                  {result?.error && (
                    <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                      Error: {result.error}
                    </p>
                  )}
                  
                  {result?.data && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-blue-600">Ver datos</summary>
                      <pre className="mt-2 bg-gray-50 p-2 rounded max-h-32 overflow-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => testEndpoint(endpoint)}
                    disabled={result?.status === 'testing'}
                  >
                    Probar
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resultados de endpoints custom */}
      <Card>
        <CardHeader>
          <CardTitle>🎛️ Endpoints con Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customEndpoints.map((endpoint) => {
              const result = testResults[endpoint.key]
              
              return (
                <div key={endpoint.key} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result?.status)}
                      <h3 className="font-semibold text-sm">{endpoint.name}</h3>
                    </div>
                    {getStatusBadge(result?.status)}
                  </div>
                  
                  <p className="text-xs text-gray-600">{endpoint.description}</p>
                  
                  {result?.time && (
                    <p className="text-xs text-gray-500">
                      Tiempo: {result.time}ms
                    </p>
                  )}
                  
                  {result?.error && (
                    <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                      Error: {result.error}
                    </p>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => testEndpoint(endpoint)}
                    disabled={result?.status === 'testing'}
                  >
                    Probar
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resumen de resultados */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Resumen de Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Object.values(testResults).filter(r => r.status === 'success').length}
              </div>
              <div className="text-sm text-gray-600">Exitosos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {Object.values(testResults).filter(r => r.status === 'error').length}
              </div>
              <div className="text-sm text-gray-600">Errores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {Object.values(testResults).filter(r => r.status === 'testing').length}
              </div>
              <div className="text-sm text-gray-600">En progreso</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {endpoints.length + customEndpoints.length - Object.keys(testResults).length}
              </div>
              <div className="text-sm text-gray-600">Sin probar</div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default DashboardApiTest
