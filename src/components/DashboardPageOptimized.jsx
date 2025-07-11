import React, { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useStatisticsStore } from '@/store/statisticsStore'
import { useAnalytics } from '@/hooks/useAnalytics'
import AdvancedMetricsCard from '@/components/AdvancedMetricsCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Componentes modularizados
import DashboardHeader from './dashboard/DashboardHeader'
import DashboardFilters from './dashboard/DashboardFilters'
import DashboardTabs from './dashboard/DashboardTabs'
import KPICards from './dashboard/KPICards'
import DashboardCharts from './dashboard/DashboardCharts'

// Tabs individuales
import OverviewTab from './dashboard/tabs/OverviewTab'
import TrendsTab from './dashboard/tabs/TrendsTab'
import DistributionTab from './dashboard/tabs/DistributionTab'
import ClientsTab from './dashboard/tabs/ClientsTab'
import ComparativeTab from './dashboard/tabs/ComparativeTab'

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

  const { downloadData } = useAnalytics()

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

  const renderTabContent = () => {
    const commonProps = {
      globalSummary,
      clientStatistics,
      temporalTrends,
      paymentDistribution,
      comparativeAnalysis,
      loading
    }

    switch (activeTab) {
      case 'overview':
        return <OverviewTab {...commonProps} />
      case 'trends':
        return <TrendsTab {...commonProps} />
      case 'distribution':
        return <DistributionTab {...commonProps} />
      case 'clients':
        return <ClientsTab {...commonProps} />
      case 'comparative':
        return <ComparativeTab {...commonProps} />
      default:
        return <OverviewTab {...commonProps} />
    }
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
        
        {/* Header */}
        <DashboardHeader 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleExportData={handleExportData}
          loading={loading}
        />

        {/* Filtros */}
        {showFilters && (
          <DashboardFilters 
            onFilterSubmit={onFilterSubmit}
            loading={loading}
          />
        )}

        {/* Navegación por pestañas */}
        <DashboardTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Contenido de las pestañas */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B2E3]"></div>
          </div>
        ) : (
          renderTabContent()
        )}
      </div>
    </div>
  )
}

export default DashboardPage
