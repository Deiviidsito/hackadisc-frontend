import { useEffect } from 'react'
import { useLanguageStore } from '@/store/languageStore'

/**
 * Hook personalizado para internacionalización
 * @returns {object} - Objeto con funciones de traducción y estado del idioma
 */
export function useTranslation() {
  const { 
    currentLanguage, 
    setLanguage, 
    getCurrentLanguage, 
    getLanguageInfo,
    translations,
    loadAllTranslations
  } = useLanguageStore()

  // Cargar todas las traducciones cuando el hook se monta o cambia el idioma
  useEffect(() => {
    loadAllTranslations()
  }, [currentLanguage, loadAllTranslations])

  // Debug: verificar estructura de traducciones
  useEffect(() => {
    if (translations && translations[currentLanguage]) {
      console.log('Traducciones cargadas para', currentLanguage, ':', translations[currentLanguage])
    }
  }, [translations, currentLanguage])

  /**
   * Función para obtener traducción con interpolación de variables
   * @param {string} key - Clave de traducción (soporta dot notation como "auth.title" o "common.buttons.save")
   * @param {object} variables - Variables para interpolar en la traducción
   * @param {string} fallback - Texto de respaldo si no se encuentra la traducción
   * @returns {string} - Texto traducido
   */
  const t = (key, variables = {}, fallback = key) => {
    if (!translations || !translations[currentLanguage]) {
      return fallback
    }

    // Navegación por claves anidadas
    const keys = key.split('.')
    let value = translations[currentLanguage]
    
    // Buscar en todos los módulos si la primera clave no es un módulo conocido
    const modules = ['common', 'landing', 'auth', 'companies', 'analytics', 'dashboard', 'ui']
    const firstKey = keys[0]
    
    // Si la primera clave es un módulo, buscar directamente en ese módulo
    if (modules.includes(firstKey) && value[firstKey]) {
      value = value[firstKey]
      // Remover la primera clave (el módulo) y continuar con el resto
      for (let i = 1; i < keys.length; i++) {
        const k = keys[i]
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return fallback
        }
      }
    } else {
      // Si no es un módulo, buscar en todos los módulos
      let found = false
      for (const module of modules) {
        if (value[module]) {
          let moduleValue = value[module]
          let isValid = true
          
          for (const k of keys) {
            if (moduleValue && typeof moduleValue === 'object' && k in moduleValue) {
              moduleValue = moduleValue[k]
            } else {
              isValid = false
              break
            }
          }
          
          if (isValid && typeof moduleValue === 'string') {
            value = moduleValue
            found = true
            break
          }
        }
      }
      
      if (!found) {
        return fallback
      }
    }

    if (typeof value !== 'string') {
      return fallback
    }

    // Interpolación de variables usando {{variable}}
    let result = value
    Object.keys(variables).forEach(variable => {
      const regex = new RegExp(`{{${variable}}}`, 'g')
      result = result.replace(regex, variables[variable])
    })

    return result
  }

  return {
    t,
    currentLanguage,
    setLanguage,
    getCurrentLanguage,
    getLanguageInfo,
    isLoading: !translations || !translations[currentLanguage]
  }
}
