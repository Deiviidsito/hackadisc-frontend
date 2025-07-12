import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, TrendingUp, Clock, Users, BarChart3, Calendar, Database } from 'lucide-react'
import { dashboardService } from '@/services/api'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const DashboardPage = () => {
  const navigate = useNavigate()
  
  // Estados para los datos de la API
  const [ventasPorMes, setVentasPorMes] = useState(null)
  const [tiempoPagoPromedio, setTiempoPagoPromedio] = useState(null)
  const [distribucionEtapas, setDistribucionEtapas] = useState(null)
  const [tiempoFacturacion, setTiempoFacturacion] = useState(null)
  const [analisisTiempoCompleto, setAnalisisTiempoCompleto] = useState(null)
  const [analisisClientes, setAnalisisClientes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Estado para filtros
  const [añoSeleccionado, setAñoSeleccionado] = useState(new Date().getFullYear())
  const [tipoGrafico, setTipoGrafico] = useState('ventas') // 'ventas' o 'monto'
  const [vistaActual, setVistaActual] = useState('ejecutiva') // 'ejecutiva', 'flujo', 'clientes'
  
  const { downloadData } = useAnalytics()

  const cargarDatosDashboard = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Cargar todos los datos en paralelo
      const [
        ventasData,
        tiempoData,
        etapasData,
        facturacionData
      ] = await Promise.all([
        dashboardService.getVentasMes(),
        dashboardService.getTiempoPagoPromedio(),
        dashboardService.getDistribucionEtapas(),
        dashboardService.getTiempoFacturacion()
      ])

      setVentasPorMes(ventasData)
      setTiempoPagoPromedio(tiempoData)
      setDistribucionEtapas(etapasData)
      setTiempoFacturacion(facturacionData)

      // Simular datos adicionales para el análisis completo
      setAnalisisTiempoCompleto({
        promedioGlobalDias: 65.9,
        mediana: 59,
        desviacionEstandar: 41.6,
        percentiles: { p25: 41, p50: 59, p75: 82, p90: 111 },
        volumenOperaciones: {
          totalFacturas: 6427,
          montoTotal: 125600000,
          montoPromedio: 19547
        },
        distribucionRiesgo: {
          bajo: { cantidad: 3214, porcentaje: 50.0 },
          medio: { cantidad: 2142, porcentaje: 33.3 },
          alto: { cantidad: 1071, porcentaje: 16.7 }
        },
        histograma: generarDatosHistograma(),
        proyeccionCobros: [
          { periodo: "Próximos 15 días", facturas: 156, monto: 2450000, probabilidad: 85 },
          { periodo: "16-30 días", facturas: 289, monto: 4720000, probabilidad: 75 },
          { periodo: "31-60 días", facturas: 421, monto: 6890000, probabilidad: 60 },
          { periodo: "61-90 días", facturas: 198, monto: 3240000, probabilidad: 40 }
        ],
        metricasPlanificacion: {
          liquidez30dias: 7170000,
          riesgoImpago: 12.5,
          facturasPendientes: 1064,
          montoPendiente: 17300000
        },
        tendenciasTempo: [
          { mes: "Ene", promedioDias: 62.1, montoTotal: 10200000 },
          { mes: "Feb", promedioDias: 59.8, montoTotal: 9800000 },
          { mes: "Mar", promedioDias: 67.2, montoTotal: 11200000 },
          { mes: "Abr", promedioDias: 64.5, montoTotal: 10800000 },
          { mes: "May", promedioDias: 68.9, montoTotal: 10600000 },
          { mes: "Jun", promedioDias: 65.3, montoTotal: 11400000 }
        ]
      })

      setAnalisisClientes({
        topClientes: [
          { nombre: "TechCorp Solutions", promedioPago: 15.2, clasificacion: "excelente", facturasGeneradas: 45, montoTotal: 890000 },
          { nombre: "Innovation Labs", promedioPago: 22.1, clasificacion: "muy_bueno", facturasGeneradas: 38, montoTotal: 720000 },
          { nombre: "Smart Enterprises", promedioPago: 28.5, clasificacion: "bueno", facturasGeneradas: 42, montoTotal: 650000 },
          { nombre: "Digital Solutions", promedioPago: 31.2, clasificacion: "bueno", facturasGeneradas: 29, montoTotal: 580000 },
          { nombre: "Future Tech", promedioPago: 34.8, clasificacion: "bueno", facturasGeneradas: 33, montoTotal: 490000 },
          { nombre: "Modern Systems", promedioPago: 38.1, clasificacion: "regular", facturasGeneradas: 25, montoTotal: 420000 },
          { nombre: "Advanced Corp", promedioPago: 41.5, clasificacion: "regular", facturasGeneradas: 31, montoTotal: 380000 },
          { nombre: "Pro Industries", promedioPago: 44.2, clasificacion: "regular", facturasGeneradas: 27, montoTotal: 350000 },
          { nombre: "Elite Business", promedioPago: 47.8, clasificacion: "regular", facturasGeneradas: 22, montoTotal: 290000 },
          { nombre: "Global Tech", promedioPago: 51.3, clasificacion: "regular", facturasGeneradas: 19, montoTotal: 270000 }
        ],
        clientesRiesgo: [
          { nombre: "Slow Pay Corp", facturasVencidas: 8, diasVencimiento: 180, montoVencido: 2500000, nivelRiesgo: "Crítico" },
          { nombre: "Late Industries", facturasVencidas: 5, diasVencimiento: 125, montoVencido: 1800000, nivelRiesgo: "Alto" },
          { nombre: "Delayed Systems", facturasVencidas: 6, diasVencimiento: 95, montoVencido: 1200000, nivelRiesgo: "Alto" },
          { nombre: "Problem Client SA", facturasVencidas: 4, diasVencimiento: 87, montoVencido: 950000, nivelRiesgo: "Medio" },
          { nombre: "Risk Enterprise", facturasVencidas: 3, diasVencimiento: 78, montoVencido: 720000, nivelRiesgo: "Medio" }
        ],
        distribucionClasificacion: {
          excelente: { cantidad: 45, porcentaje: 8.5, montoPromedio: 750000 },
          muy_bueno: { cantidad: 89, porcentaje: 16.8, montoPromedio: 620000 },
          bueno: { cantidad: 156, porcentaje: 29.4, montoPromedio: 480000 },
          regular: { cantidad: 178, porcentaje: 33.6, montoPromedio: 350000 },
          malo: { cantidad: 42, porcentaje: 7.9, montoPromedio: 280000 },
          critico: { cantidad: 20, porcentaje: 3.8, montoPromedio: 450000 }
        },
        alertasGestion: [
          {
            tipo: "Facturas Vencidas",
            descripcion: "Clientes con facturas vencidas por más de 90 días",
            prioridad: "Alta",
            clientesAfectados: 23,
            impactoFinanciero: 8500000
          },
          {
            tipo: "Riesgo de Crédito",
            descripcion: "Clientes que han superado su límite de crédito",
            prioridad: "Media",
            clientesAfectados: 18,
            impactoFinanciero: 4200000
          },
          {
            tipo: "Tendencia Negativa",
            descripcion: "Clientes con empeoramiento en tiempos de pago",
            prioridad: "Media",
            clientesAfectados: 34,
            impactoFinanciero: 2800000
          }
        ]
      })

    } catch (err) {
      console.error('Error cargando datos:', err)
      setError(err.message || 'Error al cargar los datos del dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatosDashboard()
  }, [cargarDatosDashboard])

  const generarDatosHistograma = () => {
    const rangos = []
    for (let i = 0; i <= 500; i += 10) {
      const frecuencia = Math.max(0, 100 - Math.abs(i - 60) * 2 + Math.random() * 20) / 100
      const cantidad = Math.round(frecuencia * 100)
      if (cantidad > 0) {
        rangos.push({ 
          rango: `${i}-${i+10}`, 
          frecuencia: frecuencia,
          cantidad: cantidad
        })
      }
    }
    return rangos
  }

  // Procesar datos de ventas por mes para el gráfico
  const procesarDatosVentas = () => {
    if (!ventasPorMes?.ventas_por_mes) return []
    
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return meses.map((mes, index) => {
      const mesData = ventasPorMes.ventas_por_mes.find(item => 
        item.año === añoSeleccionado && item.mes === (index + 1)
      )
      
      return {
        mes,
        ventas: mesData?.cantidad_ventas || 0,
        monto: mesData?.total_bruto || 0
      }
    })
  }

  // Procesar datos de distribución de etapas
  const procesarDistribucionEtapas = () => {
    if (!distribucionEtapas?.distribucion_por_rangos) return []
    
    return distribucionEtapas.distribucion_por_rangos.map(item => ({
      rango: item.rango,
      descripcion: item.descripcion,
      cantidad: item.cantidad,
      porcentaje: item.porcentaje,
      color: getColorByRange(item.rango)
    }))
  }

  // Procesar datos de tiempo de facturación
  const procesarTiempoFacturacion = () => {
    if (!tiempoFacturacion?.datos?.distribucion_tiempos) return []
    
    const distribucion = tiempoFacturacion.datos.distribucion_tiempos
    
    return [
      { nombre: 'Mismo día', cantidad: distribucion.mismo_dia?.count || 0, porcentaje: distribucion.mismo_dia?.porcentaje || 0 },
      { nombre: 'Muy rápido (1-3 días)', cantidad: distribucion.muy_rapido?.count || 0, porcentaje: distribucion.muy_rapido?.porcentaje || 0 },
      { nombre: 'Rápido (4-7 días)', cantidad: distribucion.rapido?.count || 0, porcentaje: distribucion.rapido?.porcentaje || 0 },
      { nombre: 'Normal (8-15 días)', cantidad: distribucion.normal?.count || 0, porcentaje: distribucion.normal?.porcentaje || 0 },
      { nombre: 'Lento (16-30 días)', cantidad: distribucion.lento?.count || 0, porcentaje: distribucion.lento?.porcentaje || 0 },
      { nombre: 'Muy lento (31-60 días)', cantidad: distribucion.muy_lento?.count || 0, porcentaje: distribucion.muy_lento?.porcentaje || 0 },
      { nombre: 'Extremo (60+ días)', cantidad: distribucion.extremo?.count || 0, porcentaje: distribucion.extremo?.porcentaje || 0 }
    ].filter(item => item.cantidad > 0)
  }

  const getColorByRange = (rango) => {
    const colores = {
      '0-7': '#22c55e',
      '8-15': '#84cc16',
      '16-30': '#eab308',
      '31-60': '#f97316',
      '61-90': '#ef4444',
      '91+': '#dc2626'
    }
    return colores[rango] || '#6b7280'
  }

  const exportarDatos = () => {
    const exportData = {
      ventasPorMes,
      tiempoPagoPromedio,
      distribucionEtapas,
      tiempoFacturacion,
      analisisTiempoCompleto,
      analisisClientes,
      fecha_export: new Date().toISOString()
    }
    downloadData(exportData, `dashboard-completo-${new Date().toISOString().split('T')[0]}`)
  }

  const getClasificacionColor = (clasificacion) => {
    const colores = {
      'excelente': 'text-green-600 bg-green-50',
      'muy_bueno': 'text-green-500 bg-green-50',
      'bueno': 'text-blue-600 bg-blue-50',
      'regular': 'text-yellow-600 bg-yellow-50',
      'malo': 'text-orange-600 bg-orange-50',
      'critico': 'text-red-600 bg-red-50'
    }
    return colores[clasificacion] || 'text-gray-600 bg-gray-50'
  }

  const getRiesgoColor = (riesgo) => {
    const colores = {
      'alto': 'text-red-600 bg-red-50 border-red-200',
      'medio': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'bajo': 'text-green-600 bg-green-50 border-green-200'
    }
    return colores[riesgo] || 'text-gray-600 bg-gray-50 border-gray-200'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B2E3] mx-auto"></div>
          <p className="text-gray-600">Cargando datos del dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-lg font-semibold">Error al cargar datos</h3>
              <p className="text-gray-600">{error}</p>
              <Button 
                onClick={cargarDatosDashboard}
                className="bg-[#00B2E3] hover:bg-[#0037FF]"
              >
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="relative">
          {/* Botones en la esquina superior derecha */}
          <div className="absolute top-0 right-0 flex gap-2">
            <Button 
              onClick={() => navigate('/import')}
              variant="outline"
              className="border-[#00B2E3] text-[#00B2E3] hover:bg-[#00B2E3] hover:text-white"
            >
              <Database className="w-4 h-4 mr-2" />
              Importar Datos
            </Button>
            <Button 
              onClick={exportarDatos}
              className="bg-[#00B2E3] hover:bg-[#0037FF]"
            >
              Exportar Datos
            </Button>
            <Button 
              onClick={cargarDatosDashboard}
              variant="outline"
            >
              Actualizar
            </Button>
          </div>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#003057] to-[#00B2E3] bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Sistema integral de análisis de flujo de caja y comportamiento de clientes
            </p>
            
            {/* Navegación entre vistas centrada */}
            <div className="flex justify-center">
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <Button 
                  variant={vistaActual === 'ejecutiva' ? 'default' : 'ghost'}
                  onClick={() => setVistaActual('ejecutiva')}
                  className={vistaActual === 'ejecutiva' ? 'bg-[#00B2E3] hover:bg-[#0037FF]' : ''}
                >
                  📈 Vista Ejecutiva
                </Button>
                <Button 
                  variant={vistaActual === 'flujo' ? 'default' : 'ghost'}
                  onClick={() => setVistaActual('flujo')}
                  className={vistaActual === 'flujo' ? 'bg-[#00B2E3] hover:bg-[#0037FF]' : ''}
                >
                  💰 Flujo de Caja
                </Button>
                <Button 
                  variant={vistaActual === 'clientes' ? 'default' : 'ghost'}
                  onClick={() => setVistaActual('clientes')}
                  className={vistaActual === 'clientes' ? 'bg-[#00B2E3] hover:bg-[#0037FF]' : ''}
                >
                  🎯 Análisis Clientes
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido condicional según la vista seleccionada */}
        
        {/* Vista Ejecutiva */}
        {vistaActual === 'ejecutiva' && (
          <div className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Total de ventas analizadas */}
              <Card className="border-[#00B2E3]/20 bg-gradient-to-br from-white to-[#00B2E3]/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#00B2E3]/10 rounded-full">
                      <BarChart3 className="h-6 w-6 text-[#00B2E3]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Ventas</p>
                      <p className="text-2xl font-bold text-[#003057]">
                        {distribucionEtapas?.estadisticas_generales?.total_ventas_analizadas?.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tiempo promedio de pago */}
              <Card className="border-[#00B2E3]/20 bg-gradient-to-br from-white to-[#0037FF]/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#0037FF]/10 rounded-full">
                      <Clock className="h-6 w-6 text-[#0037FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tiempo Promedio de Pago</p>
                      <p className="text-2xl font-bold text-[#003057]">
                        {distribucionEtapas?.estadisticas_generales?.tiempo_promedio_dias?.toFixed(1) || '0'} días
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tiempo facturación */}
              <Card className="border-[#00B2E3]/20 bg-gradient-to-br from-white to-green-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-full">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tiempo Proceso → Factura</p>
                      <p className="text-2xl font-bold text-[#003057]">
                        {tiempoFacturacion?.datos?.tiempo_promedio?.toFixed(1) || '0'} días
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Porcentaje facturado */}
              <Card className="border-[#00B2E3]/20 bg-gradient-to-br from-white to-orange-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-full">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">% Facturadas</p>
                      <p className="text-2xl font-bold text-[#003057]">
                        {tiempoFacturacion?.datos?.resumen?.porcentaje_facturadas?.toFixed(1) || '0'}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de ventas por mes */}
              <Card className="border-[#00B2E3]/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-[#003057]">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Evolución de Ventas por Año y Mes
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Botones de años */}
                      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                        {[2023, 2024, 2025].map(año => (
                          <Button
                            key={año}
                            variant={añoSeleccionado === año ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setAñoSeleccionado(año)}
                            className={`px-3 py-1 text-sm ${
                              añoSeleccionado === año 
                                ? 'bg-[#00B2E3] text-white hover:bg-[#0037FF]' 
                                : 'hover:bg-gray-200'
                            }`}
                          >
                            {año}
                          </Button>
                        ))}
                      </div>
                      {/* Selector de tipo de gráfico */}
                      <select 
                        value={tipoGrafico}
                        onChange={(e) => setTipoGrafico(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00B2E3]"
                      >
                        <option value="ventas">Cantidad</option>
                        <option value="monto">Monto CLP</option>
                      </select>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-sm text-gray-600">
                    {tipoGrafico === 'ventas' ? 'Cantidad de ventas' : 'Monto total en pesos chilenos (CLP)'} por mes - Año {añoSeleccionado}
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={procesarDatosVentas()} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis 
                          dataKey="mes" 
                          stroke="#6b7280"
                          fontSize={12}
                          fontWeight={500}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          fontSize={12}
                          tickFormatter={(value) => {
                            if (tipoGrafico === 'monto') {
                              return `$${(value / 1000000).toFixed(1)}M`
                            }
                            return value.toString()
                          }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '14px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                          formatter={(value) => [
                            tipoGrafico === 'ventas' 
                              ? `${value} ventas` 
                              : `$${value.toLocaleString('es-CL')} CLP`,
                            tipoGrafico === 'ventas' ? 'Cantidad' : 'Monto Total'
                          ]}
                          labelFormatter={(label) => `${label} ${añoSeleccionado}`}
                        />
                        <Bar 
                          dataKey={tipoGrafico === 'ventas' ? 'ventas' : 'monto'} 
                          fill="#00B2E3"
                          radius={[6, 6, 0, 0]}
                          stroke="#003057"
                          strokeWidth={1}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Distribución por rangos de tiempo */}
              <Card className="border-[#00B2E3]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#003057]">
                    <Clock className="h-5 w-5" />
                    Análisis de Tiempos de Pago por Rango
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-sm text-gray-600">
                    Distribución de {distribucionEtapas?.estadisticas_generales?.total_ventas_analizadas?.toLocaleString() || '0'} ventas analizadas por tiempo de pago
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Gráfico circular */}
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={procesarDistribucionEtapas()}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="cantidad"
                            label={({ rango, porcentaje }) => `${rango}: ${porcentaje.toFixed(1)}%`}
                            labelLine={false}
                          >
                            {procesarDistribucionEtapas().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value} ventas (${props.payload.porcentaje.toFixed(1)}%)`,
                              props.payload.descripcion
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Tabla de detalles */}
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-700 mb-3">Detalles por Rango:</h5>
                      {procesarDistribucionEtapas().map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <div>
                              <div className="font-medium text-sm">{item.rango} días</div>
                              <div className="text-xs text-gray-600">{item.descripcion}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">{item.cantidad}</div>
                            <div className="text-xs text-gray-500">{item.porcentaje.toFixed(1)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tiempo de facturación */}
              <Card className="border-[#00B2E3]/20 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#003057]">
                    <TrendingUp className="h-5 w-5" />
                    Análisis de Tiempos de Facturación - Proceso a Factura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-[#00B2E3]">
                        {tiempoFacturacion?.datos?.tiempo_promedio?.toFixed(1) || '0'}
                      </span>
                      <span className="text-lg text-gray-600 ml-2">días promedio</span>
                    </div>
                  </div>
                  
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={procesarTiempoFacturacion()} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        barCategoryGap="20%"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.7} />
                        <XAxis 
                          dataKey="nombre" 
                          stroke="#374151"
                          fontSize={12}
                          fontWeight={500}
                          angle={0}
                          textAnchor="middle"
                          height={60}
                          interval={0}
                          tick={{ textAnchor: 'middle' }}
                        />
                        <YAxis 
                          stroke="#374151"
                          fontSize={12}
                          fontWeight={500}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff',
                            border: '2px solid #00B2E3',
                            borderRadius: '12px',
                            fontSize: '14px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            padding: '12px'
                          }}
                          formatter={(value) => [`${value} facturas (${
                            procesarTiempoFacturacion().find(item => item.cantidad === value)?.porcentaje?.toFixed(1) || 0
                          }%)`, 'Cantidad']}
                          labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                        />
                        <Bar 
                          dataKey="cantidad" 
                          radius={[8, 8, 0, 0]}
                          fill="url(#barGradient)"
                          stroke="#059669"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Indicadores de rendimiento */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-lg font-bold text-green-600">
                        {procesarTiempoFacturacion()
                          .filter(item => item.nombre.includes('Mismo día') || item.nombre.includes('Muy rápido'))
                          .reduce((sum, item) => sum + item.porcentaje, 0)
                          .toFixed(1)}%
                      </div>
                      <div className="text-xs text-green-700">Facturación Rápida</div>
                      <div className="text-xs text-gray-600">(≤ 3 días)</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-lg font-bold text-yellow-600">
                        {procesarTiempoFacturacion()
                          .filter(item => item.nombre.includes('Normal') || item.nombre.includes('Rápido (4-7'))
                          .reduce((sum, item) => sum + item.porcentaje, 0)
                          .toFixed(1)}%
                      </div>
                      <div className="text-xs text-yellow-700">Facturación Normal</div>
                      <div className="text-xs text-gray-600">(4-15 días)</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-lg font-bold text-red-600">
                        {procesarTiempoFacturacion()
                          .filter(item => item.nombre.includes('Lento') || item.nombre.includes('Extremo'))
                          .reduce((sum, item) => sum + item.porcentaje, 0)
                          .toFixed(1)}%
                      </div>
                      <div className="text-xs text-red-700">Facturación Lenta</div>
                      <div className="text-xs text-gray-600">(&gt;15 días)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vista Ejecutiva - Todo el contenido adicional */}
            {analisisTiempoCompleto && (
              <Card className="p-8 border-l-4 border-l-[#00B2E3]">
                <h2 className="text-3xl font-bold text-[#003057] mb-6 flex items-center gap-3">
                  <span className="text-4xl">📈</span>
                  KPIs Ejecutivos - Dashboard Completo
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Métrica Principal */}
                  <Card className="p-6 bg-gradient-to-br from-[#003057] to-[#00B2E3] text-white">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{analisisTiempoCompleto.promedioGlobalDias.toFixed(1)}</div>
                      <div className="text-lg opacity-90">días promedio</div>
                      <div className="text-sm opacity-75">Tiempo global de pago</div>
                    </div>
                  </Card>
                  
                  {/* Percentiles */}
                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Percentiles de Pago</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>P25:</span>
                        <span className="font-medium">{analisisTiempoCompleto.percentiles.p25} días</span>
                      </div>
                      <div className="flex justify-between">
                        <span>P75:</span>
                        <span className="font-medium">{analisisTiempoCompleto.percentiles.p75} días</span>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Volumen */}
                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Volumen de Operaciones</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Facturas:</span>
                        <span className="font-medium">{analisisTiempoCompleto.volumenOperaciones.totalFacturas.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monto Total:</span>
                        <span className="font-medium text-green-600">$${analisisTiempoCompleto.volumenOperaciones.montoTotal.toLocaleString('es-CL')} CLP</span>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Distribución de Riesgo */}
                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Distribución de Riesgo</h4>
                    <div className="space-y-3">
                      {Object.entries(analisisTiempoCompleto.distribucionRiesgo).map(([riesgo, datos]) => (
                        <div key={riesgo} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getRiesgoColor(riesgo)}`}></div>
                            <span className="text-sm capitalize">{riesgo}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-sm">{datos.cantidad}</div>
                            <div className="text-xs text-gray-500">{datos.porcentaje.toFixed(1)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
                
                {/* Histograma de Distribución */}
                <Card className="p-6">
                  <h4 className="font-semibold text-gray-700 mb-4">Distribución de Tiempos de Pago</h4>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {analisisTiempoCompleto.histograma.map((bin, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="bg-[#00B2E3] rounded-t"
                          style={{ 
                            height: `${Math.max(bin.frecuencia * 100, 5)}px`,
                            minHeight: '5px'
                          }}
                        ></div>
                        <div className="text-xs text-gray-600 mt-1">
                          {bin.rango}
                        </div>
                        <div className="text-xs font-medium">
                          {bin.cantidad}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Card>
            )}
          </div>
        )}

        {/* Vista Flujo de Caja */}
        {vistaActual === 'flujo' && analisisTiempoCompleto && (
          <Card className="p-8 border-l-4 border-l-green-500">
            <h2 className="text-3xl font-bold text-[#003057] mb-6 flex items-center gap-3">
              <span className="text-4xl">💰</span>
              Análisis de Flujo de Caja y Planificación
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Proyección Timeline */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-700 mb-4">Proyección de Cobros (Próximos 90 días)</h4>
                <div className="space-y-4">
                  {analisisTiempoCompleto.proyeccionCobros.map((periodo, index) => (
                    <div key={index} className="border-l-4 border-blue-400 pl-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">{periodo.periodo}</h5>
                          <p className="text-sm text-gray-600">{periodo.facturas} facturas esperadas</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">$${periodo.monto.toLocaleString('es-CL')} CLP</div>
                          <div className="text-xs text-gray-500">{periodo.probabilidad}% prob.</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Métricas de Planificación */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-700 mb-4">Métricas de Planificación Financiera</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Liquidez Esperada 30 días</span>
                      <span className="font-bold text-green-600">
                        $${analisisTiempoCompleto.metricasPlanificacion.liquidez30dias.toLocaleString('es-CL')} CLP
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Riesgo de Impago</span>
                      <span className="font-bold text-orange-600">
                        {analisisTiempoCompleto.metricasPlanificacion.riesgoImpago.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${analisisTiempoCompleto.metricasPlanificacion.riesgoImpago}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {analisisTiempoCompleto.metricasPlanificacion.facturasPendientes}
                      </div>
                      <div className="text-sm text-gray-600">Facturas Pendientes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        $${analisisTiempoCompleto.metricasPlanificacion.montoPendiente.toLocaleString('es-CL')} CLP
                      </div>
                      <div className="text-sm text-gray-600">Monto Pendiente</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Tendencias Temporales */}
            <Card className="p-6 mt-6">
              <h4 className="font-semibold text-gray-700 mb-4">Tendencias de Flujo de Caja por Mes</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {analisisTiempoCompleto.tendenciasTempo.map((mes, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm text-gray-600">{mes.mes}</div>
                    <div className="text-lg font-bold text-[#00B2E3]">{mes.promedioDias.toFixed(1)}</div>
                    <div className="text-xs text-gray-500">días prom.</div>
                    <div className="text-xs font-medium text-green-600">$${mes.montoTotal.toLocaleString('es-CL')} CLP</div>
                  </div>
                ))}
              </div>
            </Card>
          </Card>
        )}

        {/* Vista Análisis de Clientes */}
        {vistaActual === 'clientes' && analisisClientes && (
          <Card className="p-8 border-l-4 border-l-purple-500">
            <h2 className="text-3xl font-bold text-[#003057] mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              Análisis de Rendimiento de Clientes
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Performers */}
              <Card className="p-6">
                <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Top 10 Clientes (Mejor Rendimiento)
                </h4>
                <div className="space-y-3">
                  {analisisClientes.topClientes.map((cliente, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{cliente.nombre}</div>
                          <div className="text-sm text-gray-600">
                            {cliente.facturasGeneradas} facturas • $${cliente.montoTotal.toLocaleString('es-CL')} CLP
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{cliente.promedioPago.toFixed(1)} días</div>
                        <div className={`text-xs px-2 py-1 rounded ${getClasificacionColor(cliente.clasificacion)}`}>
                          {cliente.clasificacion}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Clientes de Riesgo */}
              <Card className="p-6">
                <h4 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Clientes de Alto Riesgo
                </h4>
                <div className="space-y-3">
                  {analisisClientes.clientesRiesgo.map((cliente, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700">
                          ⚠️
                        </div>
                        <div>
                          <div className="font-medium">{cliente.nombre}</div>
                          <div className="text-sm text-gray-600">
                            {cliente.facturasVencidas} facturas vencidas • {cliente.diasVencimiento} días
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">$${cliente.montoVencido.toLocaleString('es-CL')} CLP</div>
                        <div className="text-xs text-red-700 font-medium">{cliente.nivelRiesgo}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Distribución por Clasificación */}
            <Card className="p-6 mb-6">
              <h4 className="font-semibold text-gray-700 mb-4">Distribución de Clientes por Clasificación</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analisisClientes.distribucionClasificacion).map(([clasificacion, datos]) => (
                  <div key={clasificacion} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold mb-2 ${getClasificacionColor(clasificacion)}`}>
                      {datos.cantidad}
                    </div>
                    <div className="font-medium capitalize">{clasificacion}</div>
                    <div className="text-sm text-gray-600">{datos.porcentaje.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">$${datos.montoPromedio.toLocaleString('es-CL')} CLP prom.</div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Alertas de Gestión */}
            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔔</span>
                Alertas de Gestión de Clientes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analisisClientes.alertasGestion.map((alerta, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    alerta.prioridad === 'Alta' ? 'border-red-500 bg-red-50' :
                    alerta.prioridad === 'Media' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">
                        {alerta.prioridad === 'Alta' ? '🚨' : 
                         alerta.prioridad === 'Media' ? '⚠️' : 'ℹ️'}
                      </span>
                      <span className="font-medium">{alerta.tipo}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alerta.descripcion}</p>
                    <div className="text-xs text-gray-600">
                      Afecta a {alerta.clientesAfectados} clientes • $${alerta.impactoFinanciero.toLocaleString('es-CL')} CLP
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Card>
        )}

      </div>
    </div>
  )
}

export default DashboardPage
