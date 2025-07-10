import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { authService } from '@/services/api'
import { 
  Code2, 
  LogOut, 
  LogIn, 
  User,
  Home,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme, isDark } = useThemeStore()

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
    <nav className="border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#0A0B0F]/90 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Logo y brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 md:space-x-4 hover:opacity-80 transition-all duration-300"
          >
            <img 
              src="/Insecap_Logo-01.png" 
              alt="INSECAP Logo" 
              className="h-7 md:h-9 w-auto dark:brightness-0 dark:invert"
            />
            <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-white/20"></div>
            <div className="flex items-center space-x-2">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-[#00B2E3]" />
              <span className="font-bold text-base md:text-lg text-gray-900 dark:text-white tracking-tight">.env.idia</span>
            </div>
          </Link>

          {/* Navigation links y acciones */}
          <div className="flex items-center space-x-3 md:space-x-6">
            
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 border-0"
            >
              {isDark() ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            {/* Links de navegación */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/">
                  <Button 
                    variant={isActive('/') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActive('/') 
                      ? 'bg-[#00B2E3] text-white hover:bg-[#00B2E3]/90 font-medium' 
                      : 'text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 border-0 font-medium'
                    }
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Inicio
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    variant={isActive('/dashboard') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActive('/dashboard') 
                      ? 'bg-[#00B2E3] text-white hover:bg-[#00B2E3]/90 font-medium' 
                      : 'text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 border-0 font-medium'
                    }
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              </div>
            )}

            {/* Usuario y acciones */}
            {user ? (
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600 dark:text-white/80">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.name || user.email || 'Usuario'}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-gray-300 dark:border-white/20 text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 bg-transparent font-medium"
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
                  className="border-[#00B2E3] text-[#00B2E3] hover:bg-[#00B2E3] hover:text-white hover:border-[#00B2E3] bg-transparent font-medium transition-all duration-300"
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
