// Utilidades para mejorar los gráficos de Recharts en modo oscuro
import { useEffect, useState } from 'react'

export const useChartTheme = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Verificar si el tema oscuro está activo
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }

    // Verificar inicialmente
    checkDarkMode()

    // Observar cambios en el tema
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return {
    isDark,
    // Colores para modo claro/oscuro
    gridColor: isDark ? '#374151' : '#f0f0f0',
    textColor: isDark ? '#D1D5DB' : '#003057',
    tooltipBg: isDark ? '#1F2937' : '#FFFFFF',
    tooltipBorder: isDark ? '#374151' : '#E5E7EB'
  }
}

// Props predefinidas para componentes de Recharts
export const getChartProps = (isDark) => ({
  cartesianGrid: {
    strokeDasharray: "3 3",
    stroke: isDark ? '#374151' : '#f0f0f0'
  },
  xAxis: {
    tick: { 
      fill: isDark ? '#D1D5DB' : '#003057',
      fontSize: 12 
    }
  },
  yAxis: {
    tick: { 
      fill: isDark ? '#D1D5DB' : '#003057',
      fontSize: 12 
    }
  },
  tooltip: {
    contentStyle: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
      borderRadius: '8px',
      color: isDark ? '#F9FAFB' : '#111827'
    }
  }
})

export default { useChartTheme, getChartProps }
