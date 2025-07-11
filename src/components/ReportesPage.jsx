import React, { useState } from 'react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Timer,
  Target,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Filter
} from 'lucide-react'

const ReportesPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('last3months')
  const [selectedClients, setSelectedClients] = useState(10) // Top N clientes
  const [sortBy, setSortBy] = useState('promedio') // promedio, ventas, riesgo

  // Generar datos de clientes más extensos
  const generateClientData = () => {
    const empresas = [
      'AMECO CHILE S.A', 'CODELCO Norte', 'Minera Los Pelambres', 'ENAP Refinerías', 
      'Empresas CMPC', 'Falabella', 'Cencosud', 'Banco de Chile', 'Banco Santander',
      'BCI', 'Sodimac', 'Ripley', 'La Polar', 'Walmart Chile', 'Unimarc',
      'Jumbo', 'Santa Isabel', 'Tottus', 'Mall Sport', 'Paris',
      'Hites', 'Johnson Controls', 'ABB Chile', 'Siemens', 'Schneider Electric',
      'Arauco', 'Masisa', 'Copec', 'Shell Chile', 'Petrobras',
      'Movistar', 'Entel', 'WOM', 'VTR', 'Claro Chile',
      'Chilquinta', 'CGE', 'Enel Chile', 'AES Gener', 'Colbun',
      'Metro S.A.', 'EFE', 'LATAM Airlines', 'Sky Airline', 'JetSmart',
      'Carozzi', 'Nestlé Chile', 'Unilever', 'Procter & Gamble', 'CCU'
    ]
    
    return empresas.map((empresa) => ({
      cliente: empresa,
      promedio: Math.round((Math.random() * 50 + 10) * 10) / 10,
      ventas: Math.floor(Math.random() * 100 + 5),
      montoTotal: Math.floor(Math.random() * 50000000 + 1000000),
      riesgo: Math.random() > 0.7 ? 'Alto' : Math.random() > 0.3 ? 'Medio' : 'Bajo',
      tendencia: Math.random() > 0.5 ? 'up' : 'down',
      color: Math.random() > 0.7 ? '#ef4444' : Math.random() > 0.3 ? '#f59e0b' : '#10b981'
    }))
  }

  const allClientData = generateClientData()
  
  // Función para obtener top N clientes según criterio
  const getTopClients = (data, limit = 10, sortCriteria = 'promedio') => {
    const sorted = [...data].sort((a, b) => {
      switch(sortCriteria) {
        case 'promedio': return b.promedio - a.promedio
        case 'ventas': return b.ventas - a.ventas
        case 'monto': return b.montoTotal - a.montoTotal
        case 'riesgo': {
          const riskValue = (r) => r === 'Alto' ? 3 : r === 'Medio' ? 2 : 1
          return riskValue(b.riesgo) - riskValue(a.riesgo)
        }
        default: return b.promedio - a.promedio
      }
    })
    return sorted.slice(0, limit)
  }

  // Datos calculados dinámicamente basados en el volumen real de clientes
  const tiemposPorEtapa = (() => {
    const totalClientes = allClientData.length
    const baseEficiencia = Math.max(0.7, Math.min(0.95, 1 - (totalClientes / 10000))) // Eficiencia decrece con volumen
    
    return [
      { 
        etapa: 'En Proceso → Terminada', 
        promedio: 12.5 + (totalClientes / 1000) * 0.5, // Aumenta ligeramente con volumen
        min: 1, 
        max: Math.min(120, 30 + (totalClientes / 100)), 
        clientes: Math.floor(totalClientes * 0.85), // 85% están en proceso activo
        mediana: 8.2 + (totalClientes / 2000) * 0.3
      },
      { 
        etapa: 'Terminada → Facturada', 
        promedio: 2.8 + (totalClientes / 5000) * 0.2, 
        min: 0.5, 
        max: Math.min(15, 8 + (totalClientes / 500)), 
        clientes: Math.floor(totalClientes * 0.72 * baseEficiencia), // 72% terminadas
        mediana: 2.1 + (totalClientes / 8000) * 0.1
      },
      { 
        etapa: 'Facturada → Pagada', 
        promedio: 28.3 + (totalClientes / 2000) * 1.2, // Esta etapa es más sensible al volumen
        min: 3, 
        max: Math.min(180, 60 + (totalClientes / 200)), 
        clientes: Math.floor(totalClientes * 0.65 * baseEficiencia), // 65% facturadas
        mediana: 22.5 + (totalClientes / 3000) * 0.8
      }
    ]
  })()

  const tiemposPorCliente = getTopClients(allClientData, selectedClients, sortBy)

  const tiemposPorLider = [
    { lider: 'Juan Pérez', promedioVenta: 14.2, promedioFactura: 2.1, promedioPago: 25.3, ventasTotal: 45 },
    { lider: 'María González', promedioVenta: 18.7, promedioFactura: 3.2, promedioPago: 31.8, ventasTotal: 38 },
    { lider: 'Carlos Rodríguez', promedioVenta: 11.9, promedioFactura: 1.8, promedioPago: 22.1, ventasTotal: 52 },
    { lider: 'Ana Martínez', promedioVenta: 16.4, promedioFactura: 2.7, promedioPago: 28.9, ventasTotal: 41 }
  ]

  const prediccionesPago = [
    { cliente: 'AMECO CHILE S.A', venta: 'VT-2025-001', monto: 2500000, fechaVenta: '2025-01-15', prediccion: '2025-02-12', probabilidad: 92, diasRestantes: 8 },
    { cliente: 'CODELCO Norte', venta: 'VT-2025-002', monto: 4200000, fechaVenta: '2025-01-20', prediccion: '2025-02-25', probabilidad: 78, diasRestantes: 21 },
    { cliente: 'Minera Los Pelambres', venta: 'VT-2025-003', monto: 1800000, fechaVenta: '2025-01-25', prediccion: '2025-03-15', probabilidad: 65, diasRestantes: 39 },
    { cliente: 'ENAP Refinerías', venta: 'VT-2025-004', monto: 3100000, fechaVenta: '2025-01-28', prediccion: '2025-02-20', probabilidad: 88, diasRestantes: 16 }
  ]

  const historialCliente = [
    { mes: 'Ene 2024', pagos: 3, promedio: 14.2, montoTotal: 7500000 },
    { mes: 'Feb 2024', pagos: 2, promedio: 18.5, montoTotal: 4200000 },
    { mes: 'Mar 2024', pagos: 4, promedio: 12.8, montoTotal: 9100000 },
    { mes: 'Abr 2024', pagos: 3, promedio: 16.1, montoTotal: 6800000 },
    { mes: 'May 2024', pagos: 5, promedio: 13.9, montoTotal: 11200000 },
    { mes: 'Jun 2024', pagos: 2, promedio: 21.3, montoTotal: 3900000 },
    { mes: 'Jul 2024', pagos: 4, promedio: 15.7, montoTotal: 8500000 },
    { mes: 'Ago 2024', pagos: 3, promedio: 17.2, montoTotal: 7200000 },
    { mes: 'Sep 2024', pagos: 6, promedio: 14.5, montoTotal: 12800000 },
    { mes: 'Oct 2024', pagos: 2, promedio: 22.1, montoTotal: 4100000 },
    { mes: 'Nov 2024', pagos: 4, promedio: 16.8, montoTotal: 8900000 },
    { mes: 'Dic 2024', pagos: 3, promedio: 19.4, montoTotal: 6600000 }
  ]

  // Calcular distribución de riesgo dinámicamente
  const distribucionRiesgo = (() => {
    const riskCounts = allClientData.reduce((acc, client) => {
      acc[client.riesgo] = (acc[client.riesgo] || 0) + 1
      return acc
    }, {})
    
    const total = allClientData.length
    return [
      { 
        categoria: 'Bajo Riesgo', 
        cantidad: riskCounts['Bajo'] || 0, 
        porcentaje: Math.round(((riskCounts['Bajo'] || 0) / total) * 100), 
        color: '#10b981' 
      },
      { 
        categoria: 'Riesgo Medio', 
        cantidad: riskCounts['Medio'] || 0, 
        porcentaje: Math.round(((riskCounts['Medio'] || 0) / total) * 100), 
        color: '#f59e0b' 
      },
      { 
        categoria: 'Alto Riesgo', 
        cantidad: riskCounts['Alto'] || 0, 
        porcentaje: Math.round(((riskCounts['Alto'] || 0) / total) * 100), 
        color: '#ef4444' 
      }
    ]
  })()

  const tendenciaTiempos = (() => {
    const meses = ['Jul 2024', 'Ago 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dic 2024', 'Ene 2025']
    let promedioBase = 32 // Empezar con un promedio alto
    
    return meses.map((mes, index) => {
      // Simular mejora gradual con fluctuaciones naturales
      const tendenciaMejora = index * -1.2 // Mejora gradual de 1.2 días por mes
      const variabilidad = (Math.random() - 0.5) * 4 // Fluctuación de ±2 días
      const factorEstacional = Math.sin(index * 0.8) * 1.5 // Variación estacional
      
      let promedio = promedioBase + tendenciaMejora + variabilidad + factorEstacional
      promedio = Math.max(20, Math.min(35, promedio)) // Rango realista
      
      const baseVolumen = Math.floor(allClientData.length * 0.15) // 15% de clientes por mes
      const variacionVolumen = Math.floor(Math.random() * 20) + 30 // +30-50 clientes adicionales
      
      return {
        mes,
        promedio: Number(promedio.toFixed(1)),
        ventasTerminadas: baseVolumen + variacionVolumen,
        pagosRecibidos: Math.floor((baseVolumen + variacionVolumen) * (0.85 + Math.random() * 0.1)) // 85-95% cobrado
      }
    })
  })()

  const tabs = [
    { id: 'overview', label: 'Resumen Ejecutivo', icon: BarChart3 },
    { id: 'stages', label: 'Tiempos por Etapa', icon: Timer },
    { id: 'clients', label: 'Análisis por Cliente', icon: Users },
    { id: 'leaders', label: 'Gestión por Líder', icon: Target },
    { id: 'predictions', label: 'Predicciones', icon: TrendingUp },
    { id: 'risk', label: 'Análisis de Riesgo', icon: AlertTriangle }
  ]

  // Funciones de formateo optimizadas para grandes volúmenes
  const formatCurrency = (amount) => {
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  const formatDays = (days) => {
    return `${days.toFixed(1)} días`
  }

  const getRiskBadge = (riesgo) => {
    const variants = {
      'Bajo': 'bg-green-100 text-green-800',
      'Medio': 'bg-yellow-100 text-yellow-800',
      'Alto': 'bg-red-100 text-red-800'
    }
    return variants[riesgo] || variants['Medio']
  }

  const renderOverview = () => {
    // Calcular estadísticas dinámicas
    const totalClientes = allClientData.length
    const promedioGeneral = allClientData.reduce((sum, client) => sum + client.promedio, 0) / totalClientes
    const clientesAltoRiesgo = allClientData.filter(c => c.riesgo === 'Alto').length
    const montoTotalGestionado = allClientData.reduce((sum, client) => sum + client.montoTotal, 0)
    
    return (
      <div className="space-y-6">
        {/* KPIs principales mejorados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{formatDays(promedioGeneral)}</div>
                  <p className="text-sm text-gray-600">Tiempo promedio global</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{totalClientes.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total clientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-600">{clientesAltoRiesgo}</div>
                  <p className="text-sm text-gray-600">Clientes alto riesgo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-xl font-bold text-green-600">{formatCurrency(montoTotalGestionado)}</div>
                  <p className="text-sm text-gray-600">Monto total gestionado</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {((totalClientes - clientesAltoRiesgo) / totalClientes * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600">Tasa de confiabilidad</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de tendencia general */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Tiempos de Pago</CardTitle>
            <CardDescription>Evolución del tiempo promedio de pago en los últimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tendenciaTiempos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis label={{ value: 'Días promedio', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [formatDays(value), 'Tiempo promedio']} />
                <Legend />
                <Line type="monotone" dataKey="promedio" stroke="#3b82f6" strokeWidth={3} name="Días promedio" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribución de riesgo y estadísticas por etapa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Categoría de Riesgo</CardTitle>
              <CardDescription>Clasificación de {totalClientes.toLocaleString()} clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={distribucionRiesgo}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="cantidad"
                    label={({ categoria, porcentaje }) => `${categoria}: ${porcentaje}%`}
                  >
                    {distribucionRiesgo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Clientes']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eficiencia por Etapa del Proceso</CardTitle>
              <CardDescription>Tiempo promedio y volumen procesado por fase</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={tiemposPorEtapa}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="etapa" angle={-20} textAnchor="end" height={80} />
                  <YAxis label={{ value: 'Días', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'promedio' ? formatDays(value) : value,
                      name === 'promedio' ? 'Tiempo promedio' : 'Clientes procesados'
                    ]} 
                  />
                  <Legend />
                  <Bar dataKey="promedio" fill="#3b82f6" name="Promedio (días)" />
                  <Bar dataKey="mediana" fill="#10b981" name="Mediana (días)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabla resumen de estadísticas clave */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen Estadístico por Etapa</CardTitle>
            <CardDescription>Estadísticas detalladas del proceso completo con {totalClientes.toLocaleString()} clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Etapa del Proceso</th>
                    <th className="text-right p-3">Promedio</th>
                    <th className="text-right p-3">Mediana</th>
                    <th className="text-right p-3">Mínimo</th>
                    <th className="text-right p-3">Máximo</th>
                    <th className="text-right p-3">Clientes</th>
                    <th className="text-center p-3">Eficiencia</th>
                  </tr>
                </thead>
                <tbody>
                  {tiemposPorEtapa.map((etapa, index) => {
                    const eficiencia = etapa.promedio <= 15 ? 'Excelente' : etapa.promedio <= 30 ? 'Buena' : 'Mejorable'
                    const eficienciaColor = eficiencia === 'Excelente' ? 'bg-green-100 text-green-800' : 
                                          eficiencia === 'Buena' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{etapa.etapa}</td>
                        <td className="p-3 text-right font-semibold">{formatDays(etapa.promedio)}</td>
                        <td className="p-3 text-right text-blue-600">{formatDays(etapa.mediana)}</td>
                        <td className="p-3 text-right text-green-600">{formatDays(etapa.min)}</td>
                        <td className="p-3 text-right text-red-600">{formatDays(etapa.max)}</td>
                        <td className="p-3 text-right">{etapa.clientes.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <Badge className={eficienciaColor}>{eficiencia}</Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderStages = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análisis Detallado por Etapas</CardTitle>
          <CardDescription>Tiempos promedio, mínimos y máximos en cada fase del proceso de venta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Etapa del Proceso</th>
                  <th className="text-right p-3">Tiempo Promedio</th>
                  <th className="text-right p-3">Tiempo Mínimo</th>
                  <th className="text-right p-3">Tiempo Máximo</th>
                  <th className="text-right p-3">Clientes</th>
                  <th className="text-center p-3">Eficiencia</th>
                </tr>
              </thead>
              <tbody>
                {tiemposPorEtapa.map((etapa, index) => {
                  const eficiencia = etapa.promedio <= 15 ? 'Excelente' : etapa.promedio <= 30 ? 'Buena' : 'Mejorable'
                  const eficienciaColor = eficiencia === 'Excelente' ? 'bg-green-100 text-green-800' : 
                                        eficiencia === 'Buena' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{etapa.etapa}</td>
                      <td className="p-3 text-right font-semibold">{formatDays(etapa.promedio)}</td>
                      <td className="p-3 text-right text-green-600">{formatDays(etapa.min)}</td>
                      <td className="p-3 text-right text-red-600">{formatDays(etapa.max)}</td>
                      <td className="p-3 text-right">{etapa.clientes}</td>
                      <td className="p-3 text-center">
                        <Badge className={eficienciaColor}>{eficiencia}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparativa de Etapas</CardTitle>
          <CardDescription>Visualización de los tiempos en cada fase</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tiemposPorEtapa}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="etapa" angle={-45} textAnchor="end" height={100} />
              <YAxis label={{ value: 'Días', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [formatDays(value), 'Días']} />
              <Legend />
              <Bar dataKey="min" fill="#10b981" name="Mínimo" />
              <Bar dataKey="promedio" fill="#3b82f6" name="Promedio" />
              <Bar dataKey="max" fill="#ef4444" name="Máximo" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  const renderClients = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Ranking de Clientes por Tiempo de Pago</CardTitle>
              <CardDescription>
                Mostrando los {selectedClients} principales clientes ordenados por {sortBy}. 
                Total de clientes en la base: {allClientData.length}
              </CardDescription>
            </div>
            <div className="text-sm text-gray-500">
              Filtros aplicados: {selectedClients} de {allClientData.length} clientes
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Ranking</th>
                  <th className="text-left p-3">Cliente</th>
                  <th className="text-right p-3">Tiempo Promedio</th>
                  <th className="text-right p-3">Ventas Totales</th>
                  <th className="text-right p-3">Monto Total</th>
                  <th className="text-center p-3">Nivel de Riesgo</th>
                  <th className="text-center p-3">Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {tiemposPorCliente.map((cliente, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-bold text-gray-500">#{index + 1}</td>
                    <td className="p-3 font-medium">{cliente.cliente}</td>
                    <td className="p-3 text-right font-semibold" style={{ color: cliente.color }}>
                      {formatDays(cliente.promedio)}
                    </td>
                    <td className="p-3 text-right">{cliente.ventas}</td>
                    <td className="p-3 text-right">{formatCurrency(cliente.montoTotal)}</td>
                    <td className="p-3 text-center">
                      <Badge className={getRiskBadge(cliente.riesgo)}>{cliente.riesgo}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      {cliente.tendencia === 'up' ? (
                        <TrendingUp className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de barras horizontal para mejor legibilidad */}
      <Card>
        <CardHeader>
          <CardTitle>Visualización de Tiempos de Pago - Top {selectedClients}</CardTitle>
          <CardDescription>
            Gráfico optimizado para visualizar múltiples clientes de forma clara
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={Math.max(400, selectedClients * 25)}>
            <BarChart data={tiemposPorCliente} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" label={{ value: 'Días promedio', position: 'insideBottom', offset: -5 }} />
              <YAxis 
                type="category" 
                dataKey="cliente" 
                width={150}
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <Tooltip 
                formatter={(value) => [formatDays(value), 'Tiempo promedio']}
                labelFormatter={(label) => `Cliente: ${label}`}
              />
              <Bar 
                dataKey="promedio" 
                fill={(entry) => entry.color || '#8884d8'}
                name="Días promedio"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos por Cliente</CardTitle>
          <CardDescription>Ejemplo: {tiemposPorCliente[0]?.cliente || 'Cliente'} - Comportamiento en los últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historialCliente}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis yAxisId="left" label={{ value: 'Días promedio', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Monto (CLP)', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'promedio' ? formatDays(value) : formatCurrency(value),
                  name === 'promedio' ? 'Días promedio' : 'Monto total'
                ]}
              />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="promedio" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Días promedio" />
              <Bar yAxisId="right" dataKey="montoTotal" fill="#10b981" name="Monto total" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  const renderLeaders = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance por Líder Comercial</CardTitle>
          <CardDescription>Análisis de gestión y eficiencia por líder de ventas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tiemposPorLider}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="lider" />
              <YAxis label={{ value: 'Días promedio', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [formatDays(value), 'Días']} />
              <Legend />
              <Bar dataKey="promedioVenta" fill="#8884d8" name="Venta → Terminada" />
              <Bar dataKey="promedioFactura" fill="#82ca9d" name="Terminada → Facturada" />
              <Bar dataKey="promedioPago" fill="#ffc658" name="Facturada → Pagada" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ranking de Eficiencia</CardTitle>
          <CardDescription>Desempeño comparativo de los líderes comerciales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Líder Comercial</th>
                  <th className="text-right p-3">Ventas Gestionadas</th>
                  <th className="text-right p-3">Tiempo Venta</th>
                  <th className="text-right p-3">Tiempo Facturación</th>
                  <th className="text-right p-3">Tiempo Cobro</th>
                  <th className="text-center p-3">Eficiencia General</th>
                </tr>
              </thead>
              <tbody>
                {tiemposPorLider
                  .sort((a, b) => (a.promedioVenta + a.promedioFactura + a.promedioPago) - (b.promedioVenta + b.promedioFactura + b.promedioPago))
                  .map((lider, index) => {
                    const tiempoTotal = lider.promedioVenta + lider.promedioFactura + lider.promedioPago
                    const eficiencia = tiempoTotal <= 35 ? 'Excelente' : tiempoTotal <= 50 ? 'Buena' : 'Mejorable'
                    const eficienciaColor = eficiencia === 'Excelente' ? 'bg-green-100 text-green-800' : 
                                          eficiencia === 'Buena' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{lider.lider}</td>
                        <td className="p-3 text-right">{lider.ventasTotal}</td>
                        <td className="p-3 text-right">{formatDays(lider.promedioVenta)}</td>
                        <td className="p-3 text-right">{formatDays(lider.promedioFactura)}</td>
                        <td className="p-3 text-right">{formatDays(lider.promedioPago)}</td>
                        <td className="p-3 text-center">
                          <Badge className={eficienciaColor}>{eficiencia}</Badge>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPredictions = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Predicciones de Pago</CardTitle>
          <CardDescription>Estimaciones de cuándo se recibirán los pagos de ventas pendientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Cliente</th>
                  <th className="text-left p-3">Venta</th>
                  <th className="text-right p-3">Monto</th>
                  <th className="text-right p-3">Fecha Venta</th>
                  <th className="text-right p-3">Predicción Pago</th>
                  <th className="text-right p-3">Días Restantes</th>
                  <th className="text-center p-3">Probabilidad</th>
                </tr>
              </thead>
              <tbody>
                {prediccionesPago.map((prediccion, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{prediccion.cliente}</td>
                    <td className="p-3">{prediccion.venta}</td>
                    <td className="p-3 text-right font-semibold">{formatCurrency(prediccion.monto)}</td>
                    <td className="p-3 text-right">{prediccion.fechaVenta}</td>
                    <td className="p-3 text-right">{prediccion.prediccion}</td>
                    <td className="p-3 text-right">
                      <span className={prediccion.diasRestantes <= 15 ? 'text-green-600' : prediccion.diasRestantes <= 30 ? 'text-yellow-600' : 'text-red-600'}>
                        {prediccion.diasRestantes} días
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Badge className={prediccion.probabilidad >= 85 ? 'bg-green-100 text-green-800' : prediccion.probabilidad >= 70 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                        {prediccion.probabilidad}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flujo de Caja Proyectado</CardTitle>
          <CardDescription>Ingresos esperados basados en las predicciones</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={[
              { fecha: '2025-02-01', acumulado: 0, semanal: 0 },
              { fecha: '2025-02-08', acumulado: 2500000, semanal: 2500000 },
              { fecha: '2025-02-15', acumulado: 5600000, semanal: 3100000 },
              { fecha: '2025-02-22', acumulado: 5600000, semanal: 0 },
              { fecha: '2025-03-01', acumulado: 9800000, semanal: 4200000 },
              { fecha: '2025-03-08', acumulado: 9800000, semanal: 0 },
              { fecha: '2025-03-15', acumulado: 11600000, semanal: 1800000 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis label={{ value: 'Monto (CLP)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [formatCurrency(value), 'Monto']} />
              <Legend />
              <Area type="monotone" dataKey="acumulado" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Acumulado" />
              <Bar dataKey="semanal" fill="#10b981" name="Semanal" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  const renderRisk = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Riesgo Crediticio</CardTitle>
          <CardDescription>Evaluación del riesgo de demora en pagos por cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionRiesgo}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="cantidad"
                  label={({ porcentaje }) => `${porcentaje}%`}
                >
                  {distribucionRiesgo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Clientes']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              {distribucionRiesgo.map((categoria, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: categoria.color }}></div>
                    <span className="font-medium">{categoria.categoria}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{categoria.cantidad} clientes</div>
                    <div className="text-sm text-gray-600">{categoria.porcentaje}% del total</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alertas y Recomendaciones</CardTitle>
          <CardDescription>Clientes que requieren atención especial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
              <div>
                <h4 className="font-semibold text-red-800">Alto Riesgo Detectado</h4>
                <p className="text-red-700">Minera Los Pelambres y Cencosud han excedido 40 días promedio. Considerar seguimiento especial.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-800">Seguimiento Requerido</h4>
                <p className="text-yellow-700">CODELCO Norte y Empresas CMPC muestran tendencia al alza en tiempos de pago.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-green-800">Clientes Confiables</h4>
                <p className="text-green-700">AMECO CHILE S.A y Banco de Chile mantienen excelente comportamiento de pago.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header con controles de filtrado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes de Análisis de Pagos</h1>
          <p className="text-muted-foreground">
            Análisis integral de tiempos de pago y comportamiento de clientes
          </p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={selectedClients} 
            onChange={(e) => setSelectedClients(Number(e.target.value))}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value={10}>Top 10 Clientes</option>
            <option value={25}>Top 25 Clientes</option>
            <option value={50}>Top 50 Clientes</option>
            <option value={100}>Top 100 Clientes</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="promedio">Ordenar por Tiempo Promedio</option>
            <option value="ventas">Ordenar por Ventas</option>
            <option value="monto">Ordenar por Monto</option>
            <option value="riesgo">Ordenar por Riesgo</option>
          </select>
          
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="last3months">Últimos 3 meses</option>
            <option value="last6months">Últimos 6 meses</option>
            <option value="lastyear">Último año</option>
            <option value="all">Todo el período</option>
          </select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'stages' && renderStages()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'leaders' && renderLeaders()}
        {activeTab === 'predictions' && renderPredictions()}
        {activeTab === 'risk' && renderRisk()}
      </div>
    </div>
  )
}

export default ReportesPage
