import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Building2, Search, TrendingUp, Users, Calendar } from 'lucide-react'

export default function CompaniesPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Datos mock de empresas
  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "/company-logos/techcorp.png",
      industry: "Tecnología",
      employees: 250,
      status: "active",
      lastActivity: "2025-01-08",
      performance: 85
    },
    {
      id: 2,
      name: "Green Energy Ltd",
      logo: "/company-logos/greenenergy.png",
      industry: "Energía",
      employees: 180,
      status: "active",
      lastActivity: "2025-01-07",
      performance: 92
    },
    {
      id: 3,
      name: "HealthCare Plus",
      logo: "/company-logos/healthcare.png",
      industry: "Salud",
      employees: 320,
      status: "inactive",
      lastActivity: "2024-12-15",
      performance: 78
    },
    {
      id: 4,
      name: "EduTech Innovations",
      logo: "/company-logos/edutech.png",
      industry: "Educación",
      employees: 95,
      status: "active",
      lastActivity: "2025-01-09",
      performance: 88
    },
    {
      id: 5,
      name: "Financial Group Inc",
      logo: "/company-logos/financial.png",
      industry: "Finanzas",
      employees: 420,
      status: "active",
      lastActivity: "2025-01-08",
      performance: 94
    },
    {
      id: 6,
      name: "Retail Chain SA",
      logo: "/company-logos/retail.png",
      industry: "Retail",
      employees: 680,
      status: "active",
      lastActivity: "2025-01-06",
      performance: 76
    }
  ]

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCompanyClick = (companyId) => {
    navigate(`/dashboard/company/${companyId}/analytics`)
  }

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800 border-green-300">Activo</Badge>
    }
    return <Badge className="bg-gray-100 text-gray-600 border-gray-300">Inactivo</Badge>
  }

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600'
    if (performance >= 80) return 'text-[#00B2E3]'
    if (performance >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#003057] to-[#00B2E3] bg-clip-text text-transparent">
              Empresas
            </h1>
            <p className="text-lg text-[#003057]/70 max-w-2xl mx-auto">
              Gestiona y analiza el desempeño de las empresas participantes
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-[#003057]/50" />
              <Input
                placeholder="Buscar empresa o industria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-[#00B2E3]/30 focus:border-[#00B2E3] focus:ring-[#00B2E3]/20 rounded-lg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Card className="border-[#00B2E3]/20 bg-gradient-to-br from-white to-[#00B2E3]/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#003057]">{companies.length}</div>
                <div className="text-sm text-[#003057]/70">Total Empresas</div>
              </CardContent>
            </Card>
            <Card className="border-[#00B2E3]/20 bg-gradient-to-br from-white to-[#0037FF]/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#003057]">
                  {companies.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-[#003057]/70">Empresas Activas</div>
              </CardContent>
            </Card>
            <Card className="border-[#00B2E3]/20 bg-gradient-to-br from-white to-[#003057]/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#003057]">
                  {Math.round(companies.reduce((acc, c) => acc + c.performance, 0) / companies.length)}%
                </div>
                <div className="text-sm text-[#003057]/70">Performance Promedio</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card
              key={company.id}
              className="group cursor-pointer border-[#00B2E3]/20 hover:border-[#00B2E3]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#00B2E3]/20 bg-gradient-to-br from-white to-[#00B2E3]/3 hover:from-[#00B2E3]/5 hover:to-[#0037FF]/5"
              onClick={() => handleCompanyClick(company.id)}
            >
              <CardContent className="p-6 space-y-4">
                
                {/* Logo y Status */}
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00B2E3]/20 to-[#003057]/10 rounded-2xl flex items-center justify-center shadow-sm">
                    <Building2 className="w-8 h-8 text-[#003057]" />
                  </div>
                  {getStatusBadge(company.status)}
                </div>

                {/* Company Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-[#003057] group-hover:text-[#00B2E3] transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-[#003057]/60">
                    {company.industry}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#00B2E3]" />
                    <span className="text-sm text-[#003057]/70">
                      {company.employees} empleados
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${getPerformanceColor(company.performance)}`} />
                    <span className={`text-sm font-medium ${getPerformanceColor(company.performance)}`}>
                      {company.performance}%
                    </span>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="flex items-center space-x-2 pt-2 border-t border-[#00B2E3]/10">
                  <Calendar className="w-4 h-4 text-[#003057]/50" />
                  <span className="text-xs text-[#003057]/50">
                    Última actividad: {new Date(company.lastActivity).toLocaleDateString('es-ES')}
                  </span>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto text-[#00B2E3]/50 mb-4" />
            <h3 className="text-lg font-semibold text-[#003057] mb-2">
              No se encontraron empresas
            </h3>
            <p className="text-[#003057]/70">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
