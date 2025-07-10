import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { authService } from '@/services/api'
import { useAuthStore } from '@/store/authStore'
import { 
  Users, 
  BarChart3, 
  FileText, 
  Settings
} from 'lucide-react'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    
    // Cargar usuarios al montar el componente
    loadUsers()
  }, [user, navigate])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await authService.getAllUsers()
      setUsers(response.users || response || [])
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const dashboardCards = [
    {
      title: "Total Usuarios",
      value: users.length || "0",
      icon: <Users className="w-6 h-6" />,
      color: "text-[#003057]"
    },
    {
      title: "Analíticas",
      value: "En desarrollo",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-[#00B2E3]"
    },
    {
      title: "Reportes",
      value: "Próximamente",
      icon: <FileText className="w-6 h-6" />,
      color: "text-[#0037FF]"
    },
    {
      title: "Configuración",
      value: "Disponible",
      icon: <Settings className="w-6 h-6" />,
      color: "text-gray-600"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-[#003057]">
              Dashboard HACKADISC
            </h1>
            <p className="text-lg text-[#003057]/70">
              Bienvenido a la plataforma de analíticas y reportes
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <Card 
                key={index}
                className="border-[#00B2E3]/10 hover:border-[#00B2E3]/30 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-[#003057]/70">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#003057]">
                      {card.value}
                    </div>
                    <div className={card.color}>
                      {card.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Users Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#003057] flex items-center gap-2">
                <Users className="w-5 h-5" />
                Usuarios del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-[#003057]/70 py-8">
                  Cargando usuarios...
                </p>
              ) : users.length > 0 ? (
                <div className="space-y-2">
                  {users.slice(0, 5).map((user, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-[#003057]">
                          {user.name || user.email}
                        </p>
                        {user.email && user.name && (
                          <p className="text-sm text-[#003057]/70">{user.email}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {user.role || 'Usuario'}
                      </Badge>
                    </div>
                  ))}
                  {users.length > 5 && (
                    <p className="text-center text-sm text-[#003057]/70 pt-4">
                      Y {users.length - 5} usuarios más...
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-center text-[#003057]/70 py-8">
                  No se encontraron usuarios o error de conexión
                </p>
              )}
            </CardContent>
          </Card>

          {/* Analytics Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#003057] flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Vista Previa de Analíticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 space-y-4">
                <BarChart3 className="w-16 h-16 mx-auto text-[#00B2E3]/50" />
                <h3 className="text-lg font-semibold text-[#003057]">
                  Analíticas en Desarrollo
                </h3>
                <p className="text-[#003057]/70">
                  Esta sección contendrá gráficos y reportes detallados para el análisis de datos.
                </p>
                <Badge className="bg-[#0037FF]/10 text-[#0037FF] border-[#0037FF]/20">
                  Próximamente con Recharts
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
