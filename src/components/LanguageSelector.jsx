import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, Languages } from 'lucide-react'
import { useLanguageStore, SUPPORTED_LANGUAGES } from '@/store/languageStore'

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLanguage, setLanguage, getLanguageInfo } = useLanguageStore()
  
  const currentLangInfo = getLanguageInfo()

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 border-0 px-2 py-1 h-8"
      >
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">
            {currentLangInfo?.flag} {currentLangInfo?.name}
          </span>
          <span className="text-sm font-medium sm:hidden">
            {currentLangInfo?.flag}
          </span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg backdrop-blur-sm z-50">
            <div className="py-1">
              {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                    currentLanguage === lang.code 
                      ? 'bg-[#00B2E3]/10 text-[#00B2E3] dark:bg-[#00B2E3]/20' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {currentLanguage === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-[#00B2E3] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
