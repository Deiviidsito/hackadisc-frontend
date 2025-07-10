import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { authService } from '@/services/api'
import { useAuthStore } from '@/store/authStore'
import { Loader2, Mail, Lock, AlertCircle, Code2, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await authService.login(formData)
      
      // Guardar datos del usuario
      login(response.user || response)
      
      // Redirigir al dashboard
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Error de autenticación. Verifica tus credenciales.'
      )
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.email && formData.password

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0B0F] flex">
      {/* Botón de volver - posición absoluta con fondo adaptativo */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg backdrop-blur-sm transition-colors text-sm lg:text-white/80 lg:hover:text-white lg:bg-black/10 lg:hover:bg-black/20 text-[#003057] dark:text-gray-300 hover:text-[#003057]/70 dark:hover:text-white bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/80 shadow-sm lg:shadow-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Panel izquierdo - Logo e información */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#003057] via-[#00B2E3] to-[#0037FF] relative overflow-hidden">
        {/* Formas decorativas de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-2/3 left-1/2 w-32 h-32 bg-white/8 rounded-full blur-lg"></div>
        </div>
        
        {/* Contenido del panel izquierdo */}
        <div className="relative z-10 flex flex-col justify-center items-center px-16 py-12 text-white text-center w-full">
          <div className="space-y-8 max-w-lg mx-auto">
            <div className="flex flex-col items-center space-y-6">
              <img 
                src="/Insecap_Logo-01.png" 
                alt="INSECAP Logo" 
                className="h-20 w-auto filter brightness-0 invert"
              />
              <div className="flex items-center space-x-3">
                <Code2 className="w-8 h-8" />
                <span className="text-3xl font-bold">.env.idia</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                Bienvenido de vuelta
              </h1>
              <p className="text-lg text-white/80">
                Accede a la plataforma HACKADISC y explora las herramientas de analíticas más avanzadas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header móvil - solo visible en pantallas pequeñas */}
          <div className="lg:hidden text-center space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <img 
                src="/Insecap_Logo-01.png" 
                alt="INSECAP Logo" 
                className="h-16 w-auto dark:brightness-0 dark:invert"
              />
              <div className="flex items-center space-x-2">
                <Code2 className="w-6 h-6 text-[#003057] dark:text-[#00B2E3]" />
                <span className="text-2xl font-bold text-[#003057] dark:text-white">.env.idia</span>
              </div>
            </div>
          </div>

          {/* Header del formulario */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-[#003057] dark:text-white">
              Iniciar Sesión
            </h2>
            <p className="text-[#003057]/70 dark:text-gray-400">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#003057] dark:text-gray-200 font-medium">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-[#003057]/50 dark:text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu.email@insecap.cl"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-12 h-12 border-gray-300 dark:border-gray-600 focus:border-[#00B2E3] focus:ring-[#00B2E3] rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#003057] dark:text-gray-200 font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-[#003057]/50 dark:text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-12 h-12 border-gray-300 dark:border-gray-600 focus:border-[#00B2E3] focus:ring-[#00B2E3] rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800/50">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full h-12 bg-[#00B2E3] hover:bg-[#00B2E3]/90 text-white font-semibold rounded-lg text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'ACCEDER'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-[#003057]/50 dark:text-gray-500 pt-4">
            <p>HACKADISC 2025 - Desarrollado por .env.idia</p>
          </div>
        </div>
      </div>
    </div>
  )
}
