import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/hooks/useTranslation'
import { Building2, Search, TrendingUp, Users, Calendar, Clock, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'
import { clientesService } from '@/services/api'

export default function CompaniesPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [companiesData, setCompaniesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [companiesPerPage] = useState(9)

  // Cargar datos de clientes desde la API
  useEffect(() => {
    const cargarClientes = async () => {
      try {
        setLoading(true)
        const data = await clientesService.listar()
        
        // Procesar los datos para que coincidan con la estructura esperada
        const processedCompanies = data.datos?.clientes?.map((cliente) => ({
          id: cliente.id,
          name: cliente.nombre,
          logo: "/company-logos/default.png",
          industry: "companies.industries.various", // Valor genérico
          employees: Math.floor(Math.random() * 500) + 50, // Valor simulado
          status: cliente.estadisticas.estado_actividad === 'activo' ? "active" : "inactive",
          lastActivity: cliente.estadisticas.ultima_actividad?.split('T')[0] || new Date().toISOString().split('T')[0],
          
          // Datos específicos de la nueva API (corregido para camelCase)
          totalVentas: cliente.estadisticas.total_ventas,
          totalFacturas: cliente.estadisticas.total_facturas,
          valorTotal: cliente.estadisticas.valor_total_comercializaciones,
          estadoActividad: (() => {
            // Convertir a camelCase
            switch (cliente.estadisticas.estado_actividad) {
              case 'activo': return 'activo';
              case 'poco_activo': return 'pocoActivo';
              case 'inactivo': return 'inactivo';
              case 'muy_inactivo': return 'muyInactivo';
              default: return 'sinDatos';
            }
          })(),
          ultimaActividad: cliente.estadisticas.ultima_actividad,
          
          // Calcular performance basado en estado de actividad
          performance: (() => {
            switch (cliente.estadisticas.estado_actividad) {
              case 'activo': return Math.floor(Math.random() * 20) + 80; // 80-100%
              case 'poco_activo': return Math.floor(Math.random() * 20) + 60; // 60-80%
              case 'inactivo': return Math.floor(Math.random() * 20) + 40; // 40-60%
              case 'muy_inactivo': return Math.floor(Math.random() * 20) + 20; // 20-40%
              default: return 50;
            }
          })()
        })) || []

        // Ordenar: primero activos, luego el resto
        const sortedCompanies = processedCompanies.sort((a, b) => {
          if (a.estadoActividad === 'activo' && b.estadoActividad !== 'activo') return -1;
          if (a.estadoActividad !== 'activo' && b.estadoActividad === 'activo') return 1;
          return 0;
        });

        setCompaniesData(sortedCompanies)
      } catch (err) {
        console.error('Error cargando clientes:', err)
        
        // Datos de fallback cuando el API falle
        const fallbackData = [
          {
            id: 1,
            name: "TechCorp Solutions",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 150,
            status: "active",
            lastActivity: "2025-01-12",
            totalVentas: 45,
            totalFacturas: 67,
            valorTotal: 2500000,
            estadoActividad: 'activo',
            ultimaActividad: "2025-01-12T10:30:00Z",
            performance: 95
          },
          {
            id: 2,
            name: "Global Industries",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 320,
            status: "active",
            lastActivity: "2025-01-11",
            totalVentas: 78,
            totalFacturas: 89,
            valorTotal: 4200000,
            estadoActividad: 'activo',
            ultimaActividad: "2025-01-11T15:45:00Z",
            performance: 88
          },
          {
            id: 3,
            name: "Innovation Labs",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 95,
            status: "active",
            lastActivity: "2025-01-10",
            totalVentas: 32,
            totalFacturas: 41,
            valorTotal: 1800000,
            estadoActividad: 'activo',
            ultimaActividad: "2025-01-10T09:20:00Z",
            performance: 92
          },
          {
            id: 4,
            name: "Future Systems",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 200,
            status: "inactive",
            lastActivity: "2024-12-15",
            totalVentas: 15,
            totalFacturas: 23,
            valorTotal: 890000,
            estadoActividad: 'pocoActivo',
            ultimaActividad: "2024-12-15T14:30:00Z",
            performance: 65
          },
          {
            id: 5,
            name: "Digital Dynamics",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 180,
            status: "inactive",
            lastActivity: "2024-11-20",
            totalVentas: 8,
            totalFacturas: 12,
            valorTotal: 450000,
            estadoActividad: 'inactivo',
            ultimaActividad: "2024-11-20T11:15:00Z",
            performance: 45
          },
          {
            id: 6,
            name: "Smart Enterprises",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 75,
            status: "active",
            lastActivity: "2025-01-09",
            totalVentas: 28,
            totalFacturas: 35,
            valorTotal: 1600000,
            estadoActividad: 'activo',
            ultimaActividad: "2025-01-09T16:00:00Z",
            performance: 89
          },
          {
            id: 7,
            name: "Advanced Tech",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 250,
            status: "inactive",
            lastActivity: "2024-10-05",
            totalVentas: 3,
            totalFacturas: 5,
            valorTotal: 180000,
            estadoActividad: 'muyInactivo',
            ultimaActividad: "2024-10-05T08:45:00Z",
            performance: 25
          },
          {
            id: 8,
            name: "NextGen Corp",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 120,
            status: "active",
            lastActivity: "2025-01-08",
            totalVentas: 38,
            totalFacturas: 44,
            valorTotal: 2100000,
            estadoActividad: 'activo',
            ultimaActividad: "2025-01-08T13:30:00Z",
            performance: 91
          },
          {
            id: 9,
            name: "Pro Solutions",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 85,
            status: "inactive",
            lastActivity: "2024-12-01",
            totalVentas: 12,
            totalFacturas: 18,
            valorTotal: 670000,
            estadoActividad: 'pocoActivo',
            ultimaActividad: "2024-12-01T12:00:00Z",
            performance: 68
          },
          {
            id: 10,
            name: "Elite Systems",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 300,
            status: "active",
            lastActivity: "2025-01-07",
            totalVentas: 55,
            totalFacturas: 72,
            valorTotal: 3200000,
            estadoActividad: 'activo',
            ultimaActividad: "2025-01-07T17:20:00Z",
            performance: 93
          },
          {
            id: 11,
            name: "Modern Industries",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 160,
            status: "inactive",
            lastActivity: "2024-09-12",
            totalVentas: 6,
            totalFacturas: 8,
            valorTotal: 320000,
            estadoActividad: 'inactivo',
            ultimaActividad: "2024-09-12T10:15:00Z",
            performance: 42
          },
          {
            id: 12,
            name: "Quantum Labs",
            logo: "/company-logos/default.png",
            industry: "companies.industries.various",
            employees: 95,
            status: "active",
            lastActivity: "2025-01-06",
            totalVentas: 29,
            totalFacturas: 36,
            valorTotal: 1750000,
            estadoActividad: 'activo',
            ultimaActividad: "2025-01-06T14:45:00Z",
            performance: 87
          }
        ];

        // Ordenar datos de fallback: primero activos
        const sortedFallback = fallbackData.sort((a, b) => {
          if (a.estadoActividad === 'activo' && b.estadoActividad !== 'activo') return -1;
          if (a.estadoActividad !== 'activo' && b.estadoActividad === 'activo') return 1;
          return 0;
        });

        setCompaniesData(sortedFallback)
        setError('Usando datos de demostración - API no disponible')
      } finally {
        setLoading(false)
      }
    }

    cargarClientes()
  }, [])

  const filteredCompanies = companiesData.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Paginación
  const indexOfLastCompany = currentPage * companiesPerPage
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany)
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Resetear página cuando cambie el término de búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleCompanyClick = (companyId) => {
    navigate(`/dashboard/company/${companyId}/analytics`)
  }

  const getStatusBadge = (estadoActividad) => {
    switch (estadoActividad) {
      case 'activo':
        return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700">Activo</Badge>
      case 'pocoActivo':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700">Poco Activo</Badge>
      case 'inactivo':
        return <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700">Inactivo</Badge>
      case 'muyInactivo':
        return <Badge className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700">Muy Inactivo</Badge>
      default:
        return <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">Sin Datos</Badge>
    }
  }

  const getPerformanceColor = (performance) => {
    if (performance >= 80) return 'text-green-600 dark:text-green-400'
    if (performance >= 60) return 'text-[#00B2E3] dark:text-[#00B2E3]'
    if (performance >= 40) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B2E3] mx-auto"></div>
          <p className="text-gray-600">Cargando datos de clientes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Building2 className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-lg font-semibold">Error al cargar datos</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Notification de API Error */}
        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Modo Demostración
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {error}. Se están mostrando datos de ejemplo para probar la funcionalidad.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#003057] dark:from-[#00B2E3] to-[#00B2E3] dark:to-white bg-clip-text text-transparent">
              {t('companies.title')}
            </h1>
            <p className="text-lg text-[#003057]/70 dark:text-gray-300 max-w-2xl mx-auto">
              {t('companies.subtitle')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-[#003057]/50 dark:text-gray-400" />
              <Input
                placeholder={t('companies.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-[#00B2E3]/30 dark:border-gray-600 focus:border-[#00B2E3] dark:focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-gradient-to-br from-white to-[#00B2E3]/5 dark:from-gray-800 dark:to-gray-800/50 shadow-lg dark:shadow-gray-900/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#003057] dark:text-white">{companiesData.length}</div>
                <div className="text-sm text-[#003057]/70 dark:text-gray-300">{t('companies.stats.totalCompanies')}</div>
              </CardContent>
            </Card>
            <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-gradient-to-br from-white to-[#0037FF]/5 dark:from-gray-800 dark:to-gray-800/50 shadow-lg dark:shadow-gray-900/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#003057] dark:text-white">
                  {companiesData.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-[#003057]/70 dark:text-gray-300">{t('companies.stats.activeCompanies')}</div>
              </CardContent>
            </Card>
            <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-gradient-to-br from-white to-[#003057]/5 dark:from-gray-800 dark:to-gray-800/50 shadow-lg dark:shadow-gray-900/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#003057] dark:text-white">
                  {companiesData.length > 0 ? 
                    Math.round(companiesData.reduce((acc, c) => acc + c.performance, 0) / companiesData.length) : 0}%
                </div>
                <div className="text-sm text-[#003057]/70 dark:text-gray-300">{t('companies.stats.averagePerformance')}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCompanies.map((company) => (
            <Card
              key={company.id}
              className="group cursor-pointer border-[#00B2E3]/20 dark:border-gray-700 hover:border-[#00B2E3]/40 dark:hover:border-[#00B2E3]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#00B2E3]/20 dark:hover:shadow-[#00B2E3]/30 bg-gradient-to-br from-white to-[#00B2E3]/3 dark:from-gray-800 dark:to-gray-800/50 hover:from-[#00B2E3]/5 hover:to-[#0037FF]/5 dark:hover:from-gray-700 dark:hover:to-gray-700/80 shadow-md dark:shadow-gray-900/50"
              onClick={() => handleCompanyClick(company.id)}
            >
              <CardContent className="p-6 space-y-4">
                
                {/* Logo y Status */}
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00B2E3]/20 to-[#003057]/10 dark:from-[#00B2E3]/30 dark:to-[#003057]/20 rounded-2xl flex items-center justify-center shadow-sm dark:shadow-gray-900/30">
                    <Building2 className="w-8 h-8 text-[#003057] dark:text-[#00B2E3]" />
                  </div>
                  {getStatusBadge(company.estadoActividad)}
                </div>

                {/* Company Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-[#003057] dark:text-white group-hover:text-[#00B2E3] dark:group-hover:text-[#00B2E3] transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-[#003057]/60 dark:text-gray-400">
                    {company.totalVentas} ventas • {company.totalFacturas} facturas
                  </p>
                </div>

                {/* Métricas específicas de la nueva API */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${getPerformanceColor(company.performance)}`} />
                    <div className="text-xs">
                      <p className="font-medium">Performance</p>
                      <p className={getPerformanceColor(company.performance)}>
                        {company.performance}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#003057]/50 dark:text-gray-400" />
                    <div className="text-xs">
                      <p className="font-medium">Valor Total</p>
                      <p className="text-[#003057] dark:text-white font-semibold">
                        ${(company.valorTotal / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                </div>

                {/* Barra de progreso basada en performance */}
                <div className="pt-2 border-t border-[#00B2E3]/10 dark:border-gray-700">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span>Estado: {
                      company.estadoActividad === 'activo' ? 'Activo' :
                      company.estadoActividad === 'pocoActivo' ? 'Poco Activo' :
                      company.estadoActividad === 'inactivo' ? 'Inactivo' :
                      company.estadoActividad === 'muyInactivo' ? 'Muy Inactivo' :
                      'Sin Datos'
                    }</span>
                    <span>{company.performance}% performance</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        company.performance >= 80 ? 'bg-green-500' :
                        company.performance >= 60 ? 'bg-blue-500' :
                        company.performance >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, company.performance)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Última actividad */}
                <div className="flex items-center space-x-2 text-xs">
                  <Calendar className="w-3 h-3 text-[#003057]/50 dark:text-gray-400" />
                  <span className="text-[#003057]/50 dark:text-gray-400">
                    Última actividad: {new Date(company.ultimaActividad).toLocaleDateString('es-CL')}
                  </span>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 pt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#00B2E3]/30 dark:border-gray-600 rounded-lg hover:bg-[#00B2E3]/5 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex space-x-2">
              {(() => {
                const pages = []
                const maxVisiblePages = 5
                
                if (totalPages <= maxVisiblePages) {
                  // Si hay pocas páginas, mostrar todas
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                  }
                } else {
                  // Lógica para mostrar páginas alrededor de la actual
                  let startPage = Math.max(1, currentPage - 2)
                  let endPage = Math.min(totalPages, currentPage + 2)
                  
                  // Ajustar si estamos cerca del inicio
                  if (currentPage <= 3) {
                    endPage = Math.min(totalPages, 5)
                  }
                  
                  // Ajustar si estamos cerca del final
                  if (currentPage >= totalPages - 2) {
                    startPage = Math.max(1, totalPages - 4)
                  }
                  
                  // Agregar primera página si no está incluida
                  if (startPage > 1) {
                    pages.push(1)
                    if (startPage > 2) {
                      pages.push('...')
                    }
                  }
                  
                  // Agregar páginas del rango
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(i)
                  }
                  
                  // Agregar última página si no está incluida
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push('...')
                    }
                    pages.push(totalPages)
                  }
                }
                
                return pages.map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                        ...
                      </span>
                    )
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-[#00B2E3] text-white'
                          : 'bg-white dark:bg-gray-800 border border-[#00B2E3]/30 dark:border-gray-600 hover:bg-[#00B2E3]/5 dark:hover:bg-gray-700 text-[#003057] dark:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })
              })()}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#00B2E3]/30 dark:border-gray-600 rounded-lg hover:bg-[#00B2E3]/5 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {currentCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto text-[#00B2E3]/50 dark:text-[#00B2E3]/60 mb-4" />
            <h3 className="text-lg font-semibold text-[#003057] dark:text-white mb-2">
              {t('companies.emptyState.title')}
            </h3>
            <p className="text-[#003057]/70 dark:text-gray-300">
              {t('companies.emptyState.subtitle')}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
