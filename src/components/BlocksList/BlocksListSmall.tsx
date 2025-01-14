import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Block from '../../types/Block'
import { getBlockDetailPageUrl } from '../../utils/routes'
import { getDisplayTimestamp } from '../../utils/time'
import { getDisplaySizeInBytes } from '../../utils/size'
import blockRow from '../../assets/images/blockRow.svg'
import blocksListSmall from '../../assets/jss/components/BlocksList/blocksListSmall'
import { getDisplayShortHash } from '../../utils/string'

interface Prop {
  blockList: Block[]
}
const useStyles = makeStyles(blocksListSmall)

const BlocksList = ({ blockList }: Prop) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      {blockList.map((block, index) => (
        <div
          key={block.sequence}
          className={classNames(classes.item, {
            [classes.firstItem]: index === 0,
          })}
        >
          <div className={classes.content}>
            <Typography variant='subtitle2'>{t('app.components.blockslist.height')}</Typography>
            <Typography variant='body1'>
              <Link className={classes.link} to={getBlockDetailPageUrl(block.hash)}>
                <img src={blockRow} alt='' role='presentation' />
                {block.sequence}
              </Link>
            </Typography>
          </div>
          <div className={classes.content}>
            <Typography variant='subtitle2'>
              {t('app.components.blockslist.difficulty')}
            </Typography>
            <Typography variant='body1'>{block.difficulty}</Typography>
          </div>
          <div className={classes.content}>
            <Typography variant='subtitle2'>{t('app.components.blockslist.size')}</Typography>
            <Typography variant='body1'>{getDisplaySizeInBytes(block.size)}</Typography>
          </div>
          <div className={classes.content}>
            <Typography variant='subtitle2'>
              {t('app.components.blockslist.transactions')}
            </Typography>
            <Typography variant='body1'>{block.transactionsCount}</Typography>
          </div>
          <div className={classes.content}>
            <Typography variant='subtitle2'>{t('app.components.blockslist.hash')}</Typography>
            <Typography variant='body1'>
              <Link className={classes.link} to={getBlockDetailPageUrl(block.hash)}>
                {getDisplayShortHash(block.hash)}
              </Link>
            </Typography>
          </div>

          <div className={classes.content}>
            <Typography variant='subtitle2'>
              {t('app.components.blockslist.timestamp')}
            </Typography>
            <Typography variant='body1'>{getDisplayTimestamp(block.timestamp)}</Typography>
          </div>
        </div>
      ))}
    </>
  )
}

export default React.memo(BlocksList)
