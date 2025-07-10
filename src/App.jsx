
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import Layout from '@/components/Layout'
import LandingPage from '@/components/LandingPage'
import LoginPage from '@/components/LoginPage'
import DashboardPage from '@/components/DashboardPage'
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
              <LandingPage />
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
        
        {/* Ruta privada - Dashboard (requiere autenticación) */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Layout>
                <DashboardPage />
              </Layout>
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
