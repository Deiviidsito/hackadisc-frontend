import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/api'
import { 
  Code2, 
  LogOut, 
  User,
  Home,
  BarChart3,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  Menu,
  Building2,
  Bot
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
    }
  }

  const isActive = (path) => location.pathname === path

  const navigationItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Inicio",
      path: "/",
      external: true
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Dashboard",
      path: "/dashboard"
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: "Empresas",
      path: "/dashboard/companies"
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Usuarios",
      path: "/dashboard/users"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Reportes",
      path: "/dashboard/reports"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Configuración",
      path: "/dashboard/settings"
    },
    {
      icon: <Bot className="w-5 h-5" />,
      label: "Capi IA",
      path: "/dashboard/capi",
      highlight: true
    }
  ]

  return (
    <div className={`h-screen bg-gradient-to-b from-[#003057] to-[#003057]/90 text-white flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      
      {/* Header del Sidebar */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img 
                src="/Insecap_Logo-01.png" 
                alt="INSECAP Logo" 
                className="h-8 w-auto filter brightness-0 invert"
              />
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5" />
                <span className="font-bold text-sm">.env.idia</span>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-white/10 p-2"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
        
        {/* Usuario info - solo cuando no está colapsado */}
        {!isCollapsed && (
          <div className="mt-4 p-3 bg-white/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#00B2E3] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || user?.email || 'Usuario'}
                </p>
                <p className="text-xs text-white/70 truncate">
                  {user?.email && user?.name ? user.email : 'Administrador'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, index) => (
          <Link 
            key={index}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              isActive(item.path) 
                ? 'bg-[#00B2E3] text-white shadow-lg' 
                : item.highlight 
                  ? 'bg-gradient-to-r from-[#0037FF]/40 to-[#00B2E3]/40 text-white/90 hover:bg-[#00B2E3]/50 shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className={`${
              isActive(item.path) 
                ? 'text-white' 
                : item.highlight 
                  ? 'text-white animate-pulse' 
                  : 'text-white/80 group-hover:text-white'
            }`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
            {item.highlight && !isCollapsed && (
              <span className="ml-2 text-xs bg-white text-[#003057] px-1.5 py-0.5 rounded-full">
                Nuevo
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-white/20">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={`w-full text-white/80 hover:bg-red-500/20 hover:text-red-200 transition-colors ${
            isCollapsed ? 'px-0' : 'justify-start'
          }`}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="ml-3">Cerrar Sesión</span>}
        </Button>
        
        {!isCollapsed && (
          <div className="mt-3 text-center">
            <p className="text-xs text-white/50">
              HACKADISC 2025
            </p>
            <p className="text-xs text-white/40">
              .env.idia team
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
