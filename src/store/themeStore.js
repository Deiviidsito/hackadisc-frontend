import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark', // 'dark' | 'light'
      
      setTheme: (theme) => {
        set({ theme })
        // Aplicar tema al documento HTML
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        get().setTheme(newTheme)
      },
      
      isDark: () => get().theme === 'dark',
    }),
    {
      name: 'insecap-theme',
    }
  )
)

// Inicializar tema al cargar
const initializeTheme = () => {
  const { theme } = useThemeStore.getState()
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Ejecutar inicialización
if (typeof window !== 'undefined') {
  initializeTheme()
}
