import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { statisticsService } from '@/services/api'

export const useStatisticsStore = create(
  subscribeWithSelector((set, get) => ({
    // Estado de datos
    globalSummary: null,
    clientStatistics: [],
    temporalTrends: [],
    paymentDistribution: null,
    comparativeAnalysis: null,
    
    // Estado de carga
    isLoading: {
      globalSummary: false,
      clientStatistics: false,
      temporalTrends: false,
      paymentDistribution: false,
      comparativeAnalysis: false,
      generating: false
    },
    
    // Estado de errores
    errors: {
      globalSummary: null,
      clientStatistics: null,
      temporalTrends: null,
      paymentDistribution: null,
      comparativeAnalysis: null,
      generating: null
    },
    
    // Parámetros de filtros
    filters: {
      clientStats: {
        limit: 50,
        offset: 0,
        sortBy: 'promedio_dias',
        order: 'desc'
      },
      temporalTrends: {
        groupBy: 'month',
        year: new Date().getFullYear()
      },
      comparative: {
        fechaInicioPeriodo1: null,
        fechaFinPeriodo1: null,
        fechaInicioPeriodo2: null,
        fechaFinPeriodo2: null
      }
    },
    
    // Paginación
    pagination: {
      clientStats: {
        total: 0,
        hasMore: false,
        currentPage: 0
      }
    },
    
    // Acciones para generar estadísticas
    generateStatistics: async () => {
      set(state => ({
        isLoading: { ...state.isLoading, generating: true },
        errors: { ...state.errors, generating: null }
      }))
      
      try {
        const result = await statisticsService.generateStatistics()
        return result
      } catch (error) {
        set(state => ({
          errors: { ...state.errors, generating: error.message }
        }))
        throw error
      } finally {
        set(state => ({
          isLoading: { ...state.isLoading, generating: false }
        }))
      }
    },
    
    // Acciones para obtener resumen global
    fetchGlobalSummary: async () => {
      set(state => ({
        isLoading: { ...state.isLoading, globalSummary: true },
        errors: { ...state.errors, globalSummary: null }
      }))
      
      try {
        const data = await statisticsService.getGlobalSummary()
        set({ globalSummary: data })
        return data
      } catch (error) {
        set(state => ({
          errors: { ...state.errors, globalSummary: error.message }
        }))
        throw error
      } finally {
        set(state => ({
          isLoading: { ...state.isLoading, globalSummary: false }
        }))
      }
    },
    
    // Acciones para estadísticas por cliente
    fetchClientStatistics: async (params = {}) => {
      const currentFilters = get().filters.clientStats
      const finalParams = { ...currentFilters, ...params }
      
      set(state => ({
        isLoading: { ...state.isLoading, clientStatistics: true },
        errors: { ...state.errors, clientStatistics: null },
        filters: {
          ...state.filters,
          clientStats: finalParams
        }
      }))
      
      try {
        const response = await statisticsService.getClientStatistics(finalParams)
        
        set(state => ({
          clientStatistics: finalParams.offset === 0 ? response.data : [...state.clientStatistics, ...response.data],
          pagination: {
            ...state.pagination,
            clientStats: {
              total: response.pagination?.total || 0,
              hasMore: response.pagination?.has_more || false,
              currentPage: Math.floor(finalParams.offset / finalParams.limit)
            }
          }
        }))
        
        return response
      } catch (error) {
        set(state => ({
          errors: { ...state.errors, clientStatistics: error.message }
        }))
        throw error
      } finally {
        set(state => ({
          isLoading: { ...state.isLoading, clientStatistics: false }
        }))
      }
    },
    
    // Acciones para tendencias temporales
    fetchTemporalTrends: async (params = {}) => {
      const currentFilters = get().filters.temporalTrends
      const finalParams = { ...currentFilters, ...params }
      
      set(state => ({
        isLoading: { ...state.isLoading, temporalTrends: true },
        errors: { ...state.errors, temporalTrends: null },
        filters: {
          ...state.filters,
          temporalTrends: finalParams
        }
      }))
      
      try {
        const data = await statisticsService.getTemporalTrends(finalParams)
        set({ temporalTrends: data.tendencias || [] })
        return data
      } catch (error) {
        set(state => ({
          errors: { ...state.errors, temporalTrends: error.message }
        }))
        throw error
      } finally {
        set(state => ({
          isLoading: { ...state.isLoading, temporalTrends: false }
        }))
      }
    },
    
    // Acciones para distribución de pagos
    fetchPaymentDistribution: async () => {
      set(state => ({
        isLoading: { ...state.isLoading, paymentDistribution: true },
        errors: { ...state.errors, paymentDistribution: null }
      }))
      
      try {
        const data = await statisticsService.getPaymentDistribution()
        set({ paymentDistribution: data })
        return data
      } catch (error) {
        set(state => ({
          errors: { ...state.errors, paymentDistribution: error.message }
        }))
        throw error
      } finally {
        set(state => ({
          isLoading: { ...state.isLoading, paymentDistribution: false }
        }))
      }
    },
    
    // Acciones para análisis comparativo
    fetchComparativeAnalysis: async (params) => {
      set(state => ({
        isLoading: { ...state.isLoading, comparativeAnalysis: true },
        errors: { ...state.errors, comparativeAnalysis: null },
        filters: {
          ...state.filters,
          comparative: { ...state.filters.comparative, ...params }
        }
      }))
      
      try {
        const data = await statisticsService.getComparativeAnalysis(params)
        set({ comparativeAnalysis: data })
        return data
      } catch (error) {
        set(state => ({
          errors: { ...state.errors, comparativeAnalysis: error.message }
        }))
        throw error
      } finally {
        set(state => ({
          isLoading: { ...state.isLoading, comparativeAnalysis: false }
        }))
      }
    },
    
    // Acciones para limpiar datos
    clearData: () => {
      set({
        globalSummary: null,
        clientStatistics: [],
        temporalTrends: [],
        paymentDistribution: null,
        comparativeAnalysis: null
      })
    },
    
    // Acciones para limpiar errores
    clearErrors: () => {
      set({
        errors: {
          globalSummary: null,
          clientStatistics: null,
          temporalTrends: null,
          paymentDistribution: null,
          comparativeAnalysis: null,
          generating: null
        }
      })
    },
    
    // Acción para resetear filtros
    resetFilters: () => {
      set({
        filters: {
          clientStats: {
            limit: 50,
            offset: 0,
            sortBy: 'promedio_dias',
            order: 'desc'
          },
          temporalTrends: {
            groupBy: 'month',
            year: new Date().getFullYear()
          },
          comparative: {
            fechaInicioPeriodo1: null,
            fechaFinPeriodo1: null,
            fechaInicioPeriodo2: null,
            fechaFinPeriodo2: null
          }
        }
      })
    }
  }))
)
