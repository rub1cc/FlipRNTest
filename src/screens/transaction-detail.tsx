import { RootStackParamList } from '@/navigations'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>

export default function TransactionDetailScreen({ route }: Props) {
  const { id } = route.params
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}
