import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Spotlight } from '@/components/ui/spotlight'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { useTranslation } from '@/hooks/useTranslation'
import { 
  BarChart3, 
  TrendingUp, 
  Activity,
  Database,
  Brain,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Clock,
  DollarSign,
  Users
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  const { t } = useTranslation('landing')

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,48,87,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,48,87,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,178,227,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,178,227,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B2E3]/5 dark:bg-[#00B2E3]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#003057]/10 dark:bg-[#003057]/20 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Liquid Background Gradient - Más Opaco */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#003057]/40 via-[#00B2E3]/30 to-cyan-400/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/15 via-blue-500/10 to-emerald-400/15"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#00B2E3]/10 to-[#003057]/20"></div>
        
        {/* Animated Liquid Blobs - Más Sutiles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#00B2E3]/15 to-cyan-400/10 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 to-[#003057]/15 rounded-full blur-2xl animate-pulse delay-1000 transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-emerald-400/10 to-[#00B2E3]/12 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-cyan-300/8 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-3000"></div>
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Floating Particles - Más Sutiles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              <span className="block">La Plataforma</span>
              <div className="flex items-center justify-center flex-wrap gap-4">
                <ContainerTextFlip
                  words={["Analytics", "分析", "アナリティクス", "Analytique", "Аналитика", "Análisis", "Analitica", "تحليلات"]}
                  interval={2500}
                  className=""
                  textClassName="font-black text-[#003057] dark:text-white"
                />
                <span className="font-black text-[#00B2E3]">
                  Empresarial
                </span>
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
              Construida para hacer tu empresa extraordinariamente productiva. 
              <span className="text-cyan-200 font-semibold"> INSECAP Analytics es la mejor manera de transformar datos en decisiones.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg"
              className="bg-white/90 hover:bg-white text-[#003057] px-8 py-4 text-lg font-semibold rounded-lg h-auto transition-all duration-300 hover:scale-105 shadow-xl backdrop-blur-sm"
              onClick={() => navigate('/login')}
            >
              <span className="flex items-center gap-3">
                Acceder a Analytics
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center justify-between p-4 bg-gray-800/80 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <BarChart3 className="w-4 h-4 text-[#00B2E3]" />
                    <span className="text-sm font-medium">INSECAP Analytics Dashboard</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">https://analytics.insecap.cr</div>
              </div>

              {/* Dashboard Content */}
              <div className="p-8 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-6">
                  {[
                    { label: "Ingresos", value: "₡2.8M", change: "+12.5%", color: "text-emerald-300" },
                    { label: "Clientes", value: "1,247", change: "+8.2%", color: "text-[#00B2E3]" },
                    { label: "Conversión", value: "94.2%", change: "+2.1%", color: "text-purple-300" },
                    { label: "Eficiencia", value: "97.8%", change: "+5.3%", color: "text-orange-300" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-800/40 rounded-lg p-4 border border-gray-600/30 backdrop-blur-sm">
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{stat.label}</div>
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.change} este mes</div>
                    </div>
                  ))}
                </div>

                {/* Main Chart Area */}
                <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-600/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">Análisis de Rendimiento</h3>
                      <p className="text-gray-300 text-sm">Tendencias y proyecciones en tiempo real</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1 bg-[#00B2E3]/20 text-[#00B2E3] rounded-md text-xs font-medium backdrop-blur-sm border border-[#00B2E3]/30">
                        En Vivo
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-md text-xs font-medium backdrop-blur-sm border border-emerald-500/30">
                        +18.7% ↗
                      </div>
                    </div>
                  </div>

                  {/* Simplified Chart */}
                  <div className="relative h-40">
                    <div className="flex items-end justify-between gap-2 h-full">
                      {[...Array(24)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#00B2E3]/80 to-cyan-300/60 rounded-t-sm opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105"
                          style={{
                            height: `${30 + Math.random() * 70}%`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Code/Data Section */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-600/20 backdrop-blur-sm">
                    <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#00B2E3]" />
                      Datos en Tiempo Real
                    </h4>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="text-gray-300">
                        <span className="text-purple-300">SELECT</span> * <span className="text-purple-300">FROM</span> analytics
                      </div>
                      <div className="text-gray-300">
                        <span className="text-purple-300">WHERE</span> date = <span className="text-emerald-300">'today'</span>
                      </div>
                      <div className="text-gray-300">
                        <span className="text-purple-300">ORDER BY</span> performance <span className="text-purple-300">DESC</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-600/20 backdrop-blur-sm">
                    <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-emerald-300" />
                      AI Insights
                    </h4>
                    <div className="space-y-3">
                      {[
                        { text: "Incremento proyectado del 24%", confidence: "95%" },
                        { text: "Nuevo segmento detectado", confidence: "87%" },
                        { text: "Optimización sugerida", confidence: "92%" }
                      ].map((insight, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-gray-200">{insight.text}</span>
                          <span className="text-emerald-300 font-medium">{insight.confidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smooth Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent"></div>
      </section>

            {/* Capin AI Showcase */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-[#00B2E3]/5 to-[#003057]/5 dark:from-[#00B2E3]/10 dark:to-[#003057]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Capin AI Character */}
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Main Capin AI Avatar */}
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#00B2E3]/10 to-[#003057]/10 rounded-3xl flex items-center justify-center shadow-2xl shadow-[#00B2E3]/25 backdrop-blur-sm border border-[#00B2E3]/20 hover:shadow-3xl hover:shadow-[#00B2E3]/40 transition-all duration-500 hover:scale-105">
                    <img 
                      src="/Capin-AI.png" 
                      alt="Capin AI - INSECAP's Intelligent Assistant" 
                      className="w-56 h-56 md:w-72 md:h-72 object-contain hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 bg-green-400 rounded-full flex items-center justify-center animate-bounce shadow-xl shadow-green-400/25">
                    <Clock className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 bg-blue-400 rounded-full flex items-center justify-center animate-bounce delay-150 shadow-xl shadow-blue-400/25">
                    <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  <div className="absolute top-1/2 -left-6 md:-left-10 w-12 h-12 md:w-16 md:h-16 bg-purple-400 rounded-full flex items-center justify-center animate-bounce delay-300 shadow-xl shadow-purple-400/25">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  <div className="absolute top-1/4 -right-6 md:-right-8 w-12 h-12 md:w-16 md:h-16 bg-[#00B2E3] rounded-full flex items-center justify-center animate-bounce delay-500 shadow-xl shadow-[#00B2E3]/25">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B2E3]/5 to-[#003057]/5 rounded-3xl blur-3xl transform scale-110"></div>
              <div className="absolute top-10 left-10 w-32 h-32 bg-[#00B2E3]/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#003057]/10 rounded-full blur-2xl"></div>
            </div>

            {/* Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('capinAi.title')}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  {t('capinAi.subtitle')}
                </p>
              </div>

              {/* Capin Features */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-gray-200 dark:border-white/10">
                  <div className="w-12 h-12 bg-[#00B2E3]/20 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-[#00B2E3]" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('capinAi.features.learning.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('capinAi.features.learning.description')}</p>
                </div>

                <div className="bg-white/80 dark:bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-gray-200 dark:border-white/10">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('capinAi.features.predictions.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('capinAi.features.predictions.description')}</p>
                </div>

                <div className="bg-white/80 dark:bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-gray-200 dark:border-white/10">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('capinAi.features.analysis.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('capinAi.features.analysis.description')}</p>
                </div>

                <div className="bg-white/80 dark:bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-gray-200 dark:border-white/10">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('capinAi.features.segmentation.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('capinAi.features.segmentation.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: t('features.items.ai.title'),
                description: t('features.items.ai.description')
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: t('features.items.bigData.title'),
                description: t('features.items.bigData.description')
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: t('features.items.automation.title'),
                description: t('features.items.automation.description')
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-white/90 dark:bg-white/5 border-gray-200 dark:border-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#00B2E3]/20 rounded-2xl flex items-center justify-center text-[#00B2E3] mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 border-t border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "94.2%", label: t('stats.uptime') },
              { number: "1,247", label: t('stats.companies') },
              { number: "8.4K", label: t('stats.dataProcessed') },
              { number: "4.8", label: t('stats.rating'), icon: <Star className="w-4 h-4 fill-current" /> }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-[#00B2E3]">{stat.number}</span>
                  {stat.icon && <div className="text-[#00B2E3]">{stat.icon}</div>}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
