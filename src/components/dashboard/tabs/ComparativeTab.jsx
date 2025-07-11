import React from 'react'
import { Activity, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAnalytics } from '@/hooks/useAnalytics'

const ComparativeTab = ({ comparativeAnalysis }) => {
  const { formatNumber } = useAnalytics()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Análisis Comparativo entre Períodos
          </CardTitle>
          <CardDescription>
            Comparación del rendimiento entre dos períodos de tiempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {comparativeAnalysis?.data && (
            <div className="space-y-6">
              {/* Resumen de comparación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{comparativeAnalysis.data.periodo_1.nombre}</CardTitle>
                    <CardDescription>{comparativeAnalysis.data.periodo_1.fechas}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Facturas:</span>
                      <span className="font-semibold">{formatNumber(comparativeAnalysis.data.periodo_1.total_facturas)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Promedio Días:</span>
                      <span className="font-semibold">{comparativeAnalysis.data.periodo_1.promedio_dias} días</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mediana:</span>
                      <span className="font-semibold">{comparativeAnalysis.data.periodo_1.mediana_dias} días</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{comparativeAnalysis.data.periodo_2.nombre}</CardTitle>
                    <CardDescription>{comparativeAnalysis.data.periodo_2.fechas}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Facturas:</span>
                      <span className="font-semibold">{formatNumber(comparativeAnalysis.data.periodo_2.total_facturas)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Promedio Días:</span>
                      <span className="font-semibold">{comparativeAnalysis.data.periodo_2.promedio_dias} días</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mediana:</span>
                      <span className="font-semibold">{comparativeAnalysis.data.periodo_2.mediana_dias} días</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Indicadores de cambio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Cambio en Facturas</div>
                      <div className={`text-2xl font-bold ${
                        comparativeAnalysis.data.comparacion.facturas.diferencia_absoluta >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {comparativeAnalysis.data.comparacion.facturas.diferencia_absoluta >= 0 ? '+' : ''}
                        {formatNumber(comparativeAnalysis.data.comparacion.facturas.diferencia_absoluta)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {comparativeAnalysis.data.comparacion.facturas.interpretacion}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Cambio Tiempo Promedio</div>
                      <div className={`text-2xl font-bold ${
                        comparativeAnalysis.data.comparacion.tiempo_promedio.diferencia_dias <= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {comparativeAnalysis.data.comparacion.tiempo_promedio.diferencia_dias >= 0 ? '+' : ''}
                        {comparativeAnalysis.data.comparacion.tiempo_promedio.diferencia_dias} días
                      </div>
                      <div className="text-xs text-gray-500">
                        {comparativeAnalysis.data.comparacion.tiempo_promedio.interpretacion}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Cambio Mediana</div>
                      <div className={`text-2xl font-bold ${
                        comparativeAnalysis.data.comparacion.mediana.diferencia_dias <= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {comparativeAnalysis.data.comparacion.mediana.diferencia_dias >= 0 ? '+' : ''}
                        {comparativeAnalysis.data.comparacion.mediana.diferencia_dias} días
                      </div>
                      <div className="text-xs text-gray-500">
                        {comparativeAnalysis.data.comparacion.mediana.interpretacion}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Resumen ejecutivo */}
              <Card className={`border-l-4 ${
                comparativeAnalysis.data.comparacion.resumen.mejora_general ? 'border-green-500' : 
                comparativeAnalysis.data.comparacion.resumen.empeora_general ? 'border-red-500' : 'border-yellow-500'
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {comparativeAnalysis.data.comparacion.resumen.mejora_general ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : comparativeAnalysis.data.comparacion.resumen.empeora_general ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                    Resumen del Análisis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={comparativeAnalysis.data.comparacion.resumen.mejora_general ? "default" : "destructive"}>
                        {comparativeAnalysis.data.comparacion.resumen.mejora_general ? "Mejora General" : 
                         comparativeAnalysis.data.comparacion.resumen.empeora_general ? "Empeoramiento General" : "Resultado Mixto"}
                      </Badge>
                    </div>
                    <p className="text-gray-600">
                      En el segundo período se observa {comparativeAnalysis.data.comparacion.resumen.mejora_general ? 'una mejora' : 'un empeoramiento'} 
                      {' '}en el comportamiento general de pagos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ComparativeTab
