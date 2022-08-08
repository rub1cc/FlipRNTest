import { Box, Text } from '@/atoms'
import React from 'react'

interface Props {
  label: string
  value: any
}

const TransactionDetailColumn: React.FC<Props> = ({ label, value }) => {
  return (
    <Box flex={1} width="50%" pr="sm">
      <Text fontWeight="bold">{label}</Text>
      <Text>{value}</Text>
    </Box>
  )
}

export default TransactionDetailColumn
