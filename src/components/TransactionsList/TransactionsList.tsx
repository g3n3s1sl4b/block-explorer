import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useTheme, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { Transactions } from '../../types/Transaction'
import { StyledTableCell, StyledTableRow } from '../../components/Table/Table'
import { getTransactionDetailPageUrl } from '../../utils/routes'
import { getIRFAmountWithCurrency } from '../../utils/currency'
import { getDisplaySizeInBytes } from '../../utils/size'
import BoxWrapper from '../BoxWrapper/BoxWrapper'
import transactionIcon from '../../assets/images/breadcrumb/transaction.svg'
import transactionsList from '../../assets/jss/components/TransactionsList/transactionsList'
import TransactionsListSmall from './TransactionsListSmall'

interface Prop {
  transactions: Transactions
  blockHash: string
}
const useStyles = makeStyles(transactionsList)

// TODO: is the miner's fee always -2000000000?
const MINERS_FEE = '-2000000000'

const TransactionsList = (props: Prop) => {
  const { blockHash, transactions } = props
  const { t } = useTranslation()
  const classes = useStyles()
  const theme = useTheme()
  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))
  if (isSmallBreakpoint) return <TransactionsListSmall {...props} />

  return (
    <BoxWrapper marginTop={2} header={t('app.transactionsContainer.title')}>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>{t('app.components.transactionslist.hash')}</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
              <StyledTableCell align='right'>
                {t('app.components.transactionslist.fee')}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {t('app.components.transactionslist.bytes')}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => {
              // eslint-disable-next-line no-console
              console.log({ transaction, feeType: transaction.fee })
              const { fee = '0' } = transaction
              const isMinersFee = fee === MINERS_FEE
              return (
                <StyledTableRow key={transaction.hash}>
                  <StyledTableCell scope='row'>
                    <Link to={getTransactionDetailPageUrl(blockHash, transaction.hash)}>
                      <div className={classes.root}>
                        <img src={transactionIcon} role='presentation' />
                        {transaction.hash.toUpperCase()}
                      </div>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {isMinersFee && `Miner's Fee`}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {getIRFAmountWithCurrency(transaction.fee)}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {getDisplaySizeInBytes(transaction.size)}
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxWrapper>
  )
}

export default TransactionsList
