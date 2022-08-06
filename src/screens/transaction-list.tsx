import { RootStackParamList } from '@/navigations'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button, View } from 'react-native'


type Props = NativeStackScreenProps<RootStackParamList, 'TransactionList'>

export default function TransactionListScreen({ navigation }: Props) {

  const navigateToTransactionDetail = () => {
    navigation.navigate('TransactionDetail', { id: '1' })
  }

  return (
    <View>
      <Button title='Go to TransactionDetail' onPress={navigateToTransactionDetail} />
    </View>
  )
}
