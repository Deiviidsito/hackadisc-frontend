import { useState } from 'react'
import { Bot } from 'lucide-react'

export default function CapiAvatar({ size = 'md', animated = true, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Tamaños disponibles
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4' },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6' },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8' },
    xl: { container: 'w-20 h-20', icon: 'w-10 h-10' }
  }
  
  const { container, icon } = sizes[size] || sizes.md
  
  return (
    <div
      className={`${container} rounded-full bg-gradient-to-br from-[#00B2E3] to-[#003057] flex items-center justify-center shadow-lg ${
        animated ? 'transition-all duration-300' : ''
      } ${isHovered ? 'scale-110' : ''} ${className}`}
      onMouseEnter={() => animated && setIsHovered(true)}
      onMouseLeave={() => animated && setIsHovered(false)}
    >
      <Bot className={`${icon} text-white ${animated && isHovered ? 'animate-pulse' : ''}`} />
    </div>
  )
}
