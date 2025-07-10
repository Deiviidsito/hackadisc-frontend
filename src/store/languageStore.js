import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Idiomas soportados
export const SUPPORTED_LANGUAGES = {
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  pt: {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷'
  }
}

export const useLanguageStore = create(
  persist(
    (set, get) => ({
      currentLanguage: 'es', // Idioma por defecto
      
      setLanguage: (languageCode) => {
        if (SUPPORTED_LANGUAGES[languageCode]) {
          set({ currentLanguage: languageCode })
          // Actualizar el atributo lang del documento HTML
          document.documentElement.lang = languageCode
        }
      },
      
      getCurrentLanguage: () => get().currentLanguage,
      
      getLanguageInfo: () => SUPPORTED_LANGUAGES[get().currentLanguage],
      
      // Función para obtener traducción con fallback
      t: (key, fallback = key) => {
        const currentLang = get().currentLanguage
        const translations = get().translations
        
        if (!translations || !translations[currentLang]) {
          return fallback
        }
        
        // Soporte para claves anidadas usando dot notation (ej: "common.buttons.save")
        const keys = key.split('.')
        let value = translations[currentLang]
        
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k]
          } else {
            return fallback
          }
        }
        
        return typeof value === 'string' ? value : fallback
      },
      
      // Traducciones cargadas dinámicamente
      translations: {},
      
      setTranslations: (translations) => {
        set({ translations })
      },
      
      // Función para cargar traducciones de un módulo específico
      loadTranslations: async (module = 'common') => {
        try {
          const currentLang = get().currentLanguage
          const translation = await import(`../translations/${currentLang}/${module}.js`)
          
          set((state) => ({
            translations: {
              ...state.translations,
              [currentLang]: {
                ...state.translations[currentLang],
                [module]: translation.default
              }
            }
          }))
        } catch (error) {
          console.warn(`Failed to load translations for ${module} in ${get().currentLanguage}:`, error)
        }
      },

      // Función para cargar todas las traducciones disponibles
      loadAllTranslations: async () => {
        const currentLang = get().currentLanguage
        const modules = ['common', 'landing', 'auth', 'companies', 'analytics', 'dashboard', 'ui']
        
        try {
          const translations = {}
          
          for (const module of modules) {
            try {
              const translation = await import(`../translations/${currentLang}/${module}.js`)
              translations[module] = translation.default
            } catch (error) {
              console.warn(`Failed to load ${module} translations for ${currentLang}:`, error)
            }
          }
          
          set((state) => ({
            translations: {
              ...state.translations,
              [currentLang]: translations
            }
          }))
        } catch (error) {
          console.error(`Failed to load translations for ${currentLang}:`, error)
        }
      }
    }),
    {
      name: 'insecap-language',
      partialize: (state) => ({ currentLanguage: state.currentLanguage })
    }
  )
)

// Inicializar idioma al cargar
const initializeLanguage = () => {
  const { currentLanguage } = useLanguageStore.getState()
  document.documentElement.lang = currentLanguage
}

// Ejecutar inicialización
if (typeof window !== 'undefined') {
  initializeLanguage()
  // Cargar traducciones inmediatamente
  useLanguageStore.getState().loadAllTranslations()
}
