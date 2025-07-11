import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Users,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Eye,
  Calendar
} from 'lucide-react'
import { useStatisticsStore } from '@/store/statisticsStore'
import { useAnalytics } from '@/hooks/useAnalytics'
import AdvancedMetricsCard from '@/components/AdvancedMetricsCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showFilters, setShowFilters] = useState(false)
  
  const {
    globalSummary,
    clientStatistics,
    temporalTrends,
    paymentDistribution,
    comparativeAnalysis,
    loading,
    error,
    fetchGlobalSummary,
    fetchClientStatistics,
    fetchTemporalTrends,
    fetchPaymentDistribution,
    fetchComparativeAnalysis
  } = useStatisticsStore()

  const {
    formatNumber,
    formatPercentage,
    formatDays,
    downloadData
  } = useAnalytics()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      dateFrom: '',
      dateTo: '',
      clientType: 'all',
      paymentStatus: 'all',
      amountMin: '',
      amountMax: ''
    }
  })

  useEffect(() => {
    // Cargar datos iniciales
    fetchGlobalSummary()
    fetchClientStatistics({ page: 1, limit: 10 })
    fetchTemporalTrends()
    fetchPaymentDistribution()
    fetchComparativeAnalysis()
  }, [fetchGlobalSummary, fetchClientStatistics, fetchTemporalTrends, fetchPaymentDistribution, fetchComparativeAnalysis])

  const onFilterSubmit = (data) => {
    const filters = { ...data, page: 1 }
    fetchGlobalSummary(filters)
    fetchClientStatistics(filters)
    fetchTemporalTrends(filters)
    fetchPaymentDistribution(filters)
    fetchComparativeAnalysis(filters)
  }

  const handleExportData = () => {
    const exportData = {
      globalSummary,
      clientStatistics,
      temporalTrends,
      paymentDistribution,
      comparativeAnalysis
    }
    downloadData(exportData, `dashboard-analytics-${new Date().toISOString().split('T')[0]}`)
  }

  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: BarChart3 },
    { id: 'trends', label: 'Tendencias', icon: LineChart },
    { id: 'distribution', label: 'Distribución', icon: PieChart },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'comparative', label: 'Comparativo', icon: Activity }
  ]


  const renderOverviewTab = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* KPIs Principales Mejorados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-[#00B2E3]/10 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-[#00B2E3]/20 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B2E3]/5 to-transparent"></div>
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#00B2E3] rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Facturas</p>
                  </div>
                  <p className="text-3xl font-bold text-[#003057] dark:text-white">
                    {formatNumber(globalSummary?.data?.resumen_general?.total_facturas || 0)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#00B2E3]/10 rounded-lg">
                      <TrendingUp className="h-3 w-3 text-[#00B2E3]" />
                      <span className="text-xs font-medium text-[#00B2E3]">
                        {formatPercentage(globalSummary?.data?.resumen_general?.porcentaje_pagadas || 0)} completadas
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-gradient-to-br from-[#00B2E3] to-[#0037FF] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <DollarSign className="h-7 w-7 text-white" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-emerald-200/50 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pagos Completados</p>
                  </div>
                  <p className="text-3xl font-bold text-[#003057] dark:text-white">
                    {formatNumber(globalSummary?.data?.resumen_general?.facturas_pagadas || 0)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {formatPercentage(globalSummary?.data?.resumen_general?.porcentaje_pagadas || 0)} ratio
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <CheckCircle className="h-7 w-7 text-white" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-amber-100/20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-amber-200/50 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tiempo Promedio</p>
                  </div>
                  <p className="text-3xl font-bold text-[#003057] dark:text-white">
                    {formatDays(globalSummary?.data?.estadisticas_tiempo_pago?.promedio?.dias || 0)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Target className="h-3 w-3 text-amber-600" />
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        Mediana: {formatDays(globalSummary?.data?.estadisticas_tiempo_pago?.mediana_dias || 0)}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <Clock className="h-7 w-7 text-white" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-red-100/20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-red-200/50 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Facturas Pendientes</p>
                  </div>
                  <p className="text-3xl font-bold text-[#003057] dark:text-white">
                    {formatNumber(globalSummary?.data?.resumen_general?.facturas_pendientes || 0)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                      <span className="text-xs font-medium text-red-600 dark:text-red-400">
                        Requieren atención
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <AlertTriangle className="h-7 w-7 text-white" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Integración de AdvancedMetricsCard con animación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8"
      >
        {globalSummary && <AdvancedMetricsCard globalSummary={globalSummary} />}
      </motion.div>

      {/* Sección de Gráficos con animaciones escalonadas */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Gráfico de tendencias temporales */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B2E3]/3 to-transparent"></div>
            <CardHeader className="relative pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-[#00B2E3] to-[#0037FF] rounded-full"></div>
                <div>
                  <CardTitle className="text-xl font-bold text-[#003057] dark:text-white">
                    Tendencias de Pago por Período
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Evolución temporal del promedio de días de pago
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              {temporalTrends?.data?.tendencias?.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={temporalTrends.data.tendencias}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis 
                        dataKey="periodo" 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#cbd5e1' }}
                      />
                      <YAxis 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#cbd5e1' }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'promedio_dias_pago' ? `${value} días` : formatNumber(value),
                          name === 'promedio_dias_pago' ? 'Promedio Días' : 'Facturas Pagadas'
                        ]}
                        labelFormatter={(label) => `Período: ${label}`}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none', 
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(8px)'
                        }}
                      />
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00B2E3" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#00B2E3" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="promedio_dias_pago" 
                        stroke="#00B2E3" 
                        strokeWidth={3}
                        fill="url(#areaGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                      <LineChart className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">No hay datos de tendencias disponibles</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Gráfico de distribución de tiempos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-purple-200/50 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-transparent"></div>
            <CardHeader className="relative pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                <div>
                  <CardTitle className="text-xl font-bold text-[#003057] dark:text-white">
                    Distribución de Tiempos de Pago
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Rangos de tiempo más frecuentes para pagos
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              {paymentDistribution?.data?.distribucion?.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={paymentDistribution.data.distribucion}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis 
                        dataKey="rango" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        axisLine={{ stroke: '#cbd5e1' }}
                      />
                      <YAxis 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#cbd5e1' }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'cantidad_facturas' ? formatNumber(value) : `${value}%`,
                          name === 'cantidad_facturas' ? 'Facturas' : 'Porcentaje'
                        ]}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none', 
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(8px)'
                        }}
                      />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>
                      </defs>
                      <Bar 
                        dataKey="cantidad_facturas" 
                        fill="url(#barGradient)"
                        radius={[6, 6, 0, 0]}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                      <BarChart3 className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">No hay datos de distribución disponibles</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );

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
                onClick={() => window.location.reload()}
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
        
        {/* Header Mejorado */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#003057]/5 via-[#00B2E3]/5 to-[#0037FF]/5 rounded-3xl"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-xl p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00B2E3] to-[#0037FF] rounded-2xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#003057] via-[#00B2E3] to-[#0037FF] bg-clip-text text-transparent">
                      Dashboard Analytics
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      Análisis integral de pagos y estadísticas financieras
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-[#00B2E3]/20 rounded-xl hover:bg-[#00B2E3]/10 dark:hover:bg-[#00B2E3]/20 transition-all duration-200 shadow-sm"
                >
                  <Filter className="h-4 w-4 text-[#00B2E3]" />
                  <span className="text-[#003057] dark:text-gray-200 font-medium">
                    {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00B2E3] to-[#0037FF] text-white rounded-xl hover:from-[#0037FF] hover:to-[#003057] transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                >
                  <Download className="h-4 w-4" />
                  Exportar Datos
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtros Mejorados */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-3 text-[#003057] dark:text-white">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00B2E3]/20 to-[#0037FF]/20 rounded-lg flex items-center justify-center">
                    <Filter className="h-4 w-4 text-[#00B2E3]" />
                  </div>
                  Filtros de Análisis Avanzado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onFilterSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateFrom" className="text-sm font-medium text-[#003057] dark:text-gray-200">Fecha Desde</Label>
                      <Input 
                        id="dateFrom" 
                        type="date" 
                        {...register('dateFrom')}
                        className="border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateTo" className="text-sm font-medium text-[#003057] dark:text-gray-200">Fecha Hasta</Label>
                      <Input 
                        id="dateTo" 
                        type="date" 
                        {...register('dateTo')}
                        className="border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientType" className="text-sm font-medium text-[#003057] dark:text-gray-200">Tipo de Cliente</Label>
                      <select
                        id="clientType"
                        className="w-full px-3 py-2 border border-[#00B2E3]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B2E3]/20 focus:border-[#00B2E3] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        {...register('clientType')}
                      >
                        <option value="all">Todos los Clientes</option>
                        <option value="premium">Premium</option>
                        <option value="standard">Estándar</option>
                        <option value="basic">Básico</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentStatus" className="text-sm font-medium text-[#003057] dark:text-gray-200">Estado de Pago</Label>
                      <select
                        id="paymentStatus"
                        className="w-full px-3 py-2 border border-[#00B2E3]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B2E3]/20 focus:border-[#00B2E3] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        {...register('paymentStatus')}
                      >
                        <option value="all">Todos los Estados</option>
                        <option value="paid">Pagado</option>
                        <option value="pending">Pendiente</option>
                        <option value="overdue">Vencido</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amountMin" className="text-sm font-medium text-[#003057] dark:text-gray-200">Monto Mínimo</Label>
                      <Input 
                        id="amountMin" 
                        type="number" 
                        placeholder="$0" 
                        {...register('amountMin')}
                        className="border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amountMax" className="text-sm font-medium text-[#003057] dark:text-gray-200">Monto Máximo</Label>
                      <Input 
                        id="amountMax" 
                        type="number" 
                        placeholder="$999,999" 
                        {...register('amountMax')}
                        className="border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        reset()
                        onFilterSubmit({})
                      }}
                      className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      Limpiar Filtros
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="px-8 py-2 bg-gradient-to-r from-[#00B2E3] to-[#0037FF] text-white rounded-lg hover:from-[#0037FF] hover:to-[#003057] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Aplicando...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4" />
                          Aplicar Filtros
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navegación por pestañas Mejorada */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg p-2">
            <nav className="flex space-x-2 overflow-x-auto">
              {tabs.map((tab, index) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00B2E3] to-[#0037FF] text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:text-[#00B2E3] dark:hover:text-[#00B2E3] hover:bg-[#00B2E3]/10 dark:hover:bg-[#00B2E3]/20'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#00B2E3] to-[#0037FF] rounded-xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Contenido de las pestañas */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B2E3]"></div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'trends' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Header del tab */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center space-y-3"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00B2E3] to-[#0037FF] rounded-xl flex items-center justify-center shadow-lg">
                      <LineChart className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#003057] dark:text-white">Análisis de Tendencias</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Evolución temporal del comportamiento de pagos y métricas clave
                  </p>
                </motion.div>

                {/* Gráfico principal de tendencias */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-blue-200/50 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B2E3]/3 to-transparent"></div>
                    <CardHeader className="relative pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-8 bg-gradient-to-b from-[#00B2E3] to-[#0037FF] rounded-full"></div>
                          <div>
                            <CardTitle className="text-xl font-bold text-[#003057] dark:text-white">
                              Tendencias Temporales de Pagos
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                              Evolución del comportamiento de pagos por período
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-[#00B2E3]/10 rounded-lg">
                            <span className="text-xs font-medium text-[#00B2E3]">
                              {temporalTrends?.data?.tendencias?.length || 0} períodos
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      {temporalTrends?.data?.tendencias?.length > 0 ? (
                        <div className="h-96">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={temporalTrends.data.tendencias}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                              <XAxis 
                                dataKey="periodo" 
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={{ stroke: '#cbd5e1' }}
                              />
                              <YAxis 
                                yAxisId="left" 
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={{ stroke: '#cbd5e1' }}
                                label={{ value: 'Días de Pago', angle: -90, position: 'insideLeft' }}
                              />
                              <YAxis 
                                yAxisId="right" 
                                orientation="right" 
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={{ stroke: '#cbd5e1' }}
                                label={{ value: 'Cantidad', angle: 90, position: 'insideRight' }}
                              />
                              <Tooltip 
                                formatter={(value, name) => [
                                  name === 'promedio_dias_pago' ? `${value} días` : formatNumber(value),
                                  name === 'promedio_dias_pago' ? 'Promedio Días' : 'Facturas Pagadas'
                                ]}
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                  border: 'none', 
                                  borderRadius: '12px',
                                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                  backdropFilter: 'blur(8px)'
                                }}
                              />
                              <defs>
                                <linearGradient id="trendsGradient1" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="#00B2E3" />
                                  <stop offset="100%" stopColor="#0037FF" />
                                </linearGradient>
                                <linearGradient id="trendsGradient2" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="#10b981" />
                                  <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                              </defs>
                              <Line 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="promedio_dias_pago" 
                                stroke="url(#trendsGradient1)" 
                                strokeWidth={3}
                                dot={{ fill: '#00B2E3', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#0037FF' }}
                                name="Promedio Días Pago"
                              />
                              <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="facturas_pagadas" 
                                stroke="url(#trendsGradient2)" 
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#059669' }}
                                name="Facturas Pagadas"
                              />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="h-96 flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                              <LineChart className="h-10 w-10 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No hay datos de tendencias</h3>
                              <p className="text-gray-500 dark:text-gray-400">Los datos se mostrarán cuando estén disponibles</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Tabla de datos detallados */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700 shadow-xl rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-transparent"></div>
                    <CardHeader className="relative pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                        <div>
                          <CardTitle className="text-xl font-bold text-[#003057] dark:text-white">
                            Detalle por Período
                          </CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                            Información completa de métricas por período
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      {temporalTrends?.data?.tendencias?.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left p-3 font-semibold text-[#003057] dark:text-white">Período</th>
                                <th className="text-right p-3 font-semibold text-[#003057] dark:text-white">Facturas</th>
                                <th className="text-right p-3 font-semibold text-[#003057] dark:text-white">Promedio Días</th>
                                <th className="text-right p-3 font-semibold text-[#003057] dark:text-white">Rango Días</th>
                                <th className="text-right p-3 font-semibold text-[#003057] dark:text-white">Desv. Estándar</th>
                              </tr>
                            </thead>
                            <tbody>
                              {temporalTrends.data.tendencias.map((trend, index) => (
                                <motion.tr 
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                  <td className="p-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-3 h-3 bg-gradient-to-r from-[#00B2E3] to-[#0037FF] rounded-full"></div>
                                      <span className="font-medium text-[#003057] dark:text-white">{trend.periodo}</span>
                                    </div>
                                  </td>
                                  <td className="p-3 text-right">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                                      {formatNumber(trend.facturas_pagadas)}
                                    </span>
                                  </td>
                                  <td className="p-3 text-right">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                                      {formatDays(trend.promedio_dias_pago)}
                                    </span>
                                  </td>
                                  <td className="p-3 text-right text-xs text-gray-600 dark:text-gray-400">
                                    {trend.minimo_dias_pago} - {trend.maximo_dias_pago} días
                                  </td>
                                  <td className="p-3 text-right text-gray-700 dark:text-gray-300">
                                    {trend.desviacion_estandar_dias?.toFixed(1)}
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="py-12 text-center">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">No hay datos detallados disponibles</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
            {activeTab === 'distribution' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Distribución de Tiempos de Pago
                    </CardTitle>
                    <CardDescription>
                      Análisis de facturas por rangos de tiempo de pago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={paymentDistribution?.data?.distribucion || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="rango" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value, name) => [
                              name === 'cantidad_facturas' ? formatNumber(value) : `${value}%`,
                              name === 'cantidad_facturas' ? 'Facturas' : 'Porcentaje'
                            ]}
                          />
                          <Bar dataKey="cantidad_facturas" fill="#00B2E3" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabla de distribución detallada */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detalle de Distribución</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(paymentDistribution?.data?.distribucion || []).map((range, index) => (
                        <Card key={index} className="border">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm">{range.rango}</h4>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>Facturas:</span>
                                  <span className="font-medium">{formatNumber(range.cantidad_facturas)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Porcentaje:</span>
                                  <span className="font-medium">{range.porcentaje}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Promedio:</span>
                                  <span className="font-medium">{range.promedio_dias_rango} días</span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#00B2E3] h-2 rounded-full" 
                                  style={{width: `${Math.min(range.porcentaje, 100)}%`}}
                                ></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeTab === 'clients' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Estadísticas por Cliente
                    </CardTitle>
                    <CardDescription>
                      Análisis del comportamiento de pago por cliente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3">Cliente</th>
                            <th className="text-right p-3">Total Facturas</th>
                            <th className="text-right p-3">Pagadas</th>
                            <th className="text-right p-3">Pendientes</th>
                            <th className="text-right p-3">% Pagadas</th>
                            <th className="text-right p-3">Promedio Días</th>
                            <th className="text-right p-3">Rango</th>
                            <th className="text-center p-3">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(clientStatistics?.data || []).map((client, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-medium">{client.cliente_nombre}</td>
                              <td className="p-3 text-right">{formatNumber(client.total_facturas)}</td>
                              <td className="p-3 text-right text-green-600">{formatNumber(client.facturas_pagadas)}</td>
                              <td className="p-3 text-right text-orange-600">{formatNumber(client.facturas_pendientes)}</td>
                              <td className="p-3 text-right">
                                <Badge 
                                  variant={client.porcentaje_pagadas >= 90 ? "default" : client.porcentaje_pagadas >= 70 ? "secondary" : "destructive"}
                                  className="text-xs"
                                >
                                  {client.porcentaje_pagadas}%
                                </Badge>
                              </td>
                              <td className="p-3 text-right">{formatDays(client.promedio_dias_pago)}</td>
                              <td className="p-3 text-right text-xs text-gray-500">
                                {client.minimo_dias_pago} - {client.maximo_dias_pago} días
                              </td>
                              <td className="p-3 text-center">
                                {client.promedio_dias_pago <= 30 ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                                ) : client.promedio_dias_pago <= 60 ? (
                                  <Clock className="h-4 w-4 text-orange-500 mx-auto" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-red-500 mx-auto" />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Resumen de clientes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {(clientStatistics?.data || []).filter(c => c.promedio_dias_pago <= 30).length}
                        </div>
                        <div className="text-sm text-gray-600">Clientes Excelentes</div>
                        <div className="text-xs text-gray-500">≤ 30 días promedio</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {(clientStatistics?.data || []).filter(c => c.promedio_dias_pago > 30 && c.promedio_dias_pago <= 60).length}
                        </div>
                        <div className="text-sm text-gray-600">Clientes Regulares</div>
                        <div className="text-xs text-gray-500">31-60 días promedio</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {(clientStatistics?.data || []).filter(c => c.promedio_dias_pago > 60).length}
                        </div>
                        <div className="text-sm text-gray-600">Clientes Lentos</div>
                        <div className="text-xs text-gray-500">&gt; 60 días promedio</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            {activeTab === 'comparative' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Análisis Comparativo entre Períodos
                    </CardTitle>
                    <CardDescription>
                      Comparación del rendimiento entre dos períodos de tiempo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {comparativeAnalysis?.data && (
                      <div className="space-y-6">
                        {/* Resumen de comparación */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{comparativeAnalysis.data.periodo_1.nombre}</CardTitle>
                              <CardDescription>{comparativeAnalysis.data.periodo_1.fechas}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex justify-between">
                                <span>Total Facturas:</span>
                                <span className="font-semibold">{formatNumber(comparativeAnalysis.data.periodo_1.total_facturas)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Promedio Días:</span>
                                <span className="font-semibold">{comparativeAnalysis.data.periodo_1.promedio_dias} días</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Mediana:</span>
                                <span className="font-semibold">{comparativeAnalysis.data.periodo_1.mediana_dias} días</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{comparativeAnalysis.data.periodo_2.nombre}</CardTitle>
                              <CardDescription>{comparativeAnalysis.data.periodo_2.fechas}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex justify-between">
                                <span>Total Facturas:</span>
                                <span className="font-semibold">{formatNumber(comparativeAnalysis.data.periodo_2.total_facturas)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Promedio Días:</span>
                                <span className="font-semibold">{comparativeAnalysis.data.periodo_2.promedio_dias} días</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Mediana:</span>
                                <span className="font-semibold">{comparativeAnalysis.data.periodo_2.mediana_dias} días</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Indicadores de cambio */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card className="border">
                            <CardContent className="p-6 text-center">
                              <div className="space-y-2">
                                <div className="text-sm text-gray-600">Cambio en Facturas</div>
                                <div className={`text-2xl font-bold ${
                                  comparativeAnalysis.data.comparacion.facturas.diferencia_absoluta >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {comparativeAnalysis.data.comparacion.facturas.diferencia_absoluta >= 0 ? '+' : ''}
                                  {formatNumber(comparativeAnalysis.data.comparacion.facturas.diferencia_absoluta)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {comparativeAnalysis.data.comparacion.facturas.interpretacion}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border">
                            <CardContent className="p-6 text-center">
                              <div className="space-y-2">
                                <div className="text-sm text-gray-600">Cambio Tiempo Promedio</div>
                                <div className={`text-2xl font-bold ${
                                  comparativeAnalysis.data.comparacion.tiempo_promedio.diferencia_dias <= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {comparativeAnalysis.data.comparacion.tiempo_promedio.diferencia_dias >= 0 ? '+' : ''}
                                  {comparativeAnalysis.data.comparacion.tiempo_promedio.diferencia_dias} días
                                </div>
                                <div className="text-xs text-gray-500">
                                  {comparativeAnalysis.data.comparacion.tiempo_promedio.interpretacion}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border">
                            <CardContent className="p-6 text-center">
                              <div className="space-y-2">
                                <div className="text-sm text-gray-600">Cambio Mediana</div>
                                <div className={`text-2xl font-bold ${
                                  comparativeAnalysis.data.comparacion.mediana.diferencia_dias <= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {comparativeAnalysis.data.comparacion.mediana.diferencia_dias >= 0 ? '+' : ''}
                                  {comparativeAnalysis.data.comparacion.mediana.diferencia_dias} días
                                </div>
                                <div className="text-xs text-gray-500">
                                  {comparativeAnalysis.data.comparacion.mediana.interpretacion}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Resumen ejecutivo */}
                        <Card className={`border-l-4 ${
                          comparativeAnalysis.data.comparacion.resumen.mejora_general ? 'border-green-500' : 
                          comparativeAnalysis.data.comparacion.resumen.empeora_general ? 'border-red-500' : 'border-yellow-500'
                        }`}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              {comparativeAnalysis.data.comparacion.resumen.mejora_general ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : comparativeAnalysis.data.comparacion.resumen.empeora_general ? (
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                              ) : (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              )}
                              Resumen del Análisis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant={comparativeAnalysis.data.comparacion.resumen.mejora_general ? "default" : "destructive"}>
                                  {comparativeAnalysis.data.comparacion.resumen.mejora_general ? "Mejora General" : 
                                   comparativeAnalysis.data.comparacion.resumen.empeora_general ? "Empeoramiento General" : "Resultado Mixto"}
                                </Badge>
                              </div>
                              <p className="text-gray-600">
                                En el segundo período se observa {comparativeAnalysis.data.comparacion.resumen.mejora_general ? 'una mejora' : 'un empeoramiento'} 
                                {' '}en el comportamiento general de pagos.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
