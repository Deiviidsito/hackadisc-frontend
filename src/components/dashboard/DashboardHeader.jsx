import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { BarChart3, Filter, Download } from 'lucide-react'

const DashboardHeader = ({ showFilters, setShowFilters, handleExportData }) => {
  return (
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
  )
}

export default DashboardHeader
