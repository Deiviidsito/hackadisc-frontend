import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/hooks/useTranslation'
import { Building2, Search, TrendingUp, Users, Calendar } from 'lucide-react'

export default function CompaniesPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Datos mock de empresas
  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "/company-logos/techcorp.png",
      industry: "companies.industries.technology",
      employees: 250,
      status: "active",
      lastActivity: "2025-01-08",
      performance: 85
    },
    {
      id: 2,
      name: "Green Energy Ltd",
      logo: "/company-logos/greenenergy.png",
      industry: "companies.industries.energy",
      employees: 180,
      status: "active",
      lastActivity: "2025-01-07",
      performance: 92
    },
    {
      id: 3,
      name: "HealthCare Plus",
      logo: "/company-logos/healthcare.png",
      industry: "companies.industries.health",
      employees: 320,
      status: "inactive",
      lastActivity: "2024-12-15",
      performance: 78
    },
    {
      id: 4,
      name: "EduTech Innovations",
      logo: "/company-logos/edutech.png",
      industry: "companies.industries.education",
      employees: 95,
      status: "active",
      lastActivity: "2025-01-09",
      performance: 88
    },
    {
      id: 5,
      name: "Financial Group Inc",
      logo: "/company-logos/financial.png",
      industry: "companies.industries.finance",
      employees: 420,
      status: "active",
      lastActivity: "2025-01-08",
      performance: 94
    },
    {
      id: 6,
      name: "Retail Chain SA",
      logo: "/company-logos/retail.png",
      industry: "companies.industries.retail",
      employees: 680,
      status: "active",
      lastActivity: "2025-01-06",
      performance: 76
    }
  ]

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(company.industry).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCompanyClick = (companyId) => {
    navigate(`/dashboard/company/${companyId}/analytics`)
  }

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700">{t('companies.status.active')}</Badge>
    }
    return <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">{t('companies.status.inactive')}</Badge>
  }

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600 dark:text-green-400'
    if (performance >= 80) return 'text-[#00B2E3] dark:text-[#00B2E3]'
    if (performance >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
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
                <div className="text-2xl font-bold text-[#003057] dark:text-white">{companies.length}</div>
                <div className="text-sm text-[#003057]/70 dark:text-gray-300">{t('companies.stats.totalCompanies')}</div>
              </CardContent>
            </Card>
            <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-gradient-to-br from-white to-[#0037FF]/5 dark:from-gray-800 dark:to-gray-800/50 shadow-lg dark:shadow-gray-900/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#003057] dark:text-white">
                  {companies.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-[#003057]/70 dark:text-gray-300">{t('companies.stats.activeCompanies')}</div>
              </CardContent>
            </Card>
            <Card className="border-[#00B2E3]/20 dark:border-gray-700 bg-gradient-to-br from-white to-[#003057]/5 dark:from-gray-800 dark:to-gray-800/50 shadow-lg dark:shadow-gray-900/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#003057] dark:text-white">
                  {Math.round(companies.reduce((acc, c) => acc + c.performance, 0) / companies.length)}%
                </div>
                <div className="text-sm text-[#003057]/70 dark:text-gray-300">{t('companies.stats.averagePerformance')}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
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
                  {getStatusBadge(company.status)}
                </div>

                {/* Company Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-[#003057] dark:text-white group-hover:text-[#00B2E3] dark:group-hover:text-[#00B2E3] transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-[#003057]/60 dark:text-gray-400">
                    {t(company.industry)}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#00B2E3] dark:text-[#00B2E3]" />
                    <span className="text-sm text-[#003057]/70 dark:text-gray-300">
                      {company.employees} {t('companies.metrics.employees')}
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
                <div className="flex items-center space-x-2 pt-2 border-t border-[#00B2E3]/10 dark:border-gray-700">
                  <Calendar className="w-4 h-4 text-[#003057]/50 dark:text-gray-400" />
                  <span className="text-xs text-[#003057]/50 dark:text-gray-400">
                    {t('companies.metrics.lastActivity')}: {new Date(company.lastActivity).toLocaleDateString('es-ES')}
                  </span>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
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
