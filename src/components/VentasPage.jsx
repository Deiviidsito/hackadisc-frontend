import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
// import { facturasService } from '@/services/api' // Uncomment when API is ready
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Users,
  Building2,
  ChevronRight
} from 'lucide-react'

// Mock data para facturas pendientes
const generateMockFacturas = () => {
  const empresas = [
    'TechCorp Solutions SA', 'Innovaciones Digitales Ltd', 'Servicios Empresariales CA',
    'Consultores Estratégicos', 'Sistemas Avanzados Inc', 'Global Business Partners',
    'Desarrollo Tecnológico SA', 'Soluciones Integrales Ltd', 'Comercializadora Nacional',
    'Grupo Empresarial Elite', 'Compañía de Servicios Pro', 'Tecnología y Negocios SA'
  ]
  
  const facturas = []
  const now = new Date()
  
  for (let i = 0; i < 150; i++) {
    // Generar fechas más antiguas primero (orden descendente por antigüedad)
    const diasAtras = Math.floor(Math.random() * 365) + 1
    const fechaEmision = new Date(now.getTime() - (diasAtras * 24 * 60 * 60 * 1000))
    const fechaVencimiento = new Date(fechaEmision.getTime() + (30 * 24 * 60 * 60 * 1000))
    
    const diasVencidos = Math.max(0, Math.floor((now - fechaVencimiento) / (24 * 60 * 60 * 1000)))
    
    facturas.push({
      id: `FAC-${String(i + 1).padStart(4, '0')}`,
      numeroFactura: `2024-${String(i + 1).padStart(6, '0')}`,
      empresa: empresas[Math.floor(Math.random() * empresas.length)],
      monto: Math.floor(Math.random() * 5000000) + 100000, // Entre 100K y 5M
      moneda: 'CRC',
      fechaEmision: fechaEmision.toISOString().split('T')[0],
      fechaVencimiento: fechaVencimiento.toISOString().split('T')[0],
      diasVencidos,
      estado: diasVencidos > 0 ? 'vencida' : 'pendiente',
      prioridad: diasVencidos > 60 ? 'alta' : diasVencidos > 30 ? 'media' : 'baja',
      contacto: `contacto${i + 1}@empresa.com`,
      telefono: `+506 ${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`
    })
  }
  
  // Ordenar por fecha de emisión (más antiguas primero)
  return facturas.sort((a, b) => new Date(a.fechaEmision) - new Date(b.fechaEmision))
}

export default function VentasPage() {
  const [facturas, setFacturas] = useState([])
  const [filteredFacturas, setFilteredFacturas] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('todas')
  const [prioridadFilter, setPrioridadFilter] = useState('todas')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  useEffect(() => {
    // Simular carga de datos
    const loadFacturas = async () => {
      setLoading(true)
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockData = generateMockFacturas()
      setFacturas(mockData)
      setFilteredFacturas(mockData)
      setLoading(false)
    }
    
    loadFacturas()
  }, [])

  useEffect(() => {
    // Aplicar filtros
    let filtered = facturas.filter(factura => {
      const matchesSearch = factura.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           factura.numeroFactura.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           factura.id.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesEstado = estadoFilter === 'todas' || factura.estado === estadoFilter
      const matchesPrioridad = prioridadFilter === 'todas' || factura.prioridad === prioridadFilter
      
      return matchesSearch && matchesEstado && matchesPrioridad
    })
    
    setFilteredFacturas(filtered)
    setCurrentPage(1)
  }, [searchTerm, estadoFilter, prioridadFilter, facturas])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200'
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'baja': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'vencida': return 'bg-red-100 text-red-800 border-red-200'
      case 'pendiente': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Estadísticas resumidas
  const stats = {
    total: filteredFacturas.length,
    montoTotal: filteredFacturas.reduce((sum, f) => sum + f.monto, 0),
    vencidas: filteredFacturas.filter(f => f.estado === 'vencida').length,
    pendientes: filteredFacturas.filter(f => f.estado === 'pendiente').length,
    prioridadAlta: filteredFacturas.filter(f => f.prioridad === 'alta').length
  }

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredFacturas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredFacturas.length / itemsPerPage)

  const exportData = () => {
    const dataStr = JSON.stringify(filteredFacturas, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `facturas_pendientes_${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B2E3]"></div>
              <p className="text-gray-600 dark:text-gray-400">Cargando facturas pendientes...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Gestión de Ventas
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Facturas pendientes ordenadas por antigüedad - {stats.total} facturas activas
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-[#00B2E3] text-[#00B2E3] hover:bg-[#00B2E3] hover:text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
            <Button
              onClick={exportData}
              className="bg-[#003057] hover:bg-[#003057]/90 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Datos
            </Button>
          </div>
        </motion.div>

        {/* Estadísticas rápidas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Facturas</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                  </div>
                  <FileText className="w-8 h-8 text-[#00B2E3]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monto Total</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.montoTotal)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vencidas</p>
                    <p className="text-2xl font-bold text-red-600">{stats.vencidas}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pendientes</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.pendientes}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Prioridad Alta</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.prioridadAlta}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Buscador */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar por empresa, número de factura o ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00B2E3] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Filtro por estado */}
                <div className="min-w-[180px]">
                  <select
                    value={estadoFilter}
                    onChange={(e) => setEstadoFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00B2E3] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="todas">Todos los estados</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="vencida">Vencidas</option>
                  </select>
                </div>

                {/* Filtro por prioridad */}
                <div className="min-w-[180px]">
                  <select
                    value={prioridadFilter}
                    onChange={(e) => setPrioridadFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00B2E3] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="todas">Todas las prioridades</option>
                    <option value="alta">Prioridad Alta</option>
                    <option value="media">Prioridad Media</option>
                    <option value="baja">Prioridad Baja</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de Facturas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Facturas Pendientes ({filteredFacturas.length})
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Página {currentPage} de {totalPages}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Factura
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Empresa
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Monto
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Fecha Emisión
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Días Vencidos
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Prioridad
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {currentItems.map((factura) => (
                      <tr key={factura.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {factura.numeroFactura}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {factura.id}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white max-w-[200px] truncate">
                                {factura.empresa}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {factura.contacto}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(factura.monto)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {new Date(factura.fechaEmision).toLocaleDateString('es-CR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${factura.diasVencidos > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                            {factura.diasVencidos > 0 ? `${factura.diasVencidos} días` : 'Al día'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`text-xs ${getEstadoColor(factura.estado)}`}>
                            {factura.estado === 'vencida' ? 'Vencida' : 'Pendiente'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`text-xs ${getPrioridadColor(factura.prioridad)}`}>
                            {factura.prioridad.charAt(0).toUpperCase() + factura.prioridad.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#00B2E3] hover:text-[#003057] hover:bg-[#00B2E3]/10"
                          >
                            Ver detalles
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Mostrando {indexOfFirstItem + 1} al {Math.min(indexOfLastItem, filteredFacturas.length)} de {filteredFacturas.length} resultados
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    
                    {/* Números de página */}
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i
                      if (pageNum > totalPages) return null
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={currentPage === pageNum ? "bg-[#00B2E3] text-white" : ""}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
