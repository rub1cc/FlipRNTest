import { RootStackParamList } from '@/navigations'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useState } from 'react'
import { Box, Text } from '@/atoms'
import {
  capitalize,
  formatDateStringToHumanReadable,
  formatNumberToRupiah
} from '@/utils/helpers'
import { Image, TouchableOpacity } from 'react-native'
import { TransactionDetailColumn, TransactionDetailRow } from '@/components'
import { useClipboard } from '@/hooks'

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>

export default function TransactionDetailScreen({ route }: Props) {
  const { transaction } = route.params
  const [expanded, setExapanded] = useState<boolean>(true)

  const {
    id,
    beneficiary_name,
    account_number,
    amount,
    remark,
    unique_code,
    created_at,
    sender_bank,
    beneficiary_bank
  } = transaction

  const { isCopied, onCopy } = useClipboard(id)

  const toggleDetail = useCallback(() => {
    setExapanded(!expanded)
  }, [expanded])

  return (
    <Box>
      <Box p="xl" bg="white" mb="xxs" flexDirection="row" alignItems="center">
        <Text fontWeight="bold" mr="xs">ID TRANSAKSI: #{id}</Text>
        <TouchableOpacity onPress={onCopy}>
          <Box flexDirection="row" alignItems="center">
            <Image source={require('@/assets/icons/copy.png')} />
            <Text color="primary" ml="xs">{isCopied && "Tersalin"}</Text>
          </Box>
        </TouchableOpacity>
      </Box>
      <Box
        p="xl"
        bg="white"
        mb="sm"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text fontWeight="bold">DETAIL TRANSAKSI</Text>
        <TouchableOpacity onPress={toggleDetail}>
          <Text color="primary" fontWeight="bold">
            {expanded ? 'Tutup' : 'Lihat detail'}
          </Text>
        </TouchableOpacity>
      </Box>
      {expanded && (
        <Box p="xl" bg="white">
          <Text fontWeight="bold">
            {capitalize(sender_bank)} → {capitalize(beneficiary_bank)}
          </Text>
          <TransactionDetailRow>
            <TransactionDetailColumn
              label={beneficiary_name.toUpperCase()}
              value={account_number}
            />
            <TransactionDetailColumn
              label="NOMINAL"
              value={formatNumberToRupiah(amount)}
            />
          </TransactionDetailRow>
          <TransactionDetailRow>
            <TransactionDetailColumn label="BERITA TRANSFER" value={remark} />
            <TransactionDetailColumn label="KODE UNIK" value={unique_code} />
          </TransactionDetailRow>
          <TransactionDetailRow>
            <TransactionDetailColumn
              label="WAKTU DIBUAT"
              value={formatDateStringToHumanReadable(created_at)}
            />
          </TransactionDetailRow>
        </Box>
      )}
    </Box>
  )
}
