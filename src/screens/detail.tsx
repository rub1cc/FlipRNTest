import { RootStackParamList } from '@/navigations'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useState } from 'react'
import { Box, Text } from '@/atoms'
import {
  capitalize,
  formatDateStringToHumanReadable,
  formatNumberToRupiah
} from '@/utils/helpers'
import { TouchableOpacity } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>

const DetailColumn = ({ label, value }) => {
  return (
    <Box flex={1} width="50%" pr="sm">
      <Text fontWeight="bold">{label}</Text>
      <Text>{value}</Text>
    </Box>
  )
}

const DetailRow = ({ children }) => {
  return (
    <Box flexDirection="row" justifyContent="space-between" mt="lg">
      {children}
    </Box>
  )
}

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

  const toggleDetail = useCallback(() => {
    setExapanded(!expanded)
  }, [expanded])

  return (
    <Box>
      <Box p="xl" bg="white" mb="xxs">
        <Text fontWeight="bold">ID TRANSAKSI: #{id}</Text>
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
          <DetailRow>
            <DetailColumn
              label={beneficiary_name.toUpperCase()}
              value={account_number}
            />
            <DetailColumn
              label="NOMINAL"
              value={formatNumberToRupiah(amount)}
            />
          </DetailRow>
          <DetailRow>
            <DetailColumn label="BERITA TRANSFER" value={remark} />
            <DetailColumn label="KODE UNIK" value={unique_code} />
          </DetailRow>
          <DetailRow>
            <DetailColumn
              label="WAKTU DIBUAT"
              value={formatDateStringToHumanReadable(created_at)}
            />
          </DetailRow>
        </Box>
      )}
    </Box>
  )
}
