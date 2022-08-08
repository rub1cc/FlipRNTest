import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionResponse, Transaction } from '@/models'

const useFetchTransactions = () => {
  const [transactionsObj, setTransactionsObj] =
    useState<TransactionResponse | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('https://recruitment-test.flip.id/frontend-test')
      const json = await res.json()

      if (json) {
        setTransactionsObj(json)
        setTransactions(Object.values(json))
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const value = useMemo(
    () => ({
      transactions,
      transactionsObj,
      error,
      isLoading,
      refetch: fetchData
    }),
    [transactions, transactionsObj, error, isLoading, fetchData]
  )

  return value
}

export default useFetchTransactions
