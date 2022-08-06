export type TransactionStatus = 'SUCCESS' | 'PENDING'

export interface Transaction {
  id: string
  amount: number
  unique_code: number
  status: TransactionStatus
  sender_bank: string
  account_number: number
  beneficiary_bank: string
  beneficiary_name: string
  remark: string
  created_at: string
  completed_at: string
  fee: number
}
