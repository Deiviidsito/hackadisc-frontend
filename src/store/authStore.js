import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      // Acciones
      login: (userData) => {
        set({ 
          user: userData, 
          isAuthenticated: true,
          isLoading: false 
        })
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false 
        })
        // Limpiar localStorage
        localStorage.removeItem('user_data')
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading })
      },
      
      // Verificar si el usuario sigue autenticado
      checkAuth: () => {
        const state = get()
        return state.isAuthenticated && state.user
      }
    }),
    {
      name: 'auth-storage', // nombre en localStorage
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)
