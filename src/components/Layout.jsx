import Navigation from '@/components/Navigation'
import { useThemeStore } from '@/store/themeStore'

export default function Layout({ children, showNavigation = true }) {
  const { isDark } = useThemeStore()
  
  return (
    <div className={`min-h-screen ${isDark() ? 'bg-[#0A0B0F]' : 'bg-gradient-to-br from-slate-50 to-blue-50/30'}`}>
      {showNavigation && <Navigation />}
      <main className={showNavigation ? '' : 'min-h-screen'}>
        {children}
      </main>
    </div>
  )
}
