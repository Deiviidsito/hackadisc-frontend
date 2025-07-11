import React, { useEffect, useState } from 'react'
import { useStatisticsStore } from '@/store/statisticsStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const TrendsTab = () => {
  const { temporalTrends, isLoading, errors, fetchTemporalTrends } = useStatisticsStore()
  const [groupBy, setGroupBy] = useState('month')

  useEffect(() => {
    // Cargar datos iniciales con agrupación por mes
    fetchTemporalTrends({ agrupacion: groupBy })
  }, [fetchTemporalTrends, groupBy])

  // Preparar datos para los gráficos
  const chartData = temporalTrends?.data?.tendencias?.map(item => ({
    ...item,
    periodo_formatted: formatPeriod(item.periodo, temporalTrends?.data?.agrupacion),
    promedio_dias_formatted: Number(item.promedio_dias_pago).toFixed(1),
    facturas_pagadas_formatted: Number(item.facturas_pagadas).toLocaleString()
  })) || []

  // Formatear periodo para mostrar
  function formatPeriod(periodo, agrupacion) {
    if (!periodo) return ''
    
    if (agrupacion === 'month') {
      const [year, month] = periodo.split('-')
      const date = new Date(year, month - 1)
      return date.toLocaleDateString('es', { year: 'numeric', month: 'short' })
    }
    
    if (agrupacion === 'quarter') {
      const [year, quarter] = periodo.split('-Q')
      return `Q${quarter} ${year}`
    }
    
    return periodo
  }

  // Cambiar agrupación
  const handleGroupByChange = (newGroupBy) => {
    setGroupBy(newGroupBy)
    fetchTemporalTrends({ agrupacion: newGroupBy })
  }

  // Calcular estadísticas generales
  const generalStats = {
    totalPeriodos: temporalTrends?.data?.total_periodos || 0,
    totalFacturas: chartData.reduce((sum, item) => sum + Number(item.facturas_pagadas), 0),
    promedioGeneral: chartData.length > 0 
      ? (chartData.reduce((sum, item) => sum + Number(item.promedio_dias_pago), 0) / chartData.length).toFixed(1)
      : 0,
    mejorPeriodo: chartData.length > 0 
      ? chartData.reduce((min, item) => 
          Number(item.promedio_dias_pago) < Number(min.promedio_dias_pago) ? item : min
        )
      : null,
    peorPeriodo: chartData.length > 0 
      ? chartData.reduce((max, item) => 
          Number(item.promedio_dias_pago) > Number(max.promedio_dias_pago) ? item : max
        )
      : null
  }

  if (isLoading.temporalTrends) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (errors.temporalTrends) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="text-red-600">
            <h3 className="font-semibold">Error al cargar tendencias</h3>
            <p className="text-sm mt-1">{errors.temporalTrends}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controles de agrupación */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tendencias Temporales de Pagos</CardTitle>
              <CardDescription>
                Análisis de comportamiento de pagos a lo largo del tiempo
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={groupBy === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleGroupByChange('month')}
              >
                Por Mes
              </Button>
              <Button
                variant={groupBy === 'quarter' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleGroupByChange('quarter')}
              >
                Por Trimestre
              </Button>
              <Button
                variant={groupBy === 'year' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleGroupByChange('year')}
              >
                Por Año
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{generalStats.totalPeriodos}</div>
            <p className="text-sm text-gray-600">Períodos analizados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{generalStats.totalFacturas.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Total facturas pagadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{generalStats.promedioGeneral} días</div>
            <p className="text-sm text-gray-600">Promedio general</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            {generalStats.mejorPeriodo && (
              <>
                <div className="text-2xl font-bold text-green-600">
                  {Number(generalStats.mejorPeriodo.promedio_dias_pago).toFixed(1)} días
                </div>
                <p className="text-sm text-gray-600">
                  Mejor período ({formatPeriod(generalStats.mejorPeriodo.periodo, temporalTrends?.data?.agrupacion)})
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de tendencias de días promedio */}
      <Card>
        <CardHeader>
          <CardTitle>Evolución del Tiempo Promedio de Pago</CardTitle>
          <CardDescription>
            Tendencia de días promedio que toman los clientes en pagar sus facturas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="periodo_formatted" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                label={{ value: 'Días promedio', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [
                  `${Number(value).toFixed(1)} días`,
                  'Promedio días pago'
                ]}
                labelFormatter={(label) => `Período: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="promedio_dias_pago" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Días promedio"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de volumen de facturas */}
      <Card>
        <CardHeader>
          <CardTitle>Volumen de Facturas Pagadas</CardTitle>
          <CardDescription>
            Cantidad de facturas procesadas por período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="periodo_formatted"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                label={{ value: 'Facturas pagadas', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [
                  `${Number(value).toLocaleString()} facturas`,
                  'Facturas pagadas'
                ]}
                labelFormatter={(label) => `Período: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="facturas_pagadas" 
                fill="#10b981" 
                name="Facturas pagadas"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabla detallada de períodos */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle por Período</CardTitle>
          <CardDescription>
            Estadísticas detalladas de cada período analizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Período</th>
                  <th className="text-right p-2">Facturas Pagadas</th>
                  <th className="text-right p-2">Promedio Días</th>
                  <th className="text-right p-2">Mínimo</th>
                  <th className="text-right p-2">Máximo</th>
                  <th className="text-right p-2">Desv. Estándar</th>
                  <th className="text-center p-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => {
                  const performance = Number(item.promedio_dias_pago) <= 15 
                    ? 'excellent' 
                    : Number(item.promedio_dias_pago) <= 30 
                    ? 'good' 
                    : Number(item.promedio_dias_pago) <= 60 
                    ? 'average' 
                    : 'poor'
                  
                  const performanceColors = {
                    excellent: 'bg-green-100 text-green-800',
                    good: 'bg-blue-100 text-blue-800',
                    average: 'bg-yellow-100 text-yellow-800',
                    poor: 'bg-red-100 text-red-800'
                  }
                  
                  const performanceLabels = {
                    excellent: 'Excelente',
                    good: 'Bueno',
                    average: 'Regular',
                    poor: 'Malo'
                  }

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">
                        {formatPeriod(item.periodo, temporalTrends?.data?.agrupacion)}
                      </td>
                      <td className="p-2 text-right">
                        {Number(item.facturas_pagadas).toLocaleString()}
                      </td>
                      <td className="p-2 text-right font-medium">
                        {Number(item.promedio_dias_pago).toFixed(1)} días
                      </td>
                      <td className="p-2 text-right">
                        {Number(item.minimo_dias_pago)} días
                      </td>
                      <td className="p-2 text-right">
                        {Number(item.maximo_dias_pago)} días
                      </td>
                      <td className="p-2 text-right">
                        {Number(item.desviacion_estandar_dias).toFixed(1)}
                      </td>
                      <td className="p-2 text-center">
                        <Badge className={performanceColors[performance]}>
                          {performanceLabels[performance]}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TrendsTab
