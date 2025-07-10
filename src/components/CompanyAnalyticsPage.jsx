import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Target,
  Award,
  Activity
} from 'lucide-react'

export default function CompanyAnalyticsPage() {
  const { companyId } = useParams()
  const navigate = useNavigate()

  // Mock data - en un caso real vendría de la API
  const company = {
    id: companyId,
    name: "TechCorp Solutions",
    industry: "Tecnología",
    employees: 250,
    status: "active",
    logo: "/company-logos/techcorp.png"
  }

  const metrics = [
    {
      title: "Performance General",
      value: "85%",
      change: "+12%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-[#00B2E3]",
      bgColor: "bg-[#00B2E3]/10"
    },
    {
      title: "Empleados Activos",
      value: "237",
      change: "+8",
      icon: <Users className="w-6 h-6" />,
      color: "text-[#003057]",
      bgColor: "bg-[#003057]/10"
    },
    {
      title: "Ingresos Mensuales",
      value: "$45.2K",
      change: "+15.3%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Objetivos Cumplidos",
      value: "12/15",
      change: "80%",
      icon: <Target className="w-6 h-6" />,
      color: "text-[#0037FF]",
      bgColor: "bg-[#0037FF]/10"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Nuevo empleado registrado",
      user: "Juan Pérez",
      time: "Hace 2 horas",
      type: "user"
    },
    {
      id: 2,
      action: "Objetivo mensual completado",
      user: "Departamento de Ventas",
      time: "Hace 5 horas",
      type: "achievement"
    },
    {
      id: 3,
      action: "Reporte generado",
      user: "María González",
      time: "Hace 1 día",
      type: "report"
    },
    {
      id: 4,
      action: "Capacitación completada",
      user: "Equipo de Desarrollo",
      time: "Hace 2 días",
      type: "training"
    }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return <Users className="w-4 h-4 text-[#00B2E3]" />
      case 'achievement':
        return <Award className="w-4 h-4 text-yellow-600" />
      case 'report':
        return <Activity className="w-4 h-4 text-[#003057]" />
      case 'training':
        return <Target className="w-4 h-4 text-green-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard/companies')}
              className="border-[#003057] text-[#003057] hover:bg-[#003057] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Empresas
            </Button>
          </div>

          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00B2E3]/20 to-[#003057]/10 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-10 h-10 text-[#003057]" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-[#003057]">
                  {company.name}
                </h1>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  Activo
                </Badge>
              </div>
              <p className="text-lg text-[#003057]/70">
                {company.industry} • {company.employees} empleados
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index}
              className="border-[#00B2E3]/20 hover:border-[#00B2E3]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#00B2E3]/10"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {metric.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-[#003057]">
                    {metric.value}
                  </h3>
                  <p className="text-sm text-[#003057]/70">
                    {metric.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Performance Chart Placeholder */}
          <Card className="border-[#00B2E3]/20">
            <CardHeader>
              <CardTitle className="text-[#003057] flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tendencia de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-[#00B2E3]/5 to-[#0037FF]/5 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <TrendingUp className="w-16 h-16 mx-auto text-[#00B2E3]/50" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#003057]">
                      Gráfico de Performance
                    </h3>
                    <p className="text-[#003057]/70">
                      Integración con Recharts en desarrollo
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-[#00B2E3]/20">
            <CardHeader>
              <CardTitle className="text-[#003057] flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 bg-gradient-to-r from-[#00B2E3]/5 to-transparent rounded-lg"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#003057]">
                        {activity.action}
                      </p>
                      <p className="text-xs text-[#003057]/60">
                        {activity.user}
                      </p>
                      <p className="text-xs text-[#003057]/50 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Placeholder */}
        <Card className="border-[#00B2E3]/20">
          <CardHeader>
            <CardTitle className="text-[#003057] flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Análisis Detallado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-[#003057]/5 via-[#00B2E3]/5 to-[#0037FF]/5 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="flex justify-center space-x-4">
                  <TrendingUp className="w-12 h-12 text-[#00B2E3]/50" />
                  <Activity className="w-12 h-12 text-[#003057]/50" />
                  <Target className="w-12 h-12 text-[#0037FF]/50" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#003057]">
                    Dashboard de Analíticas Completo
                  </h3>
                  <p className="text-[#003057]/70 max-w-md mx-auto">
                    Aquí se mostrarán gráficos detallados, métricas avanzadas y reportes 
                    personalizados para {company.name}
                  </p>
                  <Badge className="mt-4 bg-[#0037FF]/10 text-[#0037FF] border-[#0037FF]/20">
                    Próximamente con Recharts
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
