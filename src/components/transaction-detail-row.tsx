import { Box } from '@/atoms'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const TransactionDetailRow: React.FC<Props> = ({ children }) => {
  return (
    <Box flexDirection="row" justifyContent="space-between" mt="lg">
      {children}
    </Box>
  )
}

export default TransactionDetailRow
