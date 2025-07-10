import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { capiService } from '@/services/api'
import CapiAvatar from './CapiAvatar'
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Bot, 
  CornerDownLeft,
  Loader2,
  Sparkles,
  Heart
} from 'lucide-react'

export default function CapiPage() {
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [capiInfo, setCapiInfo] = useState(null)
  const [error, setError] = useState(null)
  
  const messageContainerRef = useRef(null)
  const audioRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  // Cargar información de Capi al inicio
  useEffect(() => {
    const fetchCapiInfo = async () => {
      try {
        const info = await capiService.about()
        setCapiInfo(info)
        
        // Añadir mensaje inicial de bienvenida
        setMessages([
          {
            role: 'assistant',
            content: info.greeting || '¡Hola! Soy Capi, la mascota de INSECAP 🐾 ¿En qué puedo ayudarte hoy?'
          }
        ])
      } catch (err) {
        console.error('Error al cargar info de Capi:', err)
        setError('No se pudo cargar la información del asistente')
      }
    }
    
    fetchCapiInfo()
  }, [])

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!question.trim()) return
    
    // Añadir pregunta del usuario a los mensajes
    const userMessage = { role: 'user', content: question }
    setMessages(prev => [...prev, userMessage])
    
    setQuestion('')
    setIsLoading(true)
    setError(null)
    
    try {
      // Enviar pregunta a la API
      const response = await capiService.ask(userMessage.content)
      
      // Añadir respuesta de Capi
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: response.response,
          mode: response.mode
        }
      ])
    } catch (err) {
      console.error('Error al preguntar a Capi:', err)
      setError('No se pudo obtener una respuesta de Capi')
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lo siento, no pude procesar tu pregunta en este momento. ¿Podrías intentarlo de nuevo?',
          error: true
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Convertir respuesta de texto a voz y reproducirla
  const handleTextToSpeech = async (text) => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlayingAudio(false)
      }
      return
    }
    
    try {
      setIsPlayingAudio(true)
      const response = await capiService.textToSpeech(text)
      
      if (audioRef.current) {
        audioRef.current.src = response.audio_url
        audioRef.current.play()
        
        audioRef.current.onended = () => {
          setIsPlayingAudio(false)
        }
      }
    } catch (err) {
      console.error('Error al convertir texto a voz:', err)
      setIsPlayingAudio(false)
    }
  }

  // Control de grabación de voz
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioChunksRef.current = []
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await handleVoiceChat(audioBlob)
        
        // Detener todas las pistas de audio (micrófono)
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error al iniciar la grabación:', err)
      setError('No se pudo acceder al micrófono')
    }
  }
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }
  
  // Enviar audio a la API y procesar respuesta
  const handleVoiceChat = async (audioBlob) => {
    setIsLoading(true)
    
    try {
      const response = await capiService.voiceChat(audioBlob)
      
      // Añadir la transcripción como mensaje del usuario
      setMessages(prev => [
        ...prev,
        { role: 'user', content: response.transcription }
      ])
      
      // Añadir la respuesta de Capi
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: response.text_response,
          audioUrl: response.audio_response_url,
          mode: response.mode
        }
      ])
      
      // Reproducir automáticamente la respuesta
      if (audioRef.current && response.audio_response_url) {
        setIsPlayingAudio(true)
        audioRef.current.src = response.audio_response_url
        audioRef.current.play()
        
        audioRef.current.onended = () => {
          setIsPlayingAudio(false)
        }
      }
    } catch (err) {
      console.error('Error en el chat por voz:', err)
      setError('No se pudo procesar tu mensaje de voz')
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Lo siento, no pude entender tu mensaje de voz. ¿Podrías intentarlo de nuevo o escribir tu pregunta?',
          error: true
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-6 text-center">
          {/* Avatar de Capi prominente */}
          <div className="flex justify-center">
            <CapiAvatar size="hero" variant="hero" className="mx-auto" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#003057] via-[#00B2E3] to-[#003057] bg-clip-text text-transparent dark:text-white">
              ¡Hola! Soy Capi
              <Sparkles className="inline-block w-8 h-8 ml-2 text-[#00B2E3] dark:text-[#00B2E3] animate-pulse" />
            </h1>
            <p className="text-xl text-[#003057]/80 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Tu asistente virtual de <strong>INSECAP</strong>. Pregúntame por texto o por voz sobre la plataforma, 
              procedimientos, o cualquier duda que tengas. ¡Estoy aquí para ayudarte!
              <Heart className="inline-block w-5 h-5 ml-1 text-red-500 animate-pulse" />
            </p>
          </div>
          
          {capiInfo && (
            <div className="flex justify-center gap-3">
              <Badge className="bg-gradient-to-r from-[#003057] to-[#002040] hover:from-[#002040] hover:to-[#001530] text-white px-3 py-1 dark:bg-gradient-to-r dark:from-[#00B2E3] dark:to-[#003057]">
                {capiInfo.version}
              </Badge>
              <Badge className="bg-gradient-to-r from-[#00B2E3] to-[#0089B8] hover:from-[#0089B8] hover:to-[#006D8E] text-white px-3 py-1 dark:bg-gradient-to-r dark:from-[#003057] dark:to-[#00B2E3]">
                {capiInfo.mode === 'demo' ? 'Modo Demo' : 'IA Avanzada'}
              </Badge>
              <Badge variant="outline" className="border-[#00B2E3]/50 text-[#003057] px-3 py-1 dark:border-[#00B2E3]/70 dark:text-gray-300">
                En línea
              </Badge>
            </div>
          )}
        </div>
        
        {/* Chat Card */}
        <Card className="border-[#00B2E3]/30 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/50">
          <CardHeader className="border-b border-[#00B2E3]/10 bg-gradient-to-r from-[#003057]/5 to-[#00B2E3]/5 dark:from-gray-700/50 dark:to-gray-600/50 dark:border-gray-700">
            <CardTitle className="flex items-center gap-2 text-[#003057] dark:text-white">
              <Bot className="w-5 h-5 text-[#00B2E3] dark:text-[#00B2E3]" />
              Chat con Capi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mensajes */}
            <div 
              className="h-[500px] overflow-y-auto p-6 space-y-6 bg-white dark:bg-gray-800 transition-colors duration-300"
              ref={messageContainerRef}
            >
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-2xl max-w-[85%] px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#003057] to-[#003057]/90 text-white'
                        : message.error 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                          : 'bg-gradient-to-r from-[#00B2E3]/10 to-[#0037FF]/5 text-[#003057] dark:bg-gray-700 dark:text-gray-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.role === 'assistant' && message.content && !message.error && (
                      <div className="flex items-center justify-end mt-2 space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-[#003057]/70 hover:text-[#00B2E3] p-1 h-6 dark:text-gray-300 dark:hover:text-[#00B2E3]"
                          onClick={() => handleTextToSpeech(message.content)}
                          disabled={isLoading}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        {message.mode && (
                          <span className="text-xs text-[#003057]/50 dark:text-gray-400">
                            {message.mode === 'demo' ? 'demo' : 'ai'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-[#00B2E3]/10 to-[#0037FF]/5 text-[#003057] rounded-2xl max-w-[85%] px-4 py-3 dark:bg-gray-700 dark:text-gray-100">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#00B2E3]" />
                      <span>Capi está pensando...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {error && !isLoading && messages.length === 0 && (
                <div className="flex justify-center p-4">
                  <div className="bg-red-100 text-red-800 p-3 rounded-lg text-center dark:bg-red-900/50 dark:text-red-200">
                    <p>{error}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.location.reload()} 
                      className="mt-2"
                    >
                      Reintentar
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Form */}
            <div className="border-t border-[#00B2E3]/10 p-4 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Escribe tu pregunta a Capi..."
                  className="flex-1 border-[#00B2E3]/30 focus-visible:ring-[#00B2E3]/20"
                  disabled={isLoading || isRecording}
                />
                
                <Button 
                  type="button"
                  variant="outline"
                  size="icon"
                  className={`border-[#00B2E3]/30 ${isRecording ? 'bg-red-100 text-red-600 border-red-300' : ''}`}
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-[#003057] hover:bg-[#003057]/90"
                  disabled={isLoading || !question.trim() || isRecording}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
              
              <div className="text-xs text-center mt-3 text-[#003057]/50 dark:text-gray-400">
                {isRecording ? (
                  <div className="text-red-500 flex items-center justify-center gap-2">
                    <span className="animate-pulse">●</span> Grabando... (Haz clic en el micrófono para detener)
                  </div>
                ) : (
                  <>
                    Presiona <kbd className="rounded border border-[#00B2E3]/30 bg-[#00B2E3]/5 px-1.5 py-0.5 text-[#003057]/70 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">Enter</kbd> para enviar o usa el micrófono <Mic className="w-3 h-3 inline" /> para hablar
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Características de Capi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="border-[#00B2E3]/20 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-[#00B2E3]/50">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto bg-[#00B2E3]/10 rounded-full flex items-center justify-center mb-3 dark:bg-[#00B2E3]/20">
                <Bot className="w-5 h-5 text-[#00B2E3] dark:text-[#00B2E3]" />
              </div>
              <h3 className="font-medium text-[#003057] dark:text-white">Chat de Texto</h3>
              <p className="text-sm text-[#003057]/70 dark:text-gray-300">
                Escribe tus preguntas y recibe respuestas al instante
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-[#00B2E3]/20 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-[#00B2E3]/50">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto bg-[#003057]/10 rounded-full flex items-center justify-center mb-3 dark:bg-[#003057]/20">
                <Mic className="w-5 h-5 text-[#003057] dark:text-[#00B2E3]" />
              </div>
              <h3 className="font-medium text-[#003057] dark:text-white">Reconocimiento de Voz</h3>
              <p className="text-sm text-[#003057]/70 dark:text-gray-300">
                Habla directamente con Capi usando tu micrófono
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-[#00B2E3]/20 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-[#00B2E3]/50">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto bg-[#0037FF]/10 rounded-full flex items-center justify-center mb-3 dark:bg-[#0037FF]/20">
                <Volume2 className="w-5 h-5 text-[#0037FF] dark:text-[#00B2E3]" />
              </div>
              <h3 className="font-medium text-[#003057] dark:text-white">Síntesis de Voz</h3>
              <p className="text-sm text-[#003057]/70 dark:text-gray-300">
                Escucha las respuestas con voz natural
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Audio element para reproducir respuestas */}
        <audio ref={audioRef} style={{ display: 'none' }} />
      </div>
    </div>
  )
}
