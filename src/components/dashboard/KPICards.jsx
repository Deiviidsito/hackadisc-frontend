import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Target
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useAnalytics } from '@/hooks/useAnalytics'

const KPICards = ({ globalSummary }) => {
  const { formatNumber, formatPercentage, formatDays } = useAnalytics()

  const kpis = [
    {
      title: 'Total Facturas',
      value: formatNumber(globalSummary?.data?.resumen_general?.total_facturas || 0),
      subtitle: `${formatPercentage(globalSummary?.data?.resumen_general?.porcentaje_pagadas || 0)} completadas`,
      icon: DollarSign,
      gradient: 'from-[#00B2E3] to-[#0037FF]',
      bgGradient: 'from-white via-blue-50/30 to-[#00B2E3]/10',
      borderColor: 'border-[#00B2E3]/20',
      iconBg: 'from-[#00B2E3] to-[#0037FF]',
      indicatorColor: 'bg-[#00B2E3]',
      badgeColor: 'bg-[#00B2E3]/10 text-[#00B2E3]',
      delay: 0.1
    },
    {
      title: 'Pagos Completados',
      value: formatNumber(globalSummary?.data?.resumen_general?.facturas_pagadas || 0),
      subtitle: `${formatPercentage(globalSummary?.data?.resumen_general?.porcentaje_pagadas || 0)} ratio`,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-white via-emerald-50/30 to-emerald-100/20',
      borderColor: 'border-emerald-200/50',
      iconBg: 'from-emerald-500 to-emerald-600',
      indicatorColor: 'bg-emerald-500',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
      delay: 0.2
    },
    {
      title: 'Tiempo Promedio',
      value: formatDays(globalSummary?.data?.estadisticas_tiempo_pago?.promedio?.dias || 0),
      subtitle: `Mediana: ${formatDays(globalSummary?.data?.estadisticas_tiempo_pago?.mediana_dias || 0)}`,
      icon: Clock,
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-white via-amber-50/30 to-amber-100/20',
      borderColor: 'border-amber-200/50',
      iconBg: 'from-amber-500 to-amber-600',
      indicatorColor: 'bg-amber-500',
      badgeColor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      delay: 0.3
    },
    {
      title: 'Facturas Pendientes',
      value: formatNumber(globalSummary?.data?.resumen_general?.facturas_pendientes || 0),
      subtitle: 'Requieren atención',
      icon: AlertTriangle,
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-white via-red-50/30 to-red-100/20',
      borderColor: 'border-red-200/50',
      iconBg: 'from-red-500 to-red-600',
      indicatorColor: 'bg-red-500',
      badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      delay: 0.4
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: kpi.delay }}
          >
            <Card className={`relative overflow-hidden bg-gradient-to-br ${kpi.bgGradient} dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border ${kpi.borderColor} dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group`}>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent"></div>
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${kpi.indicatorColor} rounded-full animate-pulse`}></div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.title}</p>
                    </div>
                    <p className="text-3xl font-bold text-[#003057] dark:text-white">
                      {kpi.value}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 px-2 py-1 ${kpi.badgeColor} rounded-lg`}>
                        {index === 0 && <TrendingUp className="h-3 w-3" />}
                        {index === 1 && <CheckCircle className="h-3 w-3" />}
                        {index === 2 && <Target className="h-3 w-3" />}
                        {index === 3 && <AlertTriangle className="h-3 w-3" />}
                        <span className="text-xs font-medium">
                          {kpi.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ 
                      rotate: index === 0 ? 360 : index === 1 ? 0 : index === 2 ? 180 : 0,
                      scale: index === 1 || index === 3 ? 1.1 : 1
                    }}
                    transition={{ duration: index === 0 ? 0.5 : 0.2 }}
                    className={`w-14 h-14 bg-gradient-to-br ${kpi.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

export default KPICards
