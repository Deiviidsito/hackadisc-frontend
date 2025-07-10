import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, X, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CapiAvatar from './CapiAvatar'

export default function CapiFloatingButton() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  
  const handleNavigate = () => {
    navigate('/dashboard/capi')
    setIsOpen(false)
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg mb-3 p-3 w-64 border border-[#00B2E3]/30 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center mb-2">
            <CapiAvatar size="sm" className="mr-2" />
            <div>
              <h4 className="text-sm font-semibold text-[#003057]">Capi</h4>
              <p className="text-xs text-[#003057]/70">Asistente de INSECAP</p>
            </div>
          </div>
          
          <p className="text-xs text-[#003057]/80 mb-3">
            ¿Necesitas ayuda? Conversa con Capi, nuestro asistente virtual.
          </p>
          
          <div className="flex justify-between">
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs border-[#00B2E3]/30 hover:bg-[#00B2E3]/10"
              onClick={() => setIsOpen(false)}
            >
              Luego
            </Button>
            <Button 
              size="sm" 
              className="text-xs bg-[#003057] hover:bg-[#003057]/90"
              onClick={handleNavigate}
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Conversar
            </Button>
          </div>
        </div>
      )}
      
      <Button
        size="icon"
        className={`h-12 w-12 rounded-full shadow-lg ${
          isOpen 
            ? 'bg-[#003057] hover:bg-[#003057]/90' 
            : 'bg-gradient-to-r from-[#00B2E3] to-[#003057] hover:shadow-[#00B2E3]/20 hover:shadow-xl'
        }`}
        onClick={handleToggle}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </Button>
    </div>
  )
}
