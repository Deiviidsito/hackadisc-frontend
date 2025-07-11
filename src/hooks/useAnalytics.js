import { useCallback } from 'react'

/**
 * Hook personalizado para formatear datos y proporcionar utilidades 
 * específicas para el Dashboard de Analíticas
 */
export const useAnalytics = () => {
  
  // Función para formatear números con separadores de miles
  const formatNumber = useCallback((number) => {
    if (typeof number !== 'number') return 'N/A'
    return number.toLocaleString('es-ES')
  }, [])

  // Función para formatear moneda
  const formatCurrency = useCallback((amount, currency = 'CLP') => {
    if (typeof amount !== 'number') return 'N/A'
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }, [])

  // Función para formatear porcentajes
  const formatPercentage = useCallback((value, decimals = 1) => {
    if (typeof value !== 'number') return 'N/A'
    return `${value.toFixed(decimals)}%`
  }, [])

  // Función para formatear días
  const formatDays = useCallback((days) => {
    if (typeof days !== 'number') return 'N/A'
    return `${Math.round(days)} día${Math.round(days) !== 1 ? 's' : ''}`
  }, [])

  // Función para determinar el color según el tiempo de pago
  const getPaymentTimeColor = useCallback((days) => {
    if (days <= 30) return 'text-green-600 dark:text-green-400'
    if (days <= 60) return 'text-yellow-600 dark:text-yellow-400'
    if (days <= 90) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }, [])

  // Función para determinar el color del borde según el tiempo de pago
  const getPaymentTimeBorderColor = useCallback((days) => {
    if (days <= 30) return 'border-green-500'
    if (days <= 60) return 'border-yellow-500'
    if (days <= 90) return 'border-orange-500'
    return 'border-red-500'
  }, [])

  // Función para obtener interpretación del rendimiento
  const getPerformanceInterpretation = useCallback((promedioDias, porcentajePagadas) => {
    if (promedioDias <= 30 && porcentajePagadas >= 90) {
      return { 
        level: 'excellent', 
        text: 'Rendimiento excelente',
        color: 'text-green-600 dark:text-green-400'
      }
    }
    if (promedioDias <= 45 && porcentajePagadas >= 80) {
      return { 
        level: 'good', 
        text: 'Buen rendimiento',
        color: 'text-blue-600 dark:text-blue-400'
      }
    }
    if (promedioDias <= 60 && porcentajePagadas >= 70) {
      return { 
        level: 'regular', 
        text: 'Rendimiento regular',
        color: 'text-yellow-600 dark:text-yellow-400'
      }
    }
    return { 
      level: 'poor', 
      text: 'Necesita mejoras',
      color: 'text-red-600 dark:text-red-400'
    }
  }, [])

  // Función para calcular tendencia entre períodos
  const calculateTrend = useCallback((current, previous) => {
    if (!previous || previous === 0) return { percentage: 0, direction: 'neutral' }
    
    const change = ((current - previous) / previous) * 100
    
    return {
      percentage: Math.abs(change),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      isImprovement: change < 0 // Para tiempos de pago, menos es mejor
    }
  }, [])

  // Función para formatear fechas
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Fecha inválida'
    }
  }, [])

  // Función para obtener el rango de fechas formateado
  const formatDateRange = useCallback((startDate, endDate) => {
    if (!startDate || !endDate) return 'Rango no definido'
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }, [formatDate])

  // Función para generar colores para gráficos
  const getChartColor = useCallback((index) => {
    const colors = [
      '#003057', // Azul INSECAP
      '#00B2E3', // Celeste INSECAP
      '#0037FF', // Azul brillante
      '#34D399', // Verde
      '#F59E0B', // Amarillo/Naranja
      '#EF4444', // Rojo
      '#8B5CF6', // Morado
      '#06B6D4', // Cyan
      '#10B981', // Esmeralda
      '#F97316'  // Naranja
    ]
    return colors[index % colors.length]
  }, [])

  // Función para determinar el estado de salud financiera
  const getFinancialHealth = useCallback((data) => {
    if (!data || !data.resumen_general) return { level: 'unknown', text: 'Sin datos' }
    
    const { porcentaje_pagadas } = data.resumen_general
    const promedioDias = data.estadisticas_tiempo_pago?.promedio?.dias || 0
    
    if (porcentaje_pagadas >= 90 && promedioDias <= 30) {
      return { 
        level: 'excellent', 
        text: 'Salud financiera excelente',
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-900/20'
      }
    }
    if (porcentaje_pagadas >= 80 && promedioDias <= 45) {
      return { 
        level: 'good', 
        text: 'Buena salud financiera',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20'
      }
    }
    if (porcentaje_pagadas >= 70 && promedioDias <= 60) {
      return { 
        level: 'warning', 
        text: 'Salud financiera moderada',
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
      }
    }
    return { 
      level: 'critical', 
      text: 'Salud financiera crítica',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    }
  }, [])

  // Función para preparar datos para exportación
  const prepareExportData = useCallback((data, type = 'csv') => {
    if (!data) return null
    
    switch (type) {
      case 'csv':
        // Convertir array de objetos a CSV
        if (Array.isArray(data)) {
          const headers = Object.keys(data[0] || {})
          const csvContent = [
            headers.join(','),
            ...data.map(row => 
              headers.map(header => 
                typeof row[header] === 'string' && row[header].includes(',') 
                  ? `"${row[header]}"` 
                  : row[header]
              ).join(',')
            )
          ].join('\n')
          return csvContent
        }
        return JSON.stringify(data, null, 2)
        
      case 'json':
        return JSON.stringify(data, null, 2)
        
      default:
        return data
    }
  }, [])

  // Función para descargar datos
  const downloadData = useCallback((data, filename = 'analytics-data', type = 'csv') => {
    const exportData = prepareExportData(data, type)
    if (!exportData) return
    
    const blob = new Blob([exportData], { 
      type: type === 'csv' ? 'text/csv;charset=utf-8;' : 'application/json'
    })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.${type}`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }, [prepareExportData])

  return {
    // Funciones de formateo
    formatNumber,
    formatCurrency,
    formatPercentage,
    formatDays,
    formatDate,
    formatDateRange,
    
    // Funciones de color y estilo
    getPaymentTimeColor,
    getPaymentTimeBorderColor,
    getChartColor,
    
    // Funciones de análisis
    getPerformanceInterpretation,
    calculateTrend,
    getFinancialHealth,
    
    // Funciones de exportación
    prepareExportData,
    downloadData
  }
}
