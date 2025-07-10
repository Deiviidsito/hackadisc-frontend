import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Code2, 
  Zap, 
  Shield, 
  Users, 
  Cpu, 
  Globe,
  ArrowRight,
  Construction
} from 'lucide-react'

export default function LandingPage() {
  const technologies = [
    'React', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'React Router', 'Recharts', 'Axios'
  ]

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Seguridad",
      description: "Soluciones robustas y seguras"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance",
      description: "Rendimiento optimizado"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Colaboración",
      description: "Trabajo en equipo eficiente"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Innovación",
      description: "Tecnología de vanguardia"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-x-hidden">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center space-x-3 md:space-x-4">
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
            </div>
            <Badge variant="outline" className="border-[#00B2E3] text-[#003057] text-xs md:text-sm px-2 md:px-3 py-1">
              <Construction className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">En construcción</span>
              <span className="sm:hidden">En desarrollo</span>
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 md:space-y-8">
            {/* Badge de estado */}
            <div className="flex justify-center">
              <Badge 
                className="bg-[#00B2E3]/10 text-[#003057] border-[#00B2E3]/20 px-3 py-1 text-xs md:text-sm"
              >
                🚀 Desarrollando el futuro
              </Badge>
            </div>

            {/* Título principal */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="text-[#003057]">Equipo</span>{' '}
                <span className="text-[#00B2E3]">.env.idia</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#003057]/70 max-w-4xl mx-auto leading-relaxed">
                Creando soluciones innovadoras para{' '}
                <span className="font-semibold text-[#0037FF]">INSECAP</span>
              </p>
            </div>

            {/* Estado del proyecto */}
            <div className="flex flex-col items-center space-y-4 md:space-y-6">
              <Card className="border-[#00B2E3]/20 bg-white/60 backdrop-blur-sm max-w-2xl mx-auto">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center justify-center space-x-3 mb-3 md:mb-4">
                    <Construction className="w-6 h-6 md:w-8 md:h-8 text-[#0037FF]" />
                    <h2 className="text-xl md:text-2xl font-bold text-[#003057]">
                      En Construcción
                    </h2>
                  </div>
                  <p className="text-[#003057]/70 text-sm md:text-base lg:text-lg leading-relaxed">
                    Desarrollando una plataforma revolucionaria que transformará 
                    la experiencia educativa y administrativa.
                  </p>
                </CardContent>
              </Card>

              <Button 
                size="lg" 
                className="bg-[#003057] hover:bg-[#003057]/90 text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg"
              >
                Conocer más 
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-[#00B2E3]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#0037FF]/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 md:space-y-12">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003057]">
                Nuestro Enfoque
              </h2>
              <p className="text-base md:text-lg text-[#003057]/70 max-w-3xl mx-auto">
                Combinamos experiencia técnica con visión innovadora para crear 
                soluciones que marquen la diferencia.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border-[#00B2E3]/10 hover:border-[#00B2E3]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00B2E3]/10"
                >
                  <CardContent className="p-4 md:p-6 text-center space-y-3 md:space-y-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-[#00B2E3]/10 rounded-lg flex items-center justify-center text-[#003057]">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-[#003057] text-sm md:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#003057]/70">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 md:space-y-12">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003057]">
                Stack Tecnológico
              </h2>
              <p className="text-base md:text-lg text-[#003057]/70 max-w-3xl mx-auto">
                Utilizando las mejores herramientas para resultados excepcionales
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {technologies.map((tech, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="border-[#00B2E3]/30 text-[#003057] hover:bg-[#00B2E3]/5 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm transition-all duration-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="flex items-center justify-center space-x-3 md:space-x-4">
              <img 
                src="/Insecap_Logo-01.png" 
                alt="INSECAP Logo" 
                className="h-5 md:h-6 w-auto opacity-70"
              />
              <Separator orientation="vertical" className="h-3 md:h-4" />
              <div className="flex items-center space-x-2">
                <Code2 className="w-3 h-3 md:w-4 md:h-4 text-[#003057]/70" />
                <span className="font-semibold text-sm md:text-base text-[#003057]/70">.env.idia</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs md:text-sm text-[#003057]/50">
              <span>© 2025 Equipo .env.idia</span>
              <span className="hidden sm:inline">•</span>
              <span>Desarrollado con ❤️ para INSECAP</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
