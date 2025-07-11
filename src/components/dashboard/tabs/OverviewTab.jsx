import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import AdvancedMetricsCard from '@/components/AdvancedMetricsCard'
import KPICards from '../KPICards'
import DashboardCharts from '../DashboardCharts'

const OverviewTab = ({ globalSummary, temporalTrends, paymentDistribution }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* KPIs Principales */}
      <KPICards globalSummary={globalSummary} />

      {/* Integración de AdvancedMetricsCard con animación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8"
      >
        {globalSummary && <AdvancedMetricsCard globalSummary={globalSummary} />}
      </motion.div>

      {/* Sección de Gráficos */}
      <DashboardCharts 
        temporalTrends={temporalTrends}
        paymentDistribution={paymentDistribution}
      />
    </motion.div>
  )
}

export default OverviewTab
