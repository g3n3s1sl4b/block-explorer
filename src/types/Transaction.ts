import Block from './Block'
import { Notes } from './Note'
import { Spends } from './Spend'

interface ParsedTransaction {
  id: number
  hash: string
  fee?: string
  size: string
  notes: Notes
  spends: Spends
  blocks?: Block[]
}

export default interface Transaction extends Omit<ParsedTransaction, 'size'> {
  size: number
}

export type Transactions = Transaction[]

export const formatTransactionFromJson = (transaction: ParsedTransaction): Transaction => ({
  ...transaction,
  size: parseInt(transaction.size),
})

export const formatTransactionsFromJson = (data: ParsedTransaction[]): Transactions =>
  data.map((transaction: ParsedTransaction) => formatTransactionFromJson(transaction))

export function isTransaction(x: unknown): x is Transaction {
  return typeof x === 'object' && !!x && 'notes' in x && 'spends' in x
}
