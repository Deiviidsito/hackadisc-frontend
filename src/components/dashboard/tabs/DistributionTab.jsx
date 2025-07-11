import React from 'react'
import { PieChart, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'
import { useAnalytics } from '@/hooks/useAnalytics'

const DistributionTab = ({ paymentDistribution }) => {
  const { formatNumber } = useAnalytics()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Distribución de Tiempos de Pago
          </CardTitle>
          <CardDescription>
            Análisis de facturas por rangos de tiempo de pago
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={paymentDistribution?.data?.distribucion || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="rango" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'cantidad_facturas' ? formatNumber(value) : `${value}%`,
                    name === 'cantidad_facturas' ? 'Facturas' : 'Porcentaje'
                  ]}
                />
                <Bar dataKey="cantidad_facturas" fill="#00B2E3" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de distribución detallada */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle de Distribución</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(paymentDistribution?.data?.distribucion || []).map((range, index) => (
              <Card key={index} className="border">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{range.rango}</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Facturas:</span>
                        <span className="font-medium">{formatNumber(range.cantidad_facturas)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Porcentaje:</span>
                        <span className="font-medium">{range.porcentaje}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Promedio:</span>
                        <span className="font-medium">{range.promedio_dias_rango} días</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#00B2E3] h-2 rounded-full" 
                        style={{width: `${Math.min(range.porcentaje, 100)}%`}}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DistributionTab
