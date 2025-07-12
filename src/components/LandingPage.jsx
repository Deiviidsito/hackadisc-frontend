import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spotlight } from '@/components/ui/spotlight'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { GlowingStarsBackgroundCard, GlowingStarsTitle, GlowingStarsDescription } from '@/components/ui/glowing-stars'
import { AnimatedLogo } from '@/components/ui/animated-logo'
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
  LineChart,
  Building2,
  Target,
  Sparkles,
  Rocket,
  Shield
} from 'lucide-react'

export default function LandingPage() {
  const { t, isLoading } = useTranslation()
  const navigate = useNavigate()

  // Mostrar loading mientras se cargan las traducciones
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    )
  }

  const dashboardStats = [
    { label: t('landing.preview.stats.totalOverview'), value: "+ 24%", color: "text-[#00B2E3]" },
    { label: t('landing.preview.stats.activeUsers'), value: "8,420", color: "text-white" },
    { label: t('landing.preview.stats.revenue'), value: "$142K", color: "text-green-400" },
    { label: t('landing.preview.stats.growth'), value: "+18.2%", color: "text-[#00B2E3]" }
  ]

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: t('landing.features.items.ai.title'),
      description: t('landing.features.items.ai.description')
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t('landing.features.items.bigData.title'),
      description: t('landing.features.items.bigData.description')
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('landing.features.items.automation.title'),
      description: t('landing.features.items.automation.description')
    }
  ]

  const stats = [
    { number: "99.9%", label: t('landing.stats.uptime') },
    { number: "500+", label: t('landing.stats.companies') },
    { number: "2M+", label: t('landing.stats.dataProcessed') },
    { number: "4.9", label: t('landing.stats.rating'), icon: <Star className="w-4 h-4 fill-current" /> }
  ]

  const analyticsFeatures = [
    'React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python',
    'Machine Learning', 'Big Data', 'Real-time Analytics', 'Cloud Computing',
    'API Rest', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'
  ]

  return (
    <div className="min-h-screen bg-[#0A0B0F] relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,178,227,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,178,227,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B2E3]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#003057]/20 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Beams */}
        <BackgroundBeams className="opacity-40" />
        
        {/* Spotlight Effects */}
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <Spotlight
          className="-top-10 left-full md:-top-5 md:left-80"
          fill="#00B2E3"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Logo and Interactive Elements */}
            <div className="space-y-8">
              {/* Main Logo with Animation */}
              <div className="flex justify-center lg:justify-start">
                <AnimatedLogo className="w-48 h-48" />
              </div>
              
              {/* Interactive Cards */}
              <div className="grid grid-cols-2 gap-4">
                <GlowingStarsBackgroundCard className="h-32">
                  <div className="flex flex-col h-full justify-between">
                    <Rocket className="w-6 h-6 text-[#00B2E3]" />
                    <div>
                      <GlowingStarsTitle className="text-sm">
                        {t('landing.hero.cards.innovation')}
                      </GlowingStarsTitle>
                      <GlowingStarsDescription className="text-xs text-white/70">
                        IA Avanzada
                      </GlowingStarsDescription>
                    </div>
                  </div>
                </GlowingStarsBackgroundCard>
                
                <GlowingStarsBackgroundCard className="h-32">
                  <div className="flex flex-col h-full justify-between">
                    <Shield className="w-6 h-6 text-[#00B2E3]" />
                    <div>
                      <GlowingStarsTitle className="text-sm">
                        {t('landing.hero.cards.security')}
                      </GlowingStarsTitle>
                      <GlowingStarsDescription className="text-xs text-white/70">
                        Datos Seguros
                      </GlowingStarsDescription>
                    </div>
                  </div>
                </GlowingStarsBackgroundCard>
                
                <GlowingStarsBackgroundCard className="h-32 col-span-2">
                  <div className="flex items-center justify-between h-full">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-6 h-6 text-[#00B2E3]" />
                      <div>
                        <GlowingStarsTitle className="text-sm">
                          {t('landing.hero.cards.analytics')}
                        </GlowingStarsTitle>
                        <GlowingStarsDescription className="text-xs text-white/70">
                          Análisis en Tiempo Real
                        </GlowingStarsDescription>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[30, 60, 45, 80, 70].map((height, i) => (
                        <div 
                          key={i} 
                          className="w-2 bg-gradient-to-t from-[#00B2E3] to-[#003057] rounded-t animate-pulse" 
                          style={{ 
                            height: `${height * 0.4}px`,
                            animationDelay: `${i * 200}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </GlowingStarsBackgroundCard>
              </div>
            </div>

            {/* Right Side - Text and CTA */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#003057]/20 border border-[#00B2E3]/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-[#00B2E3] rounded-full animate-pulse"></div>
                <span className="text-[#00B2E3] text-sm font-medium">{t('landing.hero.badge')}</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-white">{t('landing.hero.title.line1')}</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#00B2E3] via-[#00B2E3] to-white bg-clip-text text-transparent">
                    {t('landing.hero.title.line3')}
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                {t('landing.hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#00B2E3] to-[#003057] hover:from-[#00B2E3]/90 hover:to-[#003057]/90 text-white px-8 py-4 text-lg font-medium rounded-xl h-auto shadow-lg shadow-[#00B2E3]/25 transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate('/login')}
                >
                  {t('landing.hero.cta.primary')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-[#00B2E3]/30 text-white hover:bg-[#00B2E3]/10 hover:border-[#00B2E3] px-8 py-4 text-lg font-medium rounded-xl h-auto backdrop-blur-sm"
                >
                  {t('landing.hero.cta.secondary')}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-400 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
                  <span>{t('landing.hero.trustIndicators.noCard')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
                  <span>{t('landing.hero.trustIndicators.trial')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00B2E3]" />
                  <span>{t('landing.hero.trustIndicators.cancel')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 bg-[#00B2E3]/20 rounded-full p-4 shadow-lg shadow-[#00B2E3]/25 animate-float">
          <Activity className="w-6 h-6 text-[#00B2E3]" />
        </div>
        <div className="absolute bottom-40 left-20 bg-[#003057]/30 rounded-full p-4 shadow-lg shadow-[#003057]/25 animate-float-delayed">
          <TrendingUp className="w-6 h-6 text-[#00B2E3]" />
        </div>
        <div className="absolute top-1/2 right-10 bg-gradient-to-r from-[#00B2E3]/20 to-[#003057]/20 rounded-full p-3 shadow-lg animate-pulse">
          <Brain className="w-5 h-5 text-white" />
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
                      <span className="text-sm font-medium">{t('landing.preview.title')}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{t('landing.preview.url')}</div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {dashboardStats.map((stat, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                        <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-medium">{t('landing.preview.chart.title')}</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-[#00B2E3]/20 text-[#00B2E3] border-[#00B2E3]/30 text-xs">
                          {t('landing.preview.chart.badge')}
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
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
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
            {stats.map((stat, i) => (
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

      {/* Analytics Features */}
      <section id="analytics" className="relative z-10 py-20 bg-gradient-to-b from-[#003057] to-[#003057]/90">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                {t('landing.analytics.title')}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {t('landing.analytics.subtitle')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {analyticsFeatures.map((tech, index) => (
                <Badge 
                  key={index}
                  className="bg-[#00B2E3]/20 text-[#00B2E3] border-[#00B2E3]/30 hover:bg-[#00B2E3]/30 px-4 py-2 text-sm transition-all duration-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Demo Cards */}
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <LineChart className="w-6 h-6 text-[#00B2E3]" />
                    <h3 className="text-white font-semibold">{t('landing.demoCards.interactive.title')}</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    {t('landing.demoCards.interactive.description')}
                  </p>
                  <div className="bg-white/5 rounded p-3 h-24 flex items-end space-x-1">
                    {[30, 70, 45, 80, 60, 90].map((h, i) => (
                      <div key={i} className="bg-[#00B2E3]/70 w-4 rounded-t" style={{height: `${h}%`}}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-6 h-6 text-[#00B2E3]" />
                    <h3 className="text-white font-semibold">{t('landing.demoCards.business.title')}</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    {t('landing.demoCards.business.description')}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">{t('landing.demoCards.business.performanceLabel')}</span>
                      <span className="text-[#00B2E3]">87%</span>
                    </div>
                    <div className="bg-white/10 rounded-full h-2">
                      <div className="bg-[#00B2E3] h-2 rounded-full w-[87%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-[#00B2E3]" />
                    <h3 className="text-white font-semibold">{t('landing.demoCards.ai.title')}</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    {t('landing.demoCards.ai.description')}
                  </p>
                  <div className="flex items-center justify-center py-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-[#00B2E3]/30 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-[#00B2E3] rounded-full border-r-transparent animate-spin"></div>
                      <div className="absolute inset-2 bg-[#00B2E3]/20 rounded-full flex items-center justify-center">
                        <span className="text-[#00B2E3] text-xs font-bold">AI</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#003057]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <img 
                src="/Insecap_Logo-01.png" 
                alt="INSECAP Logo" 
                className="h-8 w-auto opacity-90"
              />
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-[#00B2E3]" />
                <span className="font-bold text-lg text-white">{t('landing.footer.platform')}</span>
              </div>
            </div>
            
            <div className="text-white/60 text-sm">
              {t('landing.footer.copyright')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
