import { useState, useEffect, useCallback } from 'react'

// Hook personalizado para manejar peticiones API
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction()
      setData(result)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }, [apiFunction])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = async () => {
    return fetchData()
  }

  return { data, loading, error, refetch }
}

// Hook para mutaciones (POST, PUT, DELETE)
export const useMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (apiFunction, ...args) => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction(...args)
      return result
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
