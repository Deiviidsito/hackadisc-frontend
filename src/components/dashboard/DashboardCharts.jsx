import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { LineChart, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'
import { useAnalytics } from '@/hooks/useAnalytics'

const DashboardCharts = ({ temporalTrends, paymentDistribution }) => {
  const { formatNumber } = useAnalytics()

  return (
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
  )
}

export default DashboardCharts
