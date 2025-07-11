import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { BarChart3, PieChart, LineChart, Activity, Users } from 'lucide-react'

const DashboardTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: BarChart3 },
    { id: 'trends', label: 'Tendencias', icon: LineChart },
    { id: 'distribution', label: 'Distribución', icon: PieChart },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'comparative', label: 'Comparativo', icon: Activity }
  ]

  return (
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
  )
}

export default DashboardTabs
