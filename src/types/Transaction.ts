import { BlockIdentifier } from './Block'
import { Notes } from './Note'
import { Spends } from './Spend'

export interface Operation {}

export default interface Transaction {
  block_identifier?: BlockIdentifier
  confirmations?: number
  fee?: number

  transaction_identifier: {
    hash: string
  }
  operations: Array<Operation>
  metadata: {
    notes: Notes
    spends: Spends
    size: number
  }
  timestamp?: Date
}

export type Transactions = Transaction[]

export const formatTransactionFromJson = (transaction: any): Transaction => {
  return {
    ...transaction,
    size: parseInt(transaction.size),
    timestamp: new Date(transaction.timestamp),
  }
}

export const formatTransactionsFromJson = (transactions: any): Transactions => {
  return transactions.map((transaction: any) => formatTransactionFromJson(transaction))
}
