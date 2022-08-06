import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { TransactionListScreen, TransactionDetailScreen } from '@/screens'
import { Transaction } from '@/models'

export type RootStackParamList = {
  Transactions: undefined
  Detail: {
    transaction: Transaction
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigations() {
  return (
    <Stack.Navigator initialRouteName="Transactions">
      <Stack.Screen name="Transactions" component={TransactionListScreen} />
      <Stack.Screen
        name="Detail"
        component={TransactionDetailScreen}
      />
    </Stack.Navigator>
  )
}
