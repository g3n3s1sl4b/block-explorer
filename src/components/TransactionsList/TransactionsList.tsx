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
import { getIRFAmountWithCurrency, ORE_TO_IRON } from '../../utils/currency'
import { getDisplaySizeInBytes } from '../../utils/size'
import BoxWrapper from '../BoxWrapper/BoxWrapper'
import transactionIcon from '../../assets/images/breadcrumb/transaction.svg'
import transactionsList from '../../assets/jss/components/TransactionsList/transactionsList'
import TransactionsListSmall from './TransactionsListSmall'
import SmallChip from '../../components/SmallChip/SmallChip'

interface Prop {
  transactions: Transactions
  blockHash: string
}
const useStyles = makeStyles(transactionsList)

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
            {transactions.map(({ fee = '0', hash, size }) => {
              const formattedFee = parseInt(fee).toLocaleString()
              const isMinersFee = fee[0] === '-'
              return (
                <StyledTableRow key={hash}>
                  <StyledTableCell scope='row'>
                    <Link to={getTransactionDetailPageUrl(blockHash, hash)}>
                      <div className={classes.root}>
                        <img src={transactionIcon} role='presentation' />
                        {hash.toUpperCase()}
                      </div>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {isMinersFee && (
                      <SmallChip text={t('app.components.transactionslist.minersFee')} />
                    )}
                  </StyledTableCell>
                  <StyledTableCell
                    align='right'
                    title={t(
                      'app.components.transactionslist.converstion',
                      formattedFee,
                      ORE_TO_IRON.toLocaleString(),
                    )}
                  >
                    {getIRFAmountWithCurrency(fee)}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{getDisplaySizeInBytes(size)}</StyledTableCell>
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
