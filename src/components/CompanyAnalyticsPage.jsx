import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Target,
  Award,
  Activity,
  Package,
  Clock,
  Receipt,
  Wallet,
  Ban,
  AlertCircle,
  BarChart3
} from 'lucide-react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'

export default function CompanyAnalyticsPage() {
  const { companyId } = useParams()
  const navigate = useNavigate()

  // Mock data - en un caso real vendría de la API
  const company = {
    id: companyId,
    name: "TechCorp Solutions",
    industry: "Tecnología",
    employees: 250,
    status: "active",
    logo: "/company-logos/techcorp.png"
  }

  // Datos del historial de comercializaciones para análisis predictivo (basado en estructura real)
  const historialComercializaciones = [
    { 
      id: 10278, 
      codigo: 'ANT192182-1', 
      fechaInicio: '2024-01-02', 
      fechaFacturacion: '2024-02-03', 
      fechaPago: '2024-03-03', 
      cliente: 'CONSTRUCTORA PEHUENCHE LTDA',
      monto: 357000, 
      diasPago: 28, 
      trimestre: 'Q1',
      estadoComercializacion: 3, // Completada
      estadoFactura: 3 // Pagada
    },
    { 
      id: 9611, 
      codigo: 'ANT192206-1', 
      fechaInicio: '2024-01-12', 
      fechaFacturacion: '2024-02-08', 
      fechaPago: '2024-02-20', 
      cliente: 'KOMATSU CHILE S.A',
      monto: 451000, 
      diasPago: 12, 
      trimestre: 'Q1',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 10456, 
      codigo: 'ANT192289-1', 
      fechaInicio: '2024-02-15', 
      fechaFacturacion: '2024-03-10', 
      fechaPago: '2024-03-28', 
      cliente: 'MINERA LOS PELAMBRES',
      monto: 678000, 
      diasPago: 18, 
      trimestre: 'Q1',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 10789, 
      codigo: 'ANT192345-1', 
      fechaInicio: '2024-03-05', 
      fechaFacturacion: '2024-04-02', 
      fechaPago: '2024-04-25', 
      cliente: 'CODELCO CHILE',
      monto: 892000, 
      diasPago: 23, 
      trimestre: 'Q2',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 11023, 
      codigo: 'ANT192398-1', 
      fechaInicio: '2024-04-18', 
      fechaFacturacion: '2024-05-15', 
      fechaPago: '2024-06-08', 
      cliente: 'BANCO DE CHILE',
      monto: 324000, 
      diasPago: 24, 
      trimestre: 'Q2',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 11234, 
      codigo: 'ANT192445-1', 
      fechaInicio: '2024-05-22', 
      fechaFacturacion: '2024-06-18', 
      fechaPago: '2024-07-05', 
      cliente: 'ENTEL S.A',
      monto: 567000, 
      diasPago: 17, 
      trimestre: 'Q2',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 11567, 
      codigo: 'ANT192512-1', 
      fechaInicio: '2024-06-10', 
      fechaFacturacion: '2024-07-08', 
      fechaPago: '2024-07-30', 
      cliente: 'FALABELLA S.A',
      monto: 445000, 
      diasPago: 22, 
      trimestre: 'Q3',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 11890, 
      codigo: 'ANT192578-1', 
      fechaInicio: '2024-07-25', 
      fechaFacturacion: '2024-08-20', 
      fechaPago: '2024-09-12', 
      cliente: 'CONSTRUCTORA PEHUENCHE LTDA',
      monto: 398000, 
      diasPago: 23, 
      trimestre: 'Q3',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 12156, 
      codigo: 'ANT192634-1', 
      fechaInicio: '2024-08-12', 
      fechaFacturacion: '2024-09-08', 
      fechaPago: '2024-09-25', 
      cliente: 'SODIMAC S.A',
      monto: 623000, 
      diasPago: 17, 
      trimestre: 'Q3',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 12445, 
      codigo: 'ANT192701-1', 
      fechaInicio: '2024-09-18', 
      fechaFacturacion: '2024-10-15', 
      fechaPago: '2024-11-02', 
      cliente: 'METRO S.A',
      monto: 734000, 
      diasPago: 18, 
      trimestre: 'Q4',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 12678, 
      codigo: 'ANT192789-1', 
      fechaInicio: '2024-10-05', 
      fechaFacturacion: '2024-11-01', 
      fechaPago: '2024-11-20', 
      cliente: 'KOMATSU CHILE S.A',
      monto: 512000, 
      diasPago: 19, 
      trimestre: 'Q4',
      estadoComercializacion: 3,
      estadoFactura: 3
    },
    { 
      id: 12890, 
      codigo: 'ANT192834-1', 
      fechaInicio: '2024-11-15', 
      fechaFacturacion: '2024-12-10', 
      fechaPago: '2024-12-28', 
      cliente: 'BANCO SANTANDER',
      monto: 456000, 
      diasPago: 18, 
      trimestre: 'Q4',
      estadoComercializacion: 3,
      estadoFactura: 3
    }
  ]

  // Funciones de análisis para el hackathon
  const calcularEstadisticasPago = () => {
    const diasPago = historialComercializaciones.map(f => f.diasPago)
    const montos = historialComercializaciones.map(f => f.monto)
    
    const promedioDias = diasPago.reduce((sum, dias) => sum + dias, 0) / diasPago.length
    const medianaDias = [...diasPago].sort((a, b) => a - b)[Math.floor(diasPago.length / 2)]
    const minDias = Math.min(...diasPago)
    const maxDias = Math.max(...diasPago)
    const promedioMonto = montos.reduce((sum, monto) => sum + monto, 0) / montos.length
    
    // Desviación estándar
    const varianza = diasPago.reduce((sum, dias) => sum + Math.pow(dias - promedioDias, 2), 0) / diasPago.length
    const desviacionEstandar = Math.sqrt(varianza)
    
    return {
      promedioDias: Math.round(promedioDias * 10) / 10,
      medianaDias,
      minDias,
      maxDias,
      desviacionEstandar: Math.round(desviacionEstandar * 10) / 10,
      promedioMonto: Math.round(promedioMonto),
      totalFacturas: historialComercializaciones.length,
      confiabilidad: Math.round((1 - (desviacionEstandar / promedioDias)) * 100)
    }
  }

  const calcularMetricasEtapas = () => {
    // Análisis de tiempos entre etapas del proceso de venta
    let tiempoProcesoTermino = 0
    let tiempoFacturaPago = 0
    let contadorEtapas = 0

    historialComercializaciones.forEach(comercializacion => {
      if (comercializacion.fechaInicio && comercializacion.fechaFacturacion && comercializacion.fechaPago) {
        const fechaInicio = new Date(comercializacion.fechaInicio)
        const fechaFacturacion = new Date(comercializacion.fechaFacturacion)
        const fechaPago = new Date(comercializacion.fechaPago)
        
        // Días desde inicio hasta facturación (proceso completo)
        const diasProcesoCompleto = Math.floor((fechaFacturacion - fechaInicio) / (1000 * 60 * 60 * 24))
        // Días desde facturación hasta pago
        const diasFacturaPago = Math.floor((fechaPago - fechaFacturacion) / (1000 * 60 * 60 * 24))
        
        tiempoProcesoTermino += diasProcesoCompleto
        tiempoFacturaPago += diasFacturaPago
        contadorEtapas++
      }
    })

    return {
      promedioProcesoCompleto: contadorEtapas > 0 ? Math.round((tiempoProcesoTermino / contadorEtapas) * 10) / 10 : 0,
      promedioFacturaPago: contadorEtapas > 0 ? Math.round((tiempoFacturaPago / contadorEtapas) * 10) / 10 : 0,
      cicloTotalPromedio: contadorEtapas > 0 ? Math.round(((tiempoProcesoTermino + tiempoFacturaPago) / contadorEtapas) * 10) / 10 : 0
    }
  }

  // Análisis de riesgo del cliente
  const calcularPerfilRiesgo = () => {
    const estadisticas = calcularEstadisticasPago()
    
    // Factores de riesgo
    let puntajeRiesgo = 0
    let alertas = []
    
    // Factor 1: Promedio de días de pago alto
    if (estadisticas.promedioDias > 25) {
      puntajeRiesgo += 30
      alertas.push("⚠️ Histórico de pagos lentos (>25 días)")
    } else if (estadisticas.promedioDias > 20) {
      puntajeRiesgo += 15
      alertas.push("🟡 Pagos moderadamente lentos")
    }
    
    // Factor 2: Alta variabilidad en pagos
    if (estadisticas.desviacionEstandar > 8) {
      puntajeRiesgo += 25
      alertas.push("📊 Alta variabilidad en tiempos de pago")
    }
    
    // Factor 3: Tendencia reciente (últimas 3 comercializaciones)
    const ultimasComercializaciones = historialComercializaciones.slice(-3)
    const promedioReciente = ultimasComercializaciones.reduce((sum, c) => sum + c.diasPago, 0) / ultimasComercializaciones.length
    
    if (promedioReciente > estadisticas.promedioDias * 1.2) {
      puntajeRiesgo += 20
      alertas.push("📈 Tendencia al alza en días de pago")
    }
    
    // Factor 4: Montos altos vs tiempo de pago
    const montosAltos = historialComercializaciones.filter(c => c.monto > 500000)
    if (montosAltos.length > 0) {
      const promedioMontosAltos = montosAltos.reduce((sum, c) => sum + c.diasPago, 0) / montosAltos.length
      if (promedioMontosAltos > estadisticas.promedioDias * 1.15) {
        puntajeRiesgo += 15
        alertas.push("💰 Montos altos generan más demora")
      }
    }
    
    // Determinar categoría de riesgo
    let categoria = "BAJO"
    let color = "text-green-600"
    let bgColor = "bg-green-100"
    let emoji = "✅"
    
    if (puntajeRiesgo >= 60) {
      categoria = "ALTO"
      color = "text-red-600"
      bgColor = "bg-red-100"
      emoji = "🚨"
    } else if (puntajeRiesgo >= 35) {
      categoria = "MEDIO"
      color = "text-yellow-600"
      bgColor = "bg-yellow-100"
      emoji = "⚠️"
    }
    
    return {
      puntaje: puntajeRiesgo,
      categoria,
      color,
      bgColor,
      emoji,
      alertas,
      recomendaciones: generarRecomendaciones(puntajeRiesgo)
    }
  }

  // Generar recomendaciones basadas en el análisis
  const generarRecomendaciones = (puntajeRiesgo) => {
    const recomendaciones = []
    
    if (puntajeRiesgo >= 60) {
      recomendaciones.push("📋 Implementar seguimiento semanal de facturas pendientes")
      recomendaciones.push("📞 Contacto telefónico previo a vencimiento")
      recomendaciones.push("💳 Ofrecer descuentos por pronto pago")
    } else if (puntajeRiesgo >= 35) {
      recomendaciones.push("📅 Recordatorios automáticos 5 días antes del vencimiento")
      recomendaciones.push("📧 Comunicación proactiva sobre estado de facturas")
    } else {
      recomendaciones.push("✨ Cliente confiable - proceso estándar")
      recomendaciones.push("🎯 Considerar condiciones preferenciales")
    }
    
    return recomendaciones
  }

  // Proyección de flujo de caja
  const calcularProyeccionFlujo = () => {
    // Simular ventas futuras basadas en histórico
    const ventasPorMes = 12 // Promedio mensual del cliente
    const montoPromedio = historialComercializaciones.reduce((sum, c) => sum + c.monto, 0) / historialComercializaciones.length
    const estadisticas = calcularEstadisticasPago()
    
    const proyeccion = []
    const fechaActual = new Date()
    
    for (let i = 1; i <= 6; i++) {
      const fechaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + i, 1)
      const ventasEstimadas = ventasPorMes
      const facturacionEstimada = ventasEstimadas * montoPromedio
      
      // Fecha esperada de cobro
      const fechaCobro = new Date(fechaMes)
      fechaCobro.setDate(fechaCobro.getDate() + estadisticas.promedioDias)
      
      proyeccion.push({
        mes: fechaMes.toLocaleDateString('es-CL', { month: 'short', year: '2-digit' }),
        ventasEstimadas,
        facturacionEstimada: Math.round(facturacionEstimada),
        fechaCobroEsperada: fechaCobro.toLocaleDateString('es-CL', { day: '2-digit', month: 'short' }),
        confianza: Math.max(65, 100 - (estadisticas.desviacionEstandar * 3))
      })
    }
    
    return proyeccion
  }

  // Calcular métricas necesarias
  const estadisticasPago = calcularEstadisticasPago()
  const metricasEtapas = calcularMetricasEtapas()
  const perfilRiesgo = calcularPerfilRiesgo()
  const proyeccionFlujo = calcularProyeccionFlujo()

  // Métricas principales de comercialización (calculadas dinámicamente)
  const metrics = [
    {
      title: "Comercializaciones Totales",
      value: historialComercializaciones.length.toString(),
      change: "+15%",
      icon: <Package className="w-6 h-6" />,
      color: "text-[#00B2E3]",
      bgColor: "bg-[#00B2E3]/10"
    },
    {
      title: "Días Proceso → Factura",
      value: metricasEtapas.promedioProcesoCompleto.toString(),
      change: "-2.3",
      icon: <Clock className="w-6 h-6" />,
      color: "text-[#003057]",
      bgColor: "bg-[#003057]/10"
    },
    {
      title: "Días Factura → Pago",
      value: metricasEtapas.promedioFacturaPago.toString(),
      change: "+1.2",
      icon: <Receipt className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Ciclo Total Promedio",
      value: `${metricasEtapas.cicloTotalPromedio} días`,
      change: "-4.1",
      icon: <Wallet className="w-6 h-6" />,
      color: "text-[#0037FF]",
      bgColor: "bg-[#0037FF]/10"
    }
  ]
  
  // Datos para gráficos
  const trendData = [
    { month: 'Ene', ventas: 8, facturacion: 28000 },
    { month: 'Feb', ventas: 12, facturacion: 35000 },
    { month: 'Mar', ventas: 15, facturacion: 42000 },
    { month: 'Abr', ventas: 10, facturacion: 38000 },
    { month: 'May', ventas: 18, facturacion: 48000 },
    { month: 'Jun', ventas: 14, facturacion: 41000 }
  ]

  // Distribución por estado de comercialización (basado en datos reales)
  const distributionData = [
    { name: 'Completadas', value: 68, color: '#22c55e' },
    { name: 'En Proceso', value: 22, color: '#00B2E3' },
    { name: 'Pendientes', value: 7, color: '#f59e0b' },
    { name: 'Canceladas', value: 3, color: '#ef4444' }
  ]
  
  // Función para predicciones (antes del state)
  const predecirTiempoPago = (montoNuevaVenta, fechaVenta = new Date()) => {
    // Análisis de correlación entre monto y días de pago
    const mesVenta = fechaVenta.getMonth() + 1 // 1-12
    const trimestre = Math.ceil(mesVenta / 3)
    
    // Encontrar comercializaciones similares (±20% del monto)
    const rangoMin = montoNuevaVenta * 0.8
    const rangoMax = montoNuevaVenta * 1.2
    const comercializacionesSimilares = historialComercializaciones.filter(f => f.monto >= rangoMin && f.monto <= rangoMax)
    
    // Análisis estacional - ajustar según el mes
    let factorEstacional = 1.0
    if (mesVenta === 12 || mesVenta === 1) { // Diciembre/Enero - más lento por fiestas
      factorEstacional = 1.3
    } else if (mesVenta >= 6 && mesVenta <= 8) { // Junio-Agosto - más rápido en invierno
      factorEstacional = 0.9
    } else if (mesVenta === 3 || mesVenta === 9) { // Fin de trimestre - variabilidad
      factorEstacional = 1.1
    }
    
    if (comercializacionesSimilares.length > 0) {
      const promedioSimilares = comercializacionesSimilares.reduce((sum, f) => sum + f.diasPago, 0) / comercializacionesSimilares.length
      const diasAjustados = promedioSimilares * factorEstacional
      const confianza = Math.min(95, (comercializacionesSimilares.length / historialComercializaciones.length) * 100 + 60)
      
      // Calcular fecha exacta de pago esperado
      const fechaPagoEstimada = new Date(fechaVenta)
      fechaPagoEstimada.setDate(fechaPagoEstimada.getDate() + Math.round(diasAjustados))
      
      return {
        diasEstimados: Math.round(diasAjustados),
        rangoMin: Math.round(diasAjustados - 4),
        rangoMax: Math.round(diasAjustados + 6),
        confianza: Math.round(confianza),
        facturasSimilares: comercializacionesSimilares.length,
        fechaEstimadaPago: fechaPagoEstimada.toLocaleDateString('es-CL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        factorEstacional: factorEstacional,
        trimestre: `Q${trimestre}`,
        observacionEstacional: mesVenta === 12 || mesVenta === 1 ? 'Época navideña - pagos más lentos' :
                               mesVenta >= 6 && mesVenta <= 8 ? 'Período invernal - pagos más rápidos' :
                               mesVenta === 3 || mesVenta === 9 ? 'Fin de trimestre - variabilidad alta' :
                               'Período normal',
        fechaVenta: fechaVenta.toLocaleDateString('es-CL')
      }
    } else {
      // Si no hay comercializaciones similares, usar promedio general
      const estadisticas = estadisticasPago
      const diasAjustados = estadisticas.promedioDias * factorEstacional
      
      const fechaPagoEstimada = new Date(fechaVenta)
      fechaPagoEstimada.setDate(fechaPagoEstimada.getDate() + Math.round(diasAjustados))
      
      return {
        diasEstimados: Math.round(diasAjustados),
        rangoMin: Math.round(diasAjustados - 6),
        rangoMax: Math.round(diasAjustados + 8),
        confianza: 65,
        facturasSimilares: 0,
        fechaEstimadaPago: fechaPagoEstimada.toLocaleDateString('es-CL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        factorEstacional: factorEstacional,
        trimestre: `Q${trimestre}`,
        observacionEstacional: mesVenta === 12 || mesVenta === 1 ? 'Época navideña - pagos más lentos' :
                               mesVenta >= 6 && mesVenta <= 8 ? 'Período invernal - pagos más rápidos' :
                               mesVenta === 3 || mesVenta === 9 ? 'Fin de trimestre - variabilidad alta' :
                               'Período normal',
        fechaVenta: fechaVenta.toLocaleDateString('es-CL')
      }
    }
  }

  // Estado para simulación
  const [montoSimulacion, setMontoSimulacion] = useState(500000)
  const [fechaVentaSimulacion, setFechaVentaSimulacion] = useState(new Date().toISOString().split('T')[0])
  const prediccionSimulacion = predecirTiempoPago(montoSimulacion, new Date(fechaVentaSimulacion))



  return (
    <div className="min-h-screen p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard/companies')}
              className="border-[#003057] dark:border-gray-600 text-[#003057] dark:text-gray-300 hover:bg-[#003057] dark:hover:bg-gray-700 hover:text-white dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Empresas
            </Button>
          </div>

          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00B2E3]/20 to-[#003057]/10 dark:from-[#00B2E3]/30 dark:to-[#003057]/20 rounded-2xl flex items-center justify-center shadow-lg dark:shadow-gray-900/50">
              <Building2 className="w-10 h-10 text-[#003057] dark:text-[#00B2E3]" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-[#003057] dark:text-white">
                  {company.name}
                </h1>
                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700">
                  Activo
                </Badge>
              </div>
              <p className="text-lg text-[#003057]/70 dark:text-gray-300">
                {company.industry} • {company.employees} empleados
              </p>
            </div>
          </div>
        </div>

        {/* Métricas Principales - KPIs de Comercialización */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index}
              className="border-[#00B2E3]/20 dark:border-gray-700 hover:border-[#00B2E3]/40 dark:hover:border-[#00B2E3]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#00B2E3]/10 dark:hover:shadow-[#00B2E3]/20 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${metric.bgColor} dark:bg-opacity-20 rounded-lg flex items-center justify-center`}>
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${
                    metric.change.startsWith('+') || metric.change.startsWith('-') && metric.change.includes('.') 
                      ? metric.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-[#003057] dark:text-white">
                    {metric.value}
                  </h3>
                  <p className="text-sm text-[#003057]/70 dark:text-gray-300">
                    {metric.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Análisis de Comercializaciones y Predicción de Pagos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tendencia de Ventas */}
          <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
            <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
              <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#0037FF]" />
                Tendencia de Ventas (6 meses)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00B2E3" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00B2E3" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fill: '#003057', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#003057', fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'ventas') return [`${value} ventas`, 'Ventas'];
                        return [`$${value.toLocaleString()}`, 'Facturación'];
                      }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        border: '1px solid #00B2E3' 
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ventas" 
                      stroke="#00B2E3" 
                      fillOpacity={1} 
                      fill="url(#colorVentas)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-sm text-[#003057]/70 dark:text-gray-300">Total Comercializaciones</p>
                  <p className="text-xl font-bold text-[#003057] dark:text-white">143</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#00B2E3]">Promedio Mensual</p>
                  <p className="text-xl font-bold text-[#00B2E3]">12.9</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-700 dark:text-green-400">Crecimiento</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-400">+23%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribución por Tipo de Servicio */}
          <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
            <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
              <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#00B2E3]" />
                Estado de Comercializaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Porcentaje']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        border: '1px solid #00B2E3' 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-sm text-[#0037FF] dark:text-blue-400">Días a Pago</p>
                  <p className="text-xl font-bold text-[#0037FF] dark:text-blue-400">15.3</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">Eficiencia</p>
                  <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">92.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Análisis de Riesgo y Perfil del Cliente */}
        <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
          <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
            <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#003057]" />
              Análisis de Riesgo Crediticio
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Perfil de Riesgo */}
              <div className="lg:col-span-1">
                <div className={`text-center p-6 ${perfilRiesgo.bgColor} dark:bg-opacity-20 rounded-lg border border-gray-200 dark:border-gray-600`}>
                  <div className="text-4xl mb-2">{perfilRiesgo.emoji}</div>
                  <h3 className={`text-xl font-bold ${perfilRiesgo.color} dark:text-white mb-2`}>
                    RIESGO {perfilRiesgo.categoria}
                  </h3>
                  <p className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {perfilRiesgo.puntaje}/100
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        perfilRiesgo.categoria === 'ALTO' ? 'bg-red-500' :
                        perfilRiesgo.categoria === 'MEDIO' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${perfilRiesgo.puntaje}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Alertas y Factores de Riesgo */}
              <div className="lg:col-span-1">
                <h4 className="font-semibold text-[#003057] dark:text-white mb-3">🚨 Factores de Riesgo</h4>
                <div className="space-y-2">
                  {perfilRiesgo.alertas.length > 0 ? (
                    perfilRiesgo.alertas.map((alerta, index) => (
                      <div key={index} className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm text-yellow-800 dark:text-yellow-300">
                        {alerta}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded text-sm text-green-800 dark:text-green-300">
                      ✅ No se detectaron factores de riesgo significativos
                    </div>
                  )}
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="lg:col-span-1">
                <h4 className="font-semibold text-[#003057] dark:text-white mb-3">💡 Recomendaciones</h4>
                <div className="space-y-2">
                  {perfilRiesgo.recomendaciones.map((recomendacion, index) => (
                    <div key={index} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm text-blue-800 dark:text-blue-300">
                      {recomendacion}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proyección de Flujo de Caja */}
        <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
          <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
            <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00B2E3]" />
              Proyección de Flujo de Caja (6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-3 text-[#003057] dark:text-white">Mes</th>
                    <th className="text-center p-3 text-[#003057] dark:text-white">Ventas Est.</th>
                    <th className="text-center p-3 text-[#003057] dark:text-white">Facturación</th>
                    <th className="text-center p-3 text-[#003057] dark:text-white">Cobro Esperado</th>
                    <th className="text-center p-3 text-[#003057] dark:text-white">Confianza</th>
                  </tr>
                </thead>
                <tbody>
                  {proyeccionFlujo.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-3 font-medium text-[#003057] dark:text-white">{item.mes}</td>
                      <td className="p-3 text-center text-[#00B2E3]">{item.ventasEstimadas}</td>
                      <td className="p-3 text-center text-green-600 dark:text-green-400">
                        ${item.facturacionEstimada.toLocaleString()}
                      </td>
                      <td className="p-3 text-center text-[#0037FF] dark:text-blue-400">{item.fechaCobroEsperada}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-8 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-[#00B2E3] h-2 rounded-full" 
                              style={{ width: `${item.confianza}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-[#003057] dark:text-gray-300">{item.confianza}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-[#00B2E3]/5 to-[#003057]/5 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-[#003057]/70 dark:text-gray-300">Facturación Proyectada (6M)</p>
                  <p className="text-xl font-bold text-[#00B2E3]">
                    ${(proyeccionFlujo.reduce((sum, item) => sum + item.facturacionEstimada, 0)).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#003057]/70 dark:text-gray-300">Cobro Esperado Promedio</p>
                  <p className="text-xl font-bold text-[#003057] dark:text-white">
                    {estadisticasPago.promedioDias} días
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#003057]/70 dark:text-gray-300">Confianza Promedio</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {Math.round(proyeccionFlujo.reduce((sum, item) => sum + item.confianza, 0) / proyeccionFlujo.length)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evolución del Cliente - Simplificado */}
        <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
          <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
            <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#003057]" />
              Resumen Anual del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-[#003057]/10 to-[#00B2E3]/5 rounded-lg border border-[#003057]/20">
                <h4 className="text-sm font-medium text-[#003057] dark:text-white mb-2">Comercializaciones YTD</h4>
                <p className="text-3xl font-bold text-[#003057] dark:text-white">106</p>
                <p className="text-xs text-[#003057]/70 dark:text-gray-300 mt-1">Total del año</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#00B2E3]/10 to-[#003057]/5 rounded-lg border border-[#00B2E3]/20">
                <h4 className="text-sm font-medium text-[#00B2E3] mb-2">Facturación Anual</h4>
                <p className="text-3xl font-bold text-[#00B2E3]">$428,000</p>
                <p className="text-xs text-[#00B2E3]/70 mt-1">Ingresos totales</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#0037FF]/10 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg border border-[#0037FF]/20">
                <h4 className="text-sm font-medium text-[#0037FF] dark:text-blue-400 mb-2">Pagos Recibidos</h4>
                <p className="text-3xl font-bold text-[#0037FF] dark:text-blue-400">$401,000</p>
                <p className="text-xs text-[#0037FF]/70 dark:text-blue-300 mt-1">93.7% cobrado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Análisis Predictivo de Pagos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Estadísticas Históricas de Pago */}
          <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
            <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
              <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#003057]" />
                Análisis Histórico de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Métricas principales en una fila */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-[#003057]/10 to-[#00B2E3]/5 rounded-lg">
                  <h4 className="text-sm font-medium text-[#003057] dark:text-gray-300">Promedio de Pago</h4>
                  <p className="text-2xl font-bold text-[#003057] dark:text-white">{estadisticasPago.promedioDias} días</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#00B2E3]/10 to-[#003057]/5 rounded-lg">
                  <h4 className="text-sm font-medium text-[#00B2E3]">Mediana</h4>
                  <p className="text-2xl font-bold text-[#00B2E3]">{estadisticasPago.medianaDias} días</p>
                </div>
              </div>
              
              {/* Métricas secundarias en una fila */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 rounded-lg">
                  <h4 className="text-sm font-medium text-green-700 dark:text-green-400">Más Rápido</h4>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">{estadisticasPago.minDias} días</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10 rounded-lg">
                  <h4 className="text-sm font-medium text-red-700 dark:text-red-400">Más Lento</h4>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-400">{estadisticasPago.maxDias} días</p>
                </div>
              </div>
              
              {/* Información adicional compacta */}
              <div className="bg-gradient-to-r from-[#00B2E3]/5 to-[#003057]/5 rounded-lg p-4">                  <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#003057]/70 dark:text-gray-300">Confiabilidad del Cliente</span>
                    <span className="font-semibold text-[#003057] dark:text-white">{estadisticasPago.confiabilidad}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#003057] to-[#00B2E3] h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${estadisticasPago.confiabilidad}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#003057]/70 dark:text-gray-300">Comercializaciones Analizadas</span>
                      <span className="font-semibold text-sm text-[#003057] dark:text-white">{estadisticasPago.totalFacturas}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#003057]/70 dark:text-gray-300">Desviación Estándar</span>
                      <span className="font-semibold text-sm text-[#003057] dark:text-white">±{estadisticasPago.desviacionEstandar} días</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulador de Nueva Venta */}
          <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
            <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
              <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00B2E3]" />
                Simulador de Nueva Comercialización
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#003057] dark:text-gray-300 mb-2">
                    Fecha de la Venta
                  </label>
                  <input
                    type="date"
                    value={fechaVentaSimulacion}
                    onChange={(e) => setFechaVentaSimulacion(e.target.value)}
                    className="w-full px-3 py-2 border border-[#00B2E3]/30 rounded-md focus:ring-2 focus:ring-[#00B2E3] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <p className="text-xs text-[#003057]/60 dark:text-gray-400 mt-1">
                    Simulación basada en histórico real del cliente - ¿Cuándo llegará el pago?
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#003057] dark:text-gray-300 mb-2">
                    Monto de la Nueva Venta
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#003057] dark:text-gray-300">$</span>
                    <input
                      type="number"
                      value={montoSimulacion}
                      onChange={(e) => setMontoSimulacion(Number(e.target.value))}
                      className="flex-1 px-3 py-2 border border-[#00B2E3]/30 rounded-md focus:ring-2 focus:ring-[#00B2E3] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      min="100000"
                      max="2000000"
                      step="50000"
                    />
                  </div>
                </div>
              </div>

              {/* Resultado de la Predicción Mejorado */}
              <div className="bg-gradient-to-br from-[#00B2E3]/10 to-[#003057]/5 rounded-lg p-4 border border-[#00B2E3]/20">
                <h4 className="font-semibold text-[#003057] dark:text-white mb-3 flex items-center gap-2">
                  💰 Predicción de Cobro
                  <Badge className="bg-[#00B2E3]/20 text-[#00B2E3] text-xs">
                    {prediccionSimulacion.trimestre}
                  </Badge>
                </h4>
                
                {/* Información Principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-[#00B2E3]/20">
                    <p className="text-sm text-[#003057]/70 dark:text-gray-300">💸 Dinero llega en</p>
                    <p className="text-2xl font-bold text-[#003057] dark:text-white">{prediccionSimulacion.diasEstimados} días</p>
                    <p className="text-xs text-[#00B2E3] font-medium">{prediccionSimulacion.fechaEstimadaPago}</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-[#00B2E3]/20">
                    <p className="text-sm text-[#003057]/70 dark:text-gray-300">🎯 Confianza</p>
                    <p className="text-2xl font-bold text-[#00B2E3]">{prediccionSimulacion.confianza}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-[#00B2E3] h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${prediccionSimulacion.confianza}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Información Detallada */}
                <div className="space-y-3 text-sm">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-[#00B2E3]/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#003057]/70 dark:text-gray-300">📅 Fecha de Venta:</span>
                      <span className="font-medium text-[#003057] dark:text-white">{prediccionSimulacion.fechaVenta}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#003057]/70 dark:text-gray-300">⏰ Rango Estimado:</span>
                      <span className="font-medium text-[#003057] dark:text-white">
                        {prediccionSimulacion.rangoMin} - {prediccionSimulacion.rangoMax} días
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#003057]/70 dark:text-gray-300">🔍 Comercializaciones Similares:</span>
                      <span className="font-medium text-[#00B2E3]">{prediccionSimulacion.facturasSimilares} registros</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#003057]/70 dark:text-gray-300">📊 Factor Estacional:</span>
                      <span className={`font-medium ${
                        prediccionSimulacion.factorEstacional > 1.1 ? 'text-red-600 dark:text-red-400' :
                        prediccionSimulacion.factorEstacional < 0.95 ? 'text-green-600 dark:text-green-400' :
                        'text-[#003057] dark:text-white'
                      }`}>
                        {(prediccionSimulacion.factorEstacional * 100 - 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Observación Estacional */}
                  <div className={`p-3 rounded-lg text-xs ${
                    prediccionSimulacion.factorEstacional > 1.1 
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' 
                      : prediccionSimulacion.factorEstacional < 0.95
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                      : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span>
                        {prediccionSimulacion.factorEstacional > 1.1 ? '⚠️' : 
                         prediccionSimulacion.factorEstacional < 0.95 ? '🚀' : 'ℹ️'}
                      </span>
                      <span className="font-medium">{prediccionSimulacion.observacionEstacional}</span>
                    </div>
                  </div>

                  {prediccionSimulacion.facturasSimilares === 0 && (
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg text-xs text-yellow-800 dark:text-yellow-300">
                      <div className="flex items-center gap-2">
                        <span>⚠️</span>
                        <span>Predicción basada en promedio general (sin comercializaciones de monto similar)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
