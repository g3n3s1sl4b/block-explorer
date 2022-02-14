import React from 'react'
import classNames from 'classnames'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: '#FFCD85',
      paddingLeft: '4px',
      paddingRight: '4px',
      marginTop: '-3px',
    },
    inline: {
      paddingTop: '1px',
      marginLeft: '10px',
    },
  }),
)

interface Prop {
  text: string
  inline?: boolean
  style?: Record<string, string>
}

export default function SmallChip({ text, inline, style = {} }: Prop) {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Chip
      size='small'
      style={style}
      className={classNames(classes.root, {
        [classes.inline]: inline,
      })}
      label={t(text)}
    />
  )
}
