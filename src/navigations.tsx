import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TransactionListScreen from '@/screens/transaction-list';
import TransactionDetailScreen from '@/screens/transaction-detail';


export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetail: {
    id: string;
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigations() {
  return (
    <Stack.Navigator initialRouteName='TransactionList'>
      <Stack.Screen name='TransactionList' component={TransactionListScreen} />
      <Stack.Screen name='TransactionDetail' component={TransactionDetailScreen} />
    </Stack.Navigator>
  )
}
