import Navigation from '@/components/Navigation'

export default function Layout({ children, showNavigation = true }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {showNavigation && <Navigation />}
      <main className={showNavigation ? '' : 'min-h-screen'}>
        {children}
      </main>
    </div>
  )
}
