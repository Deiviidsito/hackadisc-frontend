import Sidebar from '@/components/Sidebar'
import CapiFloatingButton from '@/components/CapiFloatingButton'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
        <CapiFloatingButton />
      </main>
    </div>
  )
}
