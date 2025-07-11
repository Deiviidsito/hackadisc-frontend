import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import '@/store/themeStore' // Import theme store to initialize theme
import Layout from '@/components/Layout'
import DashboardLayout from '@/components/DashboardLayout'
import LandingPageModern from '@/components/LandingPageModern'
import LoginPage from '@/components/LoginPage'
import DashboardPage from '@/components/DashboardPage'
import CompaniesPage from '@/components/CompaniesPage'
import CompanyAnalyticsPage from '@/components/CompanyAnalyticsPage'
import ReportesPage from '@/components/ReportesPage'
import CapiPage from '@/components/CapiPage'
import './App.css'

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
  const { user } = useAuthStore()
  return user ? children : <Navigate to="/login" replace />
}

// Componente para rutas públicas (redirige al dashboard si ya está logueado)
function PublicRoute({ children }) {
  const { user } = useAuthStore()
  return !user ? children : <Navigate to="/dashboard" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública - Landing Page */}
        <Route 
          path="/" 
          element={
            <Layout>
              <LandingPageModern />
            </Layout>
          } 
        />
        
        {/* Ruta pública - Login (sin navegación, redirige a dashboard si ya está logueado) */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Layout showNavigation={false}>
                <LoginPage />
              </Layout>
            </PublicRoute>
          } 
        />
        
        {/* Ruta privada - Dashboard (requiere autenticación, usa DashboardLayout con Sidebar) */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </PrivateRoute>
          } 
        />
        
        {/* Ruta privada - Empresas */}
        <Route 
          path="/dashboard/companies" 
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CompaniesPage />
              </DashboardLayout>
            </PrivateRoute>
          } 
        />
        
        {/* Ruta privada - Analíticas de Empresa */}
        <Route 
          path="/dashboard/company/:companyId/analytics" 
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CompanyAnalyticsPage />
              </DashboardLayout>
            </PrivateRoute>
          } 
        />
        
        {/* Ruta privada - Reportes */}
        <Route 
          path="/dashboard/reports" 
          element={
            <PrivateRoute>
              <DashboardLayout>
                <ReportesPage />
              </DashboardLayout>
            </PrivateRoute>
          } 
        />
        
        {/* Ruta privada - Capi (Asistente IA) */}
        <Route 
          path="/dashboard/capi" 
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CapiPage />
              </DashboardLayout>
            </PrivateRoute>
          } 
        />
        
        {/* Ruta catch-all - redirige a la landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
