import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useChartTheme, getChartProps } from '@/utils/chartTheme'
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
  ScatterChart, Scatter, AreaChart, Area, BarChart, Bar
} from 'recharts'

export default function CompanyAnalyticsPage() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const { isDark } = useChartTheme()
  const chartProps = getChartProps(isDark)

  // Mock data - en un caso real vendría de la API
  const company = {
    id: companyId,
    name: "TechCorp Solutions",
    industry: "Tecnología",
    employees: 250,
    status: "active",
    logo: "/company-logos/techcorp.png"
  }

  // Métricas principales de comercialización
  const metrics = [
    {
      title: "Ventas Totales",
      value: "143",
      change: "+15%",
      icon: <Package className="w-6 h-6" />,
      color: "text-[#00B2E3]",
      bgColor: "bg-[#00B2E3]/10"
    },
    {
      title: "Días Proceso → Término",
      value: "12.5",
      change: "-2.3",
      icon: <Clock className="w-6 h-6" />,
      color: "text-[#003057]",
      bgColor: "bg-[#003057]/10"
    },
    {
      title: "% Facturado",
      value: "87.2%",
      change: "+5.4%",
      icon: <Receipt className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Días a Pago",
      value: "15.3",
      change: "-4.1",
      icon: <Wallet className="w-6 h-6" />,
      color: "text-[#0037FF]",
      bgColor: "bg-[#0037FF]/10"
    }
  ]
  
  // Métricas secundarias
  const secondaryMetrics = [
    {
      title: "% Facturas con Monto 0",
      value: "4.7%",
      change: "-0.8%",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      title: "Ventas Canceladas",
      value: "12",
      change: "-3",
      icon: <Ban className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Ingresos Mensuales",
      value: "$45.2K",
      change: "+15.3%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      title: "Tickets Resueltos",
      value: "28/32",
      change: "87.5%",
      icon: <Target className="w-6 h-6" />,
      color: "text-[#0037FF]",
      bgColor: "bg-[#0037FF]/10"
    }
  ]

  // Datos de actividades recientes
  const recentActivities = [
    {
      id: 1,
      action: "Nueva comercialización #C-2876",
      user: "Depto. Comercial",
      time: "Hace 2 horas",
      type: "achievement"
    },
    {
      id: 2,
      action: "Factura emitida #F-5412",
      user: "Depto. Finanzas",
      time: "Hace 5 horas",
      type: "report"
    },
    {
      id: 3,
      action: "Pago recibido #P-1845",
      user: "Depto. Contabilidad",
      time: "Hace 1 día",
      type: "achievement"
    },
    {
      id: 4,
      action: "Cambio de estado: En Proceso → Terminada",
      user: "Gestión de Proyectos",
      time: "Hace 2 días",
      type: "user"
    }
  ]

  // Datos para gráficos
  
  // Timeline de estados por comercialización
  const timelineData = [
    { id: "COM-001", inicio: "2025-03-01", enProceso: "2025-03-03", terminado: "2025-03-15", facturacion: "2025-03-18", pago: "2025-04-02", monto: 4500 },
    { id: "COM-002", inicio: "2025-03-10", enProceso: "2025-03-12", terminado: "2025-03-28", facturacion: "2025-04-05", pago: "2025-04-20", monto: 7800 },
    { id: "COM-003", inicio: "2025-03-15", enProceso: "2025-03-16", terminado: "2025-03-30", facturacion: "2025-04-10", pago: "2025-04-25", monto: 5200 },
    { id: "COM-004", inicio: "2025-04-01", enProceso: "2025-04-02", terminado: "2025-04-14", facturacion: "2025-04-18", pago: "2025-05-03", monto: 6300 },
    { id: "COM-005", inicio: "2025-04-08", enProceso: "2025-04-10", terminado: "2025-04-22", facturacion: "2025-04-25", pago: "2025-05-10", monto: 8500 }
  ]

  // Datos para gráfico de dispersión: días de conversión vs monto
  const scatterData = [
    { diasConversion: 12, monto: 4500, id: "COM-001" },
    { diasConversion: 16, monto: 7800, id: "COM-002" },
    { diasConversion: 14, monto: 5200, id: "COM-003" },
    { diasConversion: 12, monto: 6300, id: "COM-004" },
    { diasConversion: 12, monto: 8500, id: "COM-005" },
    { diasConversion: 18, monto: 3200, id: "COM-006" },
    { diasConversion: 10, monto: 9200, id: "COM-007" },
    { diasConversion: 22, monto: 4100, id: "COM-008" },
    { diasConversion: 8, monto: 7400, id: "COM-009" },
    { diasConversion: 15, monto: 6700, id: "COM-010" },
    { diasConversion: 14, monto: 5600, id: "COM-011" },
    { diasConversion: 11, monto: 8100, id: "COM-012" }
  ]

  // Datos para heatmap mensual (simplificado como gráfico de barras)
  const monthlyData = [
    { month: "Ene", ventas: 8, diasPromedioPago: 18 },
    { month: "Feb", ventas: 12, diasPromedioPago: 16 },
    { month: "Mar", ventas: 15, diasPromedioPago: 14 },
    { month: "Abr", ventas: 10, diasPromedioPago: 15 },
    { month: "May", ventas: 18, diasPromedioPago: 12 },
    { month: "Jun", ventas: 14, diasPromedioPago: 13 },
    { month: "Jul", ventas: 22, diasPromedioPago: 11 },
    { month: "Ago", ventas: 17, diasPromedioPago: 12 },
    { month: "Sep", ventas: 16, diasPromedioPago: 14 },
    { month: "Oct", ventas: 21, diasPromedioPago: 13 },
    { month: "Nov", ventas: 19, diasPromedioPago: 15 },
    { month: "Dic", ventas: 13, diasPromedioPago: 17 }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return <Users className="w-4 h-4 text-[#00B2E3]" />
      case 'achievement':
        return <Award className="w-4 h-4 text-yellow-600" />
      case 'report':
        return <Activity className="w-4 h-4 text-[#003057]" />
      case 'training':
        return <Target className="w-4 h-4 text-green-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

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
        
        {/* Métricas Secundarias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondaryMetrics.map((metric, index) => (
            <Card 
              key={index}
              className="border-[#00B2E3]/10 dark:border-gray-700 hover:border-[#00B2E3]/30 dark:hover:border-[#00B2E3]/50 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-900/50 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/30"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 ${metric.bgColor} dark:bg-opacity-20 rounded-lg flex items-center justify-center`}>
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${
                    metric.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 
                    metric.change.startsWith('-') ? 'text-red-600 dark:text-red-400' : 
                    'text-blue-600 dark:text-blue-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#003057] dark:text-white">
                    {metric.value}
                  </h3>
                  <p className="text-xs text-[#003057]/70 dark:text-gray-300">
                    {metric.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Línea de Tiempo por Comercialización */}
          <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
            <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
              <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00B2E3]" />
                Línea de Tiempo por Comercialización
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timelineData.map(item => ({
                      id: item.id,
                      inicio: new Date(item.inicio).getTime(),
                      enProceso: new Date(item.enProceso).getTime(),
                      terminado: new Date(item.terminado).getTime(),
                      facturacion: new Date(item.facturacion).getTime(),
                      pago: new Date(item.pago).getTime(),
                      name: item.id
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid {...chartProps.cartesianGrid} />
                    <XAxis 
                      dataKey="name" 
                      {...chartProps.xAxis}
                    />
                    <YAxis 
                      {...chartProps.yAxis}
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('es-ES', {month: 'short', day: 'numeric'});
                      }}
                    />
                    <Tooltip 
                      {...chartProps.tooltip}
                      formatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('es-ES', {year: 'numeric', month: 'short', day: 'numeric'});
                      }}
                      labelStyle={{ color: '#003057', fontWeight: 'bold' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        border: '1px solid #00B2E3' 
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="inicio" stroke="#003057" name="Inicio" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="enProceso" stroke="#00B2E3" name="En Proceso" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="terminado" stroke="#0037FF" name="Terminado" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="facturacion" stroke="#22c55e" name="Facturación" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="pago" stroke="#6366f1" name="Pago" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
            <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
              <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#00B2E3]" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 bg-gradient-to-r from-[#00B2E3]/5 to-transparent dark:from-[#00B2E3]/10 dark:to-transparent rounded-lg hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm dark:shadow-gray-900/30">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#003057] dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-[#003057]/60 dark:text-gray-400">
                        {activity.user}
                      </p>
                      <p className="text-xs text-[#003057]/50 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualizaciones adicionales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Dispersión: Días de Conversión vs Monto */}
          <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
            <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
              <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#0037FF]" />
                Días de Conversión vs Monto
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 5, right: 20, bottom: 20, left: 30 }}
                  >
                    <CartesianGrid {...chartProps.cartesianGrid} />
                    <XAxis 
                      type="number" 
                      dataKey="diasConversion" 
                      name="Días" 
                      unit=" días"
                      domain={[5, 25]} 
                      label={{ 
                        value: 'Días de Proceso', 
                        position: 'bottom', 
                        offset: 0,
                        style: { fill: isDark ? '#D1D5DB' : '#003057', fontSize: 12 }
                      }}
                      {...chartProps.xAxis}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="monto" 
                      name="Monto" 
                      unit="$" 
                      domain={[0, 10000]}
                      label={{ 
                        value: 'Monto ($)', 
                        angle: -90, 
                        position: 'left',
                        style: { fill: isDark ? '#D1D5DB' : '#003057', fontSize: 12 }
                      }}
                      {...chartProps.yAxis}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name) => {
                        if (name === 'Días') return `${value} días`;
                        if (name === 'Monto') return `$${value.toLocaleString()}`;
                        return value;
                      }}
                      labelFormatter={(value) => `ID: ${value}`}
                      {...chartProps.tooltip}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #00B2E3'
                      }}
                    />
                    <Scatter 
                      name="Comercializaciones" 
                      data={scatterData} 
                      fill="#00B2E3"
                      legendType="circle"
                      shape="circle"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-[#003057]/70 dark:text-gray-300 mt-2 text-center">
                Cada punto representa una comercialización. Correlación entre tiempo de proceso y monto.
              </p>
            </CardContent>
          </Card>

          {/* Heatmap mensual (visualizado como barras) */}
          <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
            <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
              <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#00B2E3]" />
                Tendencias Mensuales
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid {...chartProps.cartesianGrid} vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      {...chartProps.xAxis}
                    />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      {...chartProps.yAxis}
                      label={{ 
                        value: 'Ventas', 
                        angle: -90, 
                        position: 'left',
                        style: { fill: isDark ? '#D1D5DB' : '#003057', fontSize: 12, textAnchor: 'middle' }
                      }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      tick={{ fill: isDark ? '#60A5FA' : '#0037FF', fontSize: 12 }}
                      label={{ 
                        value: 'Días a Pago', 
                        angle: 90, 
                        position: 'right',
                        style: { fill: isDark ? '#60A5FA' : '#0037FF', fontSize: 12, textAnchor: 'middle' }
                      }}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'Ventas') return [`${value} ventas`, name];
                        if (name === 'Días a Pago') return [`${value} días`, name];
                        return [value, name];
                      }}
                      {...chartProps.tooltip}
                    />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="ventas" 
                      name="Ventas" 
                      fill="#00B2E3" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="diasPromedioPago" 
                      name="Días a Pago" 
                      stroke="#0037FF" 
                      strokeWidth={2}
                      dot={{ fill: '#0037FF', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-[#003057]/70 dark:text-gray-300 mt-2 text-center">
                Relación entre ventas mensuales (barras) y tiempo promedio de pago (línea)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Evolución del Cliente */}
        <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
          <CardHeader className="border-b border-[#00B2E3]/10 dark:border-gray-700">
            <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#003057]" />
              Evolución del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: 'Ene', comercializaciones: 5, facturacion: 20000, pagos: 18000 },
                    { month: 'Feb', comercializaciones: 7, facturacion: 28000, pagos: 20000 },
                    { month: 'Mar', comercializaciones: 8, facturacion: 32000, pagos: 30000 },
                    { month: 'Abr', comercializaciones: 6, facturacion: 24000, pagos: 23000 },
                    { month: 'May', comercializaciones: 9, facturacion: 36000, pagos: 33000 },
                    { month: 'Jun', comercializaciones: 8, facturacion: 32000, pagos: 31000 },
                    { month: 'Jul', comercializaciones: 12, facturacion: 48000, pagos: 45000 },
                    { month: 'Ago', comercializaciones: 11, facturacion: 44000, pagos: 42000 },
                    { month: 'Sep', comercializaciones: 10, facturacion: 40000, pagos: 39000 },
                    { month: 'Oct', comercializaciones: 13, facturacion: 52000, pagos: 50000 },
                    { month: 'Nov', comercializaciones: 11, facturacion: 44000, pagos: 43000 },
                    { month: 'Dic', comercializaciones: 7, facturacion: 28000, pagos: 27000 }
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCom" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003057" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#003057" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFact" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00B2E3" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00B2E3" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPag" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0037FF" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#0037FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fill: '#003057' }} />
                  <YAxis tick={{ fill: '#003057' }} />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'Comercializaciones') return [`${value} unidades`, name];
                      return [`$${value.toLocaleString()}`, name];
                    }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      border: '1px solid #00B2E3' 
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="comercializaciones" 
                    name="Comercializaciones" 
                    stroke="#003057" 
                    fillOpacity={1} 
                    fill="url(#colorCom)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="facturacion" 
                    name="Facturación" 
                    stroke="#00B2E3" 
                    fillOpacity={1} 
                    fill="url(#colorFact)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pagos" 
                    name="Pagos" 
                    stroke="#0037FF" 
                    fillOpacity={1} 
                    fill="url(#colorPag)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-center">
                <h4 className="text-sm font-medium text-[#003057] dark:text-white">Comercializaciones YTD</h4>
                <p className="text-xl font-bold text-[#003057] dark:text-white">106</p>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-medium text-[#00B2E3]">Facturación Anual</h4>
                <p className="text-xl font-bold text-[#00B2E3]">$428,000</p>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-medium text-[#0037FF] dark:text-blue-400">Pagos Recibidos</h4>
                <p className="text-xl font-bold text-[#0037FF] dark:text-blue-400">$401,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
