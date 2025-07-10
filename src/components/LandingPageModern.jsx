import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Activity,
  Database,
  Brain,
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0A0B0F] relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,178,227,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,178,227,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B2E3]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#003057]/20 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#003057]/20 border border-[#00B2E3]/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-[#00B2E3] rounded-full animate-pulse"></div>
            <span className="text-[#00B2E3] text-sm font-medium">Próximamente en INSECAP</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-white">Eleva tu</span>
            <br />
            <span className="text-white">Flujo de Trabajo con</span>
            <br />
            <span className="bg-gradient-to-r from-[#00B2E3] via-[#00B2E3] to-white bg-clip-text text-transparent">
              Analíticas
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            La plataforma todo-en-uno que ayuda a los equipos a colaborar, automatizar y 
            entregar resultados excepcionales. Optimiza tus procesos y enfócate en lo que realmente importa.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-xl h-auto"
              onClick={() => navigate('/login')}
            >
              Comenzar Prueba Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-[#003057] text-white hover:bg-[#003057]/20 px-8 py-4 text-lg font-medium rounded-xl h-auto"
            >
              Agendar Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
              <span>Prueba de 14 días</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
              <span>Cancelar en cualquier momento</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Browser Frame */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-1 backdrop-blur-xl border border-white/10">
              <div className="bg-gradient-to-b from-white/5 to-transparent rounded-xl overflow-hidden">
                {/* Browser Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <BarChart3 className="w-4 h-4 text-[#00B2E3]" />
                      <span className="text-sm font-medium">Analytics</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">app.insecap.cl</div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { label: "Total overview", value: "+ 24%", color: "text-[#00B2E3]" },
                      { label: "Active Users", value: "8,420", color: "text-white" },
                      { label: "Revenue", value: "$142K", color: "text-green-400" },
                      { label: "Growth", value: "+18.2%", color: "text-[#00B2E3]" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                        <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-medium">Análisis de Rendimiento</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-[#00B2E3]/20 text-[#00B2E3] border-[#00B2E3]/30 text-xs">
                          Semanal
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Mock Chart */}
                    <div className="h-32 flex items-end justify-between gap-2">
                      {[30, 50, 45, 80, 60, 70, 85, 75, 90, 65, 85, 95].map((height, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[#00B2E3] to-[#00B2E3]/50 rounded-t" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-[#00B2E3] rounded-full p-3 shadow-lg shadow-[#00B2E3]/25">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#003057] rounded-full p-3 shadow-lg shadow-[#003057]/25">
              <TrendingUp className="w-5 h-5 text-[#00B2E3]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Capacidades Avanzadas
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Herramientas poderosas diseñadas para equipos modernos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "IA Integrada",
                description: "Análisis predictivo y automatización inteligente para optimizar decisiones."
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Big Data Analytics",
                description: "Procesa y visualiza grandes volúmenes de datos en tiempo real."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Automatización",
                description: "Workflows automáticos que reducen tareas repetitivas y errores humanos."
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#00B2E3]/20 rounded-2xl flex items-center justify-center text-[#00B2E3] mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "99.9%", label: "Tiempo de actividad" },
              { number: "500+", label: "Empresas activas" },
              { number: "2M+", label: "Datos procesados" },
              { number: "4.9", label: "Calificación", icon: <Star className="w-4 h-4 fill-current" /> }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-[#00B2E3]">{stat.number}</span>
                  {stat.icon && <div className="text-[#00B2E3]">{stat.icon}</div>}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
