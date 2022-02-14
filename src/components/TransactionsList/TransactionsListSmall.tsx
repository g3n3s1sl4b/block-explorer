import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { getDisplaySizeInBytes } from '../../utils/size'
import blocksListSmall from '../../assets/jss/components/BlocksList/blocksListSmall'
import transactionIcon from '../../assets/images/breadcrumb/transaction.svg'
import { Transactions } from '../../types/Transaction'
import { getIRFAmountWithCurrency } from '../../utils/currency'
import { getTransactionDetailPageUrl } from '../../utils/routes'
import { getDisplayShortHash } from '../../utils/string'
import BoxWrapper from '../BoxWrapper/BoxWrapper'
import SmallChip from '../SmallChip/SmallChip'

interface Prop {
  transactions: Transactions
  blockHash: string
}
const useStyles = makeStyles(blocksListSmall)

const TransactionsListSmall = ({ blockHash, transactions }: Prop) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <BoxWrapper header={t('app.transactionsContainer.title')}>
      {transactions.map(({ hash, fee = '0', size }, index) => {
        const isMinersFee = fee[0] === '-'
        return (
          <div
            key={hash}
            className={classNames(classes.item, {
              [classes.firstItem]: index === 0,
            })}
          >
            <div className={classes.content}>
              <Typography variant='subtitle2'>
                {t('app.components.transactionslist.hash')}
              </Typography>
              <Typography variant='body1'>
                <Link
                  className={classes.link}
                  to={getTransactionDetailPageUrl(blockHash, hash)}
                >
                  <img src={transactionIcon} role='presentation' />
                  {getDisplayShortHash(hash)}
                </Link>
              </Typography>
            </div>
            <div className={classes.content}>
              <Typography variant='subtitle2'>
                {t('app.components.transactionslist.fee')}
              </Typography>
              <Typography variant='body1'>{getIRFAmountWithCurrency(fee)}</Typography>
              {isMinersFee && (
                <SmallChip
                  style={{ marginTop: '0.5rem' }}
                  text={t('app.components.transactionslist.minersFee')}
                />
              )}
            </div>
            <div className={classes.content}>
              <Typography variant='subtitle2'>
                {t('app.components.transactionslist.bytes')}
              </Typography>
              <Typography variant='body1'>{getDisplaySizeInBytes(size)}</Typography>
            </div>
          </div>
        )
      })}
    </BoxWrapper>
  )
}

export default React.memo(TransactionsListSmall)
