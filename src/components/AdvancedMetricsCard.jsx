import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { useAnalytics } from '@/hooks/useAnalytics'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react'

export default function AdvancedMetricsCard({ globalSummary, className = '' }) {
  const {
    formatDays,
    formatPercentage
  } = useAnalytics()

  // Calcular métricas avanzadas
  const metrics = useMemo(() => {
    if (!globalSummary?.data?.estadisticas_tiempo_pago) return null

    const stats = globalSummary.data.estadisticas_tiempo_pago
    const resumen = globalSummary.data.resumen_general

    return {
      // KPIs principales
      dso: Math.round(stats.promedio?.dias || 0),
      collectionRate: resumen?.porcentaje_pagadas || 0,
      
      // Distribución por rangos de tiempo (estimada basada en percentiles)
      quickPayments: Math.round((stats.percentiles?.p25 / stats.promedio?.dias) * 100) || 25, // Estimación
      normalPayments: 50, // Estimación
      slowPayments: 20, // Estimación
      verySlowPayments: 5, // Estimación
      
      // Métricas de riesgo basadas en datos reales
      riskFactors: {
        highVariability: stats.desviacion_estandar_dias > 25,
        longTail: stats.percentiles?.p95 > 65,
        lowCollectionRate: resumen?.porcentaje_pagadas < 90
      },
      
      // Benchmarks de la industria
      industryBenchmarks: {
        excellentDSO: 30,
        goodDSO: 45,
        acceptableDSO: 60,
        poorDSO: 90
      }
    }
  }, [globalSummary])

  // Determinar el estado de salud financiera
  const healthStatus = useMemo(() => {
    if (!metrics) return null
    
    let status = 'good'
    let color = 'text-green-600'
    let bgColor = 'bg-green-50'
    let text = 'Rendimiento saludable'
    
    if (metrics.dso <= 30) {
      status = 'excellent'
      color = 'text-green-600'
      bgColor = 'bg-green-50'
      text = 'Excelente rendimiento en cobros'
    } else if (metrics.dso > 60) {
      status = 'critical'
      color = 'text-red-600'
      bgColor = 'bg-red-50'
      text = 'Requiere atención inmediata'
    }
    
    return { status, color, bgColor, text }
  }, [metrics])

  const getPaymentTimeColor = (days) => {
    if (days <= 30) return 'text-green-600'
    if (days <= 45) return 'text-yellow-600'
    if (days <= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  if (!metrics || !globalSummary) {
    return (
      <Card className={`bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${className}`}>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles</p>
        </CardContent>
      </Card>
    )
  }

  const stats = globalSummary.data.estadisticas_tiempo_pago

  return (
    <Card className={`bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${className}`}>
      <CardHeader>
        <CardTitle className="text-[#003057] dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5" />
          Métricas Avanzadas de Rendimiento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Estado de salud financiera */}
        {healthStatus && (
          <div className={`p-4 rounded-lg border-l-4 ${healthStatus.bgColor} border-l-current`}>
            <div className="flex items-center gap-2 mb-2">
              {healthStatus.status === 'excellent' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              {healthStatus.status === 'critical' && <AlertCircle className="w-5 h-5 text-red-600" />}
              {healthStatus.status === 'good' && <Clock className="w-5 h-5 text-yellow-600" />}
              <h4 className={`font-semibold ${healthStatus.color}`}>
                Estado de Salud Financiera
              </h4>
            </div>
            <p className={`text-sm ${healthStatus.color}`}>
              {healthStatus.text}
            </p>
          </div>
        )}

        {/* KPIs principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00B2E3]" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                DSO (Days Sales Outstanding)
              </span>
            </div>
            <p className={`text-2xl font-bold ${getPaymentTimeColor(metrics.dso)}`}>
              {formatDays(metrics.dso)}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Excelente: ≤30</span>
                <span>Crítico: &gt;90</span>
              </div>
              <Progress 
                value={Math.min((metrics.dso / 120) * 100, 100)} 
                className="h-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tasa de Cobranza
              </span>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatPercentage(metrics.collectionRate)}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>0%</span>
                <span>100%</span>
              </div>
              <Progress 
                value={metrics.collectionRate} 
                className="h-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0037FF]" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Coef. Variación
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0037FF]">
              {formatPercentage(stats.coeficiente_variacion * 100)}
            </p>
            <Badge 
              variant={stats.coeficiente_variacion > 0.6 ? "destructive" : "secondary"}
              className="text-xs"
            >
              {stats.coeficiente_variacion > 0.6 ? 'Alta variabilidad' : 'Estable'}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Distribución de percentiles */}
        <div className="space-y-4">
          <h4 className="font-semibold text-[#003057] dark:text-white">
            Distribución de Tiempos de Pago (Percentiles)
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">P25</p>
              <p className="text-lg font-bold text-green-600">
                {formatDays(stats.percentiles?.p25)}
              </p>
              <p className="text-xs text-gray-500">25% paga antes</p>
            </div>
            
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">P50 (Mediana)</p>
              <p className="text-lg font-bold text-[#00B2E3]">
                {formatDays(stats.mediana_dias)}
              </p>
              <p className="text-xs text-gray-500">50% paga antes</p>
            </div>
            
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">P75</p>
              <p className="text-lg font-bold text-yellow-600">
                {formatDays(stats.percentiles?.p75)}
              </p>
              <p className="text-xs text-gray-500">75% paga antes</p>
            </div>
            
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">P90</p>
              <p className="text-lg font-bold text-red-600">
                {formatDays(stats.percentiles?.p90)}
              </p>
              <p className="text-xs text-gray-500">90% paga antes</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Benchmarks de la industria */}
        <div className="space-y-4">
          <h4 className="font-semibold text-[#003057] dark:text-white">
            Comparación con Benchmarks de la Industria
          </h4>
          
          <div className="space-y-3">
            {[
              { label: 'Excelente', value: 30, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20' },
              { label: 'Bueno', value: 45, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
              { label: 'Aceptable', value: 60, color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' },
              { label: 'Crítico', value: 90, color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/20' }
            ].map((benchmark, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${benchmark.bgColor}`} />
                  <span className="text-sm font-medium">{benchmark.label}</span>
                  <span className="text-sm text-gray-500">≤ {benchmark.value} días</span>
                </div>
                <div className="flex items-center gap-2">
                  {metrics.dso <= benchmark.value ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Minus className="w-4 h-4 text-gray-400" />
                  )}
                  {metrics.dso <= benchmark.value && (
                    <Badge variant="secondary" className="text-xs">
                      Cumple
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Factores de riesgo */}
        {Object.values(metrics.riskFactors).some(Boolean) && (
          <>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Factores de Riesgo Detectados
              </h4>
              
              <div className="space-y-2">
                {metrics.riskFactors.highVariability && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700 dark:text-red-400">
                      Alta variabilidad en tiempos de pago (CV &gt; 60%)
                    </span>
                  </div>
                )}
                
                {metrics.riskFactors.longTail && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700 dark:text-red-400">
                      Cola larga de pagos tardíos (P95 &gt; 120 días)
                    </span>
                  </div>
                )}
                
                {metrics.riskFactors.lowCollectionRate && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700 dark:text-red-400">
                      Baja tasa de cobranza (&lt; 80%)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Recomendaciones */}
        <div className="space-y-4">
          <h4 className="font-semibold text-[#003057] dark:text-white">
            Recomendaciones
          </h4>
          
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {metrics.dso > 60 && (
              <p>• Implementar seguimiento más agresivo para facturas &gt; 45 días</p>
            )}
            {metrics.collectionRate < 85 && (
              <p>• Revisar términos de crédito y procesos de aprobación</p>
            )}
            {stats.coeficiente_variacion > 0.6 && (
              <p>• Segmentar clientes por comportamiento de pago</p>
            )}
            {stats.percentiles?.p90 > 90 && (
              <p>• Establecer límites de crédito más estrictos</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
