import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
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
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#003057]/10 dark:bg-[#003057]/20 border border-[#00B2E3]/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-[#00B2E3] rounded-full animate-pulse"></div>
            <span className="text-[#00B2E3] text-sm font-medium">{t('hero.badge')}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900 dark:text-white">{t('hero.title.line1')}</span>
            <br />
            <span className="text-gray-900 dark:text-white">{t('hero.title.line2')}</span>
            <br />
            <span className="bg-gradient-to-r from-[#00B2E3] via-[#00B2E3] to-[#003057] dark:to-white bg-clip-text text-transparent">
              {t('hero.title.line3')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg"
              className="bg-[#003057] dark:bg-white text-white dark:text-black hover:bg-[#003057]/90 dark:hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-xl h-auto"
              onClick={() => navigate('/login')}
            >
              {t('hero.cta.primary')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-[#003057] dark:border-white text-gray-900 dark:text-white hover:bg-[#003057]/10 dark:hover:bg-white/20 px-8 py-4 text-lg font-medium rounded-xl h-auto"
            >
              {t('hero.cta.secondary')}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
              <span>{t('hero.trustIndicators.prediction')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
              <span>{t('hero.trustIndicators.realtime')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
              <span>{t('hero.trustIndicators.integration')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Preview Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dashboard Inteligente en Acción
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experimenta el poder de la analítica empresarial con nuestra interfaz revolucionaria. 
              Datos en tiempo real, insights automáticos y control total de tu negocio.
            </p>
          </div>

          {/* 3D Dashboard Card */}
          <div className="flex justify-center">
            <CardContainer className="inter-var" containerClassName="py-10">
              <CardBody className="bg-gradient-to-b from-white/90 dark:from-white/10 to-white/70 dark:to-white/5 relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#00B2E3]/[0.1] border-gray-200 dark:border-white/[0.2] w-auto sm:w-[55rem] lg:w-[70rem] h-auto rounded-2xl p-1 border backdrop-blur-xl">
                <CardItem translateZ="50" className="w-full">
                  <div className="bg-gradient-to-b from-white/80 dark:from-white/5 to-transparent rounded-xl overflow-hidden">
                    {/* Browser Header */}
                    <CardItem translateZ="60">
                      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                          <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                            <BarChart3 className="w-4 h-4 text-[#00B2E3]" />
                            <span className="text-sm font-medium">{t('preview.title')}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t('preview.url')}</div>
                      </div>
                    </CardItem>

                    {/* Dashboard Content */}
                    <CardItem translateZ="80" className="p-10 space-y-8">
                      {/* Stats Cards */}
                      <CardItem translateZ="100">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                          {[
                            { label: "Total Facturas", value: "2,847", color: "text-[#00B2E3]", icon: <DollarSign className="w-5 h-5" /> },
                            { label: "Pagos Completados", value: "2,156", color: "text-green-500", icon: <CheckCircle className="w-5 h-5" /> },
                            { label: "Tiempo Promedio", value: "32 días", color: "text-amber-500", icon: <Clock className="w-5 h-5" /> },
                            { label: "Facturas Pendientes", value: "691", color: "text-red-500", icon: <Users className="w-5 h-5" /> }
                          ].map((stat, i) => (
                            <div key={i} className="bg-gray-100/80 dark:bg-white/5 rounded-xl p-5 backdrop-blur-sm transform hover:scale-105 transition-transform duration-200 border border-gray-200/50 dark:border-white/10">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{stat.label}</div>
                                <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
                              </div>
                              <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-medium">Actualizado</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardItem>

                      {/* Main Dashboard Area - 16:9 Layout */}
                      <CardItem translateZ="120">
                        <div className="bg-gray-100/80 dark:bg-white/5 rounded-xl p-10 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 h-[28rem] max-w-6xl mx-auto">
                          {/* Header */}
                          <CardItem translateZ="140">
                            <div className="flex items-center justify-between mb-8">
                              <div className="flex-1">
                                <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-2">Panel de Control Empresarial</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Análisis integral de rendimiento y tendencias de negocio</p>
                              </div>
                              <div className="flex gap-3">
                                <Badge className="bg-[#00B2E3]/20 text-[#00B2E3] border-[#00B2E3]/30 text-sm font-medium px-3 py-1">
                                  En Tiempo Real
                                </Badge>
                                <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-sm font-medium px-3 py-1">
                                  +12.4% Este Mes
                                </Badge>
                              </div>
                            </div>
                          </CardItem>
                          
                          {/* Content Grid */}
                          <CardItem translateZ="150">
                            <div className="grid grid-cols-3 gap-10 h-72">
                              {/* Chart Section - Takes 2/3 of the width */}
                              <div className="col-span-2 space-y-6">
                                {/* Navigation Tabs */}
                                <div className="flex gap-2 bg-gray-200/60 dark:bg-white/10 rounded-lg p-1.5">
                                  {['Tendencias', 'Comparativo', 'Proyecciones', 'Análisis'].map((tab, i) => (
                                    <div key={i} className={`flex-1 text-center px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                      i === 0 
                                        ? 'bg-white dark:bg-gray-800 text-[#00B2E3] shadow-sm' 
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                                    }`}>
                                      {tab}
                                    </div>
                                  ))}
                                </div>
                                
                                {/* Enhanced Chart */}
                                <div className="relative h-48">
                                  {/* Chart Background Grid */}
                                  <div className="absolute inset-0 opacity-20">
                                    <div className="h-full w-full" style={{
                                      backgroundImage: `
                                        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                                        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                                      `,
                                      backgroundSize: '32px 28px'
                                    }}></div>
                                  </div>
                                  
                                  {/* Chart Bars */}
                                  <div className="flex items-end justify-between gap-3 h-full relative z-10 px-6">
                                    {[
                                      { height: 45, value: '1.2K', month: 'Ene', trend: '+5%' },
                                      { height: 65, value: '1.8K', month: 'Feb', trend: '+12%' },
                                      { height: 55, value: '1.5K', month: 'Mar', trend: '-8%' },
                                      { height: 80, value: '2.1K', month: 'Abr', trend: '+18%' },
                                      { height: 70, value: '1.9K', month: 'May', trend: '+2%' },
                                      { height: 85, value: '2.3K', month: 'Jun', trend: '+15%' },
                                      { height: 95, value: '2.6K', month: 'Jul', trend: '+22%' },
                                      { height: 75, value: '2.0K', month: 'Ago', trend: '-3%' },
                                      { height: 90, value: '2.4K', month: 'Sep', trend: '+8%' },
                                      { height: 85, value: '2.3K', month: 'Oct', trend: '+6%' },
                                      { height: 100, value: '2.8K', month: 'Nov', trend: '+25%' },
                                      { height: 92, value: '2.5K', month: 'Dic', trend: '+11%' }
                                    ].map((bar, i) => (
                                      <div key={i} className="flex flex-col items-center group cursor-pointer flex-1">
                                        <div className="relative w-full max-w-8">
                                          {/* Enhanced Tooltip */}
                                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg">
                                            <div className="font-bold">{bar.value} facturas</div>
                                            <div className="text-xs opacity-75">{bar.trend} vs anterior</div>
                                          </div>
                                          {/* Bar with gradient */}
                                          <div 
                                            className="w-full bg-gradient-to-t from-[#00B2E3] via-[#00B2E3]/80 to-[#00B2E3]/60 rounded-t-md transform hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#00B2E3]/25" 
                                            style={{ height: `${bar.height}%` }}
                                          ></div>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{bar.month}</div>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* Chart Labels */}
                                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-400 dark:text-gray-500 -ml-12">
                                    <span>3K</span>
                                    <span>2K</span>
                                    <span>1K</span>
                                    <span>0</span>
                                  </div>
                                </div>
                              </div>

                              {/* Sidebar - Analytics and KPIs */}
                              <div className="col-span-1 space-y-4">
                                <div className="space-y-4">
                                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Métricas Clave</h4>
                                  
                                  {/* KPI Cards */}
                                  <div className="space-y-3">
                                    {[
                                      { label: "Crecimiento", value: "+24.8%", color: "text-green-500", bg: "bg-green-500/10" },
                                      { label: "Eficiencia", value: "94.2%", color: "text-blue-500", bg: "bg-blue-500/10" },
                                      { label: "Satisfacción", value: "4.8★", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                                      { label: "ROI", value: "3.2x", color: "text-purple-500", bg: "bg-purple-500/10" }
                                    ].map((kpi, i) => (
                                      <div key={i} className={`${kpi.bg} rounded-lg p-3 border border-gray-200/30 dark:border-white/10`}>
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs text-gray-600 dark:text-gray-400">{kpi.label}</span>
                                          <span className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Top Clients Preview */}
                                  <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-white/10">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Top Clientes</h4>
                                    <div className="space-y-2">
                                      {[
                                        { name: "TechCorp SA", amount: "₡2.4M", color: "bg-green-500" },
                                        { name: "Innovaciones Ltd", amount: "₡1.8M", color: "bg-blue-500" },
                                        { name: "Digital Solutions", amount: "₡1.2M", color: "bg-yellow-500" }
                                      ].map((client, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                          <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 ${client.color} rounded-full`}></div>
                                            <span className="text-gray-900 dark:text-white truncate">{client.name}</span>
                                          </div>
                                          <span className="font-medium text-gray-600 dark:text-gray-400">{client.amount}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardItem>
                        </div>
                      </CardItem>
                    </CardItem>
                  </div>
                </CardItem>

                {/* Floating Elements with 3D Effect - Inside CardContainer */}
                <CardItem translateZ="200" className="absolute -top-4 -right-4 z-10">
                  <div className="bg-[#00B2E3] rounded-full p-3 shadow-lg shadow-[#00B2E3]/25 hover:shadow-2xl hover:shadow-[#00B2E3]/40 transition-all duration-300 hover:scale-110">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                </CardItem>
                
                <CardItem translateZ="200" className="absolute -bottom-4 -left-4 z-10">
                  <div className="bg-[#003057] rounded-full p-3 shadow-lg shadow-[#003057]/25 hover:shadow-2xl hover:shadow-[#003057]/40 transition-all duration-300 hover:scale-110">
                    <TrendingUp className="w-5 h-5 text-[#00B2E3]" />
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
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
