import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Filter, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const DashboardFilters = ({ onFilterSubmit, loading }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      dateFrom: '',
      dateTo: '',
      clientType: 'all',
      paymentStatus: 'all',
      amountMin: '',
      amountMax: ''
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3 text-[#003057] dark:text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00B2E3]/20 to-[#0037FF]/20 rounded-lg flex items-center justify-center">
              <Filter className="h-4 w-4 text-[#00B2E3]" />
            </div>
            Filtros de Análisis Avanzado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFilterSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFrom" className="text-sm font-medium text-[#003057] dark:text-gray-200">Fecha Desde</Label>
                <Input 
                  id="dateFrom" 
                  type="date" 
                  {...register('dateFrom')}
                  className="border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo" className="text-sm font-medium text-[#003057] dark:text-gray-200">Fecha Hasta</Label>
                <Input 
                  id="dateTo" 
                  type="date" 
                  {...register('dateTo')}
                  className="border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientType" className="text-sm font-medium text-[#003057] dark:text-gray-200">Tipo de Cliente</Label>
                <select
                  id="clientType"
                  className="w-full px-3 py-2 border border-[#00B2E3]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B2E3]/20 focus:border-[#00B2E3] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  {...register('clientType')}
                >
                  <option value="all">Todos los Clientes</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Estándar</option>
                  <option value="basic">Básico</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus" className="text-sm font-medium text-[#003057] dark:text-gray-200">Estado de Pago</Label>
                <select
                  id="paymentStatus"
                  className="w-full px-3 py-2 border border-[#00B2E3]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B2E3]/20 focus:border-[#00B2E3] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  {...register('paymentStatus')}
                >
                  <option value="all">Todos los Estados</option>
                  <option value="paid">Pagado</option>
                  <option value="pending">Pendiente</option>
                  <option value="overdue">Vencido</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amountMin" className="text-sm font-medium text-[#003057] dark:text-gray-200">Monto Mínimo</Label>
                <Input 
                  id="amountMin" 
                  type="number" 
                  placeholder="$0" 
                  {...register('amountMin')}
                  className="border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amountMax" className="text-sm font-medium text-[#003057] dark:text-gray-200">Monto Máximo</Label>
                <Input 
                  id="amountMax" 
                  type="number" 
                  placeholder="$999,999" 
                  {...register('amountMax')}
                  className="border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  reset()
                  onFilterSubmit({})
                }}
                className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Limpiar Filtros
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="px-8 py-2 bg-gradient-to-r from-[#00B2E3] to-[#0037FF] text-white rounded-lg hover:from-[#0037FF] hover:to-[#003057] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Aplicando...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Aplicar Filtros
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DashboardFilters
