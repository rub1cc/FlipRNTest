import { Badge, Box, Text } from '@/atoms'
import { Transaction } from '@/models'
import { Theme } from '@/themes'
import {
  capitalize,
  formatDateStringToHumanReadable,
  formatNumberToRupiah
} from '@/utils/helpers'
import { ResponsiveValue } from '@shopify/restyle'
import React, { useCallback } from 'react'
import { Pressable } from 'react-native'

interface Props extends Transaction {
  onPress: (transaction: Transaction) => void
}

const TransactionListItem = ({ onPress, ...rest }: Props) => {
  const {
    amount,
    sender_bank,
    beneficiary_bank,
    beneficiary_name,
    status,
    created_at
  } = rest

  const borderColor: ResponsiveValue<keyof Theme['colors'], Theme> =
    React.useMemo(() => {
      switch (status) {
        case 'SUCCESS':
          return 'accentSuccess'
        default:
          return 'accentPending'
      }
    }, [status])

  const handlePress = useCallback(() => {
    onPress(rest)
  }, [onPress, rest])

  return (
    <Pressable onPress={handlePress}>
      <Box
        p="md"
        bg="cardBackground"
        mt="sm"
        borderLeftWidth={4}
        borderRadius="xs"
        borderColor={borderColor}
        flexDirection="row"
        alignItems="center"
      >
        <Box flex={1}>
          <Text fontWeight="bold">
            {capitalize(sender_bank)} → {capitalize(beneficiary_bank)}
          </Text>
          <Text>{beneficiary_name.toUpperCase()}</Text>
          <Box flex={1} flexDirection="row">
            <Text>{formatNumberToRupiah(amount)}</Text>
            <Text mx="xs">•</Text>
            <Text>{formatDateStringToHumanReadable(created_at)}</Text>
          </Box>
        </Box>
        <Badge variant={status} />
      </Box>
    </Pressable>
  )
}

export default TransactionListItem
