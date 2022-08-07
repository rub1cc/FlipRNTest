import { Box } from '@/atoms'
import { RootStackParamList } from '@/navigations'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { TextInput } from 'react-native'
import { Transaction } from '@/models'
import { TransactionList } from '@/components'

type Props = NativeStackScreenProps<RootStackParamList, 'Transactions'>

export default function TransactionListScreen({ navigation }: Props) {
  const [transactions, setTransactions] = React.useState<Transaction[]>([])

  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch('https://recruitment-test.flip.id/frontend-test')
    const json = await data.json()
    setTransactions(Object.values(json))
  }

  const navigateToTransactionDetail = React.useCallback(
    (transaction: Transaction) => {
      navigation.navigate('Detail', { transaction })
    },
    [navigation]
  )

  return (
    <Box bg="mainBackground" p="sm">
      <Box bg="white" p="md">
        <TextInput placeholder="Cari nama, bank, atau nominal" />
      </Box>
      <TransactionList
        data={transactions}
        onItemPress={navigateToTransactionDetail}
      />
    </Box>
  )
}
