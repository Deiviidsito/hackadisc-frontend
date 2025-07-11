import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Award,
  Eye,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useAnalytics } from '@/hooks/useAnalytics'

const ClientsTab = ({ clientStatistics }) => {
  const { formatNumber, formatDays } = useAnalytics()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('promedio_dias_pago')
  const [sortOrder, setSortOrder] = useState('desc')

  // Ahora clientStatistics debería tener la estructura { data: [], pagination: {} }
  const clients = clientStatistics?.data || []
  
  // Filtrar y ordenar clientes
  const filteredAndSortedClients = clients
    .filter(client => 
      client.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      // Convertir a número si es necesario
      if (typeof aValue === 'string' && !isNaN(aValue)) {
        aValue = Number(aValue)
      }
      if (typeof bValue === 'string' && !isNaN(bValue)) {
        bValue = Number(bValue)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Categorizar clientes por rendimiento
  const excellentClients = clients.filter(c => c.promedio_dias_pago <= 30)
  const goodClients = clients.filter(c => c.promedio_dias_pago > 30 && c.promedio_dias_pago <= 45)
  const regularClients = clients.filter(c => c.promedio_dias_pago > 45 && c.promedio_dias_pago <= 60)
  const slowClients = clients.filter(c => c.promedio_dias_pago > 60)

  // Top clientes por volumen de facturas
  const topClientsByVolume = [...clients]
    .sort((a, b) => Number(b.total_facturas) - Number(a.total_facturas))
    .slice(0, 5)

  // Clientes con facturas pendientes
  const clientsWithPending = clients.filter(c => Number(c.facturas_pendientes) > 0)

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header mejorado con estadísticas generales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700">Clientes Excelentes</p>
                <p className="text-2xl font-bold text-green-800">{excellentClients.length}</p>
                <p className="text-xs text-green-600">≤ 30 días</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Clientes Buenos</p>
                <p className="text-2xl font-bold text-blue-800">{goodClients.length}</p>
                <p className="text-xs text-blue-600">31-45 días</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-700">Clientes Regulares</p>
                <p className="text-2xl font-bold text-yellow-800">{regularClients.length}</p>
                <p className="text-xs text-yellow-600">46-60 días</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-red-700">Clientes Lentos</p>
                <p className="text-2xl font-bold text-red-800">{slowClients.length}</p>
                <p className="text-xs text-red-600">&gt; 60 días</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top clientes por volumen */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#00B2E3]" />
              Top 5 Clientes por Volumen de Facturas
            </CardTitle>
            <CardDescription>
              Clientes con mayor cantidad de facturas procesadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClientsByVolume.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{client.cliente_nombre}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Promedio: {formatDays(client.promedio_dias_pago)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#00B2E3]">{formatNumber(Number(client.total_facturas))} facturas</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {client.porcentaje_pagadas}% completado
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabla principal mejorada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Estadísticas Detalladas por Cliente ({clients.length} clientes)
                </CardTitle>
                <CardDescription>
                  Análisis completo del comportamiento de pago por cliente
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-3 font-semibold">Cliente</th>
                    <th 
                      className="text-right p-3 font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => handleSort('total_facturas')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Total Facturas
                        {sortBy === 'total_facturas' && (
                          sortOrder === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="text-right p-3 font-semibold">Pagadas</th>
                    <th className="text-right p-3 font-semibold">Pendientes</th>
                    <th 
                      className="text-right p-3 font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => handleSort('porcentaje_pagadas')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        % Pagadas
                        {sortBy === 'porcentaje_pagadas' && (
                          sortOrder === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-right p-3 font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => handleSort('promedio_dias_pago')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Promedio Días
                        {sortBy === 'promedio_dias_pago' && (
                          sortOrder === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="text-right p-3 font-semibold">Rango</th>
                    <th className="text-right p-3 font-semibold">Desv. Estándar</th>
                    <th className="text-center p-3 font-semibold">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredAndSortedClients.map((client, index) => (
                      <motion.tr 
                        key={client.cliente_nombre}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-8 rounded-full ${
                              client.promedio_dias_pago <= 30 ? 'bg-green-500' :
                              client.promedio_dias_pago <= 45 ? 'bg-blue-500' :
                              client.promedio_dias_pago <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">{client.cliente_nombre}</span>
                              {Number(client.facturas_pendientes) > 0 && (
                                <div className="text-xs text-orange-600 dark:text-orange-400">
                                  {client.facturas_pendientes} pendientes
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                            {formatNumber(Number(client.total_facturas))}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                            {formatNumber(Number(client.facturas_pagadas))}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {Number(client.facturas_pendientes) > 0 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
                              {formatNumber(Number(client.facturas_pendientes))}
                            </span>
                          ) : (
                            <span className="text-gray-400">0</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <Badge 
                            variant={client.porcentaje_pagadas >= 90 ? "default" : client.porcentaje_pagadas >= 70 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {client.porcentaje_pagadas}%
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            client.promedio_dias_pago <= 30 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                            client.promedio_dias_pago <= 45 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' :
                            client.promedio_dias_pago <= 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                            'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                          }`}>
                            {formatDays(client.promedio_dias_pago)}
                          </span>
                        </td>
                        <td className="p-3 text-right text-xs text-gray-600 dark:text-gray-400">
                          {client.minimo_dias_pago} - {client.maximo_dias_pago} días
                        </td>
                        <td className="p-3 text-right text-xs text-gray-600 dark:text-gray-400">
                          {client.desviacion_estandar_dias?.toFixed(1)} días
                        </td>
                        <td className="p-3 text-center">
                          {client.promedio_dias_pago <= 30 ? (
                            <div className="flex items-center justify-center">
                              <Award className="h-4 w-4 text-green-500" title="Excelente" />
                            </div>
                          ) : client.promedio_dias_pago <= 45 ? (
                            <div className="flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-blue-500" title="Bueno" />
                            </div>
                          ) : client.promedio_dias_pago <= 60 ? (
                            <div className="flex items-center justify-center">
                              <Clock className="h-4 w-4 text-yellow-500" title="Regular" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <AlertTriangle className="h-4 w-4 text-red-500" title="Lento" />
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Clientes con facturas pendientes */}
      {clientsWithPending.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Clientes con Facturas Pendientes ({clientsWithPending.length})
              </CardTitle>
              <CardDescription className="text-orange-700">
                Requieren seguimiento prioritario para cobro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clientsWithPending.slice(0, 6).map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-orange-200 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {client.cliente_nombre}
                        </h4>
                        <Badge variant="destructive" className="text-xs">
                          {Number(client.facturas_pendientes)} pendientes
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Total:</span>
                          <span className="font-medium ml-1">{Number(client.total_facturas)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Promedio:</span>
                          <span className="font-medium ml-1">{formatDays(client.promedio_dias_pago)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{width: `${client.porcentaje_pagadas}%`}}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ClientsTab
