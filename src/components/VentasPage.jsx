import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from './ui/card'
import { Badge } from './ui/badge'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  MapPin,
  Users,
  FileText,
  Activity,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

const VentasPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedEstado, setSelectedEstado] = useState('all')
  const [loading, setLoading] = useState(false)

  // Datos de ventas mensuales basados en la imagen proporcionada
  const ventasMensuales = [
    { mes: 'Julio 2024', monto: 210136595, ventas: 45, promedioVenta: 4669702, region: 'Todas' },
    { mes: 'Agosto 2024', monto: 210803987, ventas: 52, promedioVenta: 4053923, region: 'Todas' },
    { mes: 'Septiembre 2024', monto: 195486403, ventas: 38, promedioVenta: 5144379, region: 'Todas' },
    { mes: 'Octubre 2024', monto: 236887859, ventas: 61, promedioVenta: 3883080, region: 'Todas' },
    { mes: 'Noviembre 2024', monto: 265686153, ventas: 43, promedioVenta: 6180376, region: 'Todas' },
    { mes: 'Diciembre 2024', monto: 310943221, ventas: 49, promedioVenta: 6346800, region: 'Todas' },
    { mes: 'Enero 2025', monto: 335386493, ventas: 55, promedioVenta: 6097936, region: 'Todas' },
    { mes: 'Febrero 2025', monto: 239666906, ventas: 41, promedioVenta: 5845290, region: 'Todas' },
    { mes: 'Marzo 2025', monto: 264930809, ventas: 47, promedioVenta: 5635976, region: 'Todas' },
    { mes: 'Abril 2025', monto: 289037704, ventas: 53, promedioVenta: 5453542, region: 'Todas' },
    { mes: 'Mayo 2025', monto: 327891545, ventas: 59, promedioVenta: 5557486, region: 'Todas' },
    { mes: 'Junio 2025', monto: 264600943, ventas: 44, promedioVenta: 6013658, region: 'Todas' }
  ]

  // Generar datos detallados de ventas simulando el dataset real
  const generateVentasDetalladas = () => {
    const regiones = [
      { codigo: 'CAL', nombre: 'Calama', factor: 1.2 },
      { codigo: 'ANT', nombre: 'Antofagasta', factor: 1.5 },
      { codigo: 'STG', nombre: 'Santiago', factor: 2.1 }
    ]
    
    const estados = ['En Proceso', 'Terminado', 'Terminado Sence']
    const tiposComercializacion = ['VEN', 'SER', 'CON', 'PRO', 'CAP', 'INS']
    
    const ventas = []
    let ventaId = 1

    ventasMensuales.forEach((mesData, mesIndex) => {
      const ventasDelMes = mesData.ventas
      
      for (let i = 0; i < ventasDelMes; i++) {
        const region = regiones[Math.floor(Math.random() * regiones.length)]
        const estado = estados[Math.floor(Math.random() * estados.length)]
        const tipoComercializacion = tiposComercializacion[Math.floor(Math.random() * tiposComercializacion.length)]
        
        // Generar código de cotización válido (sin ADI, OTR, SPD)
        const codigoCotizacion = `${tipoComercializacion}-${region.codigo}-${new Date().getFullYear()}-${String(ventaId).padStart(4, '0')}`
        
        // Calcular monto basado en el promedio del mes con variación
        const montoBase = mesData.promedioVenta
        const variacion = (Math.random() - 0.5) * 0.4 // ±20% de variación
        const monto = Math.floor(montoBase * (1 + variacion) * region.factor)
        
        // Fecha aleatoria dentro del mes
        const fechaInicio = new Date(2024 + Math.floor(mesIndex / 12), mesIndex % 12, Math.floor(Math.random() * 28) + 1)
        
        ventas.push({
          id: ventaId,
          codigoCotizacion,
          cliente: `Cliente ${region.nombre} ${ventaId}`,
          monto,
          fechaInicio: fechaInicio.toISOString().split('T')[0],
          estado,
          region: region.nombre,
          codigoRegion: region.codigo,
          mes: mesData.mes,
          ejecutivo: `Ejecutivo ${Math.floor(Math.random() * 10) + 1}`,
          tipoServicio: ['Capacitación', 'Consultoría', 'Certificación', 'Auditoría'][Math.floor(Math.random() * 4)],
          duracionDias: Math.floor(Math.random() * 30) + 5,
          probabilidadCierre: Math.floor(Math.random() * 40) + 60, // 60-100%
          ultimaActividad: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        })
        
        ventaId++
      }
    })
    
    return ventas
  }

  const ventasDetalladas = generateVentasDetalladas()

  // Calcular estadísticas
  const estadisticas = {
    totalVentas: ventasDetalladas.length,
    montoTotal: ventasDetalladas.reduce((sum, venta) => sum + venta.monto, 0),
    promedioVenta: ventasDetalladas.reduce((sum, venta) => sum + venta.monto, 0) / ventasDetalladas.length,
    ventasEnProceso: ventasDetalladas.filter(v => v.estado === 'En Proceso').length,
    ventasTerminadas: ventasDetalladas.filter(v => v.estado === 'Terminado').length,
    ventasTerminadasSence: ventasDetalladas.filter(v => v.estado === 'Terminado Sence').length
  }

  // Distribución por región
  const distribucionRegion = [
    { region: 'Santiago', ventas: ventasDetalladas.filter(v => v.region === 'Santiago').length, color: '#3b82f6' },
    { region: 'Antofagasta', ventas: ventasDetalladas.filter(v => v.region === 'Antofagasta').length, color: '#10b981' },
    { region: 'Calama', ventas: ventasDetalladas.filter(v => v.region === 'Calama').length, color: '#f59e0b' }
  ]

  // Distribución por estado
  const distribucionEstado = [
    { estado: 'En Proceso', cantidad: estadisticas.ventasEnProceso, color: '#f59e0b' },
    { estado: 'Terminado', cantidad: estadisticas.ventasTerminadas, color: '#10b981' },
    { estado: 'Terminado Sence', cantidad: estadisticas.ventasTerminadasSence, color: '#3b82f6' }
  ]

  // Funciones de formateo
  const formatCurrency = (amount) => {
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL')
  }

  const getEstadoBadge = (estado) => {
    const variants = {
      'En Proceso': 'bg-yellow-100 text-yellow-800',
      'Terminado': 'bg-green-100 text-green-800',
      'Terminado Sence': 'bg-blue-100 text-blue-800'
    }
    return variants[estado] || variants['En Proceso']
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header con controles */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Ventas</h1>
          <p className="text-gray-600 mt-1">
            Análisis completo de ventas mensuales y comercializaciones activas
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
          <button 
            onClick={() => setLoading(!loading)}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todos los períodos</option>
                <option value="2024">Año 2024</option>
                <option value="2025">Año 2025</option>
                <option value="lastQuarter">Último trimestre</option>
                <option value="thisMonth">Este mes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Región</label>
              <select 
                value={selectedRegion} 
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todas las regiones</option>
                <option value="STG">Santiago</option>
                <option value="ANT">Antofagasta</option>
                <option value="CAL">Calama</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select 
                value={selectedEstado} 
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todos los estados</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Terminado">Terminado</option>
                <option value="Terminado Sence">Terminado Sence</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(estadisticas.montoTotal)}
                </div>
                <p className="text-sm text-gray-600">Ventas Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{estadisticas.totalVentas}</div>
                <p className="text-sm text-gray-600">Total Operaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(estadisticas.promedioVenta)}
                </div>
                <p className="text-sm text-gray-600">Promedio por Venta</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{estadisticas.ventasEnProceso}</div>
                <p className="text-sm text-gray-600">En Proceso</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {estadisticas.ventasTerminadas + estadisticas.ventasTerminadasSence}
                </div>
                <p className="text-sm text-gray-600">Completadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de ventas mensuales */}
      <Card>
        <CardHeader>
          <CardTitle>Evolución de Ventas Mensuales</CardTitle>
          <CardDescription>
            Montos de ventas por mes (excluye comercializaciones ADI, OTR, SPD)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={ventasMensuales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" angle={-45} textAnchor="end" height={80} />
              <YAxis label={{ value: 'Monto (CLP)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'monto' ? formatCurrency(value) : value,
                  name === 'monto' ? 'Monto Total' : 'Número de Ventas'
                ]}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="monto" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6} 
                name="Monto Ventas" 
              />
              <Bar dataKey="ventas" fill="#10b981" name="Cantidad Ventas" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribuciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Región</CardTitle>
            <CardDescription>Ventas por ubicación geográfica</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={distribucionRegion}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="ventas"
                  label={({ region, ventas }) => `${region}: ${ventas}`}
                >
                  {distribucionRegion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Estado</CardTitle>
            <CardDescription>Estado actual de las operaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={distribucionEstado}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="estado" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Cantidad']} />
                <Bar dataKey="cantidad" fill="#8884d8">
                  {distribucionEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de ventas detalladas */}
      <Card>
        <CardHeader>
          <CardTitle>Registro Detallado de Ventas</CardTitle>
          <CardDescription>
            Todas las comercializaciones válidas (sin prefijos ADI, OTR, SPD)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Código</th>
                  <th className="text-left p-3">Cliente</th>
                  <th className="text-right p-3">Monto</th>
                  <th className="text-center p-3">Fecha Inicio</th>
                  <th className="text-center p-3">Estado</th>
                  <th className="text-center p-3">Región</th>
                  <th className="text-left p-3">Ejecutivo</th>
                  <th className="text-center p-3">Prob. Cierre</th>
                  <th className="text-center p-3">Última Actividad</th>
                </tr>
              </thead>
              <tbody>
                {ventasDetalladas.slice(0, 20).map((venta) => (
                  <tr key={venta.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{venta.codigoCotizacion}</td>
                    <td className="p-3 font-medium">{venta.cliente}</td>
                    <td className="p-3 text-right font-semibold">{formatCurrency(venta.monto)}</td>
                    <td className="p-3 text-center">{formatDate(venta.fechaInicio)}</td>
                    <td className="p-3 text-center">
                      <Badge className={getEstadoBadge(venta.estado)}>{venta.estado}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="outline">{venta.codigoRegion}</Badge>
                    </td>
                    <td className="p-3">{venta.ejecutivo}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${venta.probabilidadCierre}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">{venta.probabilidadCierre}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-center text-xs text-gray-500">
                      {formatDate(venta.ultimaActividad)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {ventasDetalladas.length > 20 && (
              <div className="text-center p-4 text-gray-500">
                Mostrando 20 de {ventasDetalladas.length} registros totales
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VentasPage
