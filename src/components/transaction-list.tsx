import { Transaction } from '@/models'
import { useCallback } from 'react'
import { FlatList } from 'react-native'
import React from 'react'
import { TransactionListItem } from '@/components'

interface Props {
  data: Transaction[]
  onItemPress: (transaction: Transaction) => void
}

const TransactionList: React.FC<Props> = ({ data, onItemPress }) => {
  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => {
      return <TransactionListItem {...item} onPress={onItemPress} />
    },
    [onItemPress]
  )
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingBottom: 80
      }}
    />
  )
}

export default TransactionList
