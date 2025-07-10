import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/api'
import { 
  Code2, 
  LogOut, 
  LogIn, 
  User,
  Home,
  BarChart3
} from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
      navigate('/')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo y brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 md:space-x-4 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/Insecap_Logo-01.png" 
              alt="INSECAP Logo" 
              className="h-6 md:h-8 w-auto"
            />
            <Separator orientation="vertical" className="h-5 md:h-6" />
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 md:w-5 md:h-5 text-[#003057]" />
              <span className="font-bold text-sm md:text-base text-[#003057]">.env.idia</span>
            </div>
          </Link>

          {/* Navigation links y acciones */}
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* Links de navegación */}
            {user && (
              <div className="hidden sm:flex items-center space-x-1">
                <Link to="/">
                  <Button 
                    variant={isActive('/') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActive('/') ? 'bg-[#003057] text-white' : 'text-[#003057] hover:bg-[#003057]/10'}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Inicio
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    variant={isActive('/dashboard') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActive('/dashboard') ? 'bg-[#003057] text-white' : 'text-[#003057] hover:bg-[#003057]/10'}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              </div>
            )}

            {/* Usuario y acciones */}
            {user ? (
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="hidden md:flex items-center space-x-2 text-sm text-[#003057]">
                  <User className="w-4 h-4" />
                  <span>{user.name || user.email || 'Usuario'}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-[#00B2E3] text-[#003057] hover:bg-[#00B2E3]/10"
                >
                  <LogOut className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Cerrar Sesión</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-[#003057] text-[#003057] hover:bg-[#003057] hover:text-white"
                >
                  <LogIn className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Acceder</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
