import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import headerStyle from '../../assets/jss/components/Header/headerStyle'
import logo from '../../assets/images/logo.svg'
import { RoutePath } from '../../routes/routePath'
import Search from '../../container/Search/Search'

const useStyles = makeStyles(headerStyle)

interface Props {
  isSmallBreakpoint: Boolean
  showSearch: Boolean
  isSticky?: Boolean
  isTop?: Boolean
}

const Header = ({ isSmallBreakpoint, isSticky, isTop, showSearch }: Props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <AppBar
      position='relative'
      className={classNames(classes.root, {
        [classes.sticky]: !isTop && isSticky,
      })}
    >
      <Toolbar className={classes.toolbar}>
        {/* {isSmallBreakpoint && ( */}
        <Link to={RoutePath.Dashboard}>
          <img
            src={logo}
            alt={t('app.header.logo.alt')}
            className={classNames(classes.logo, {
              [classes.invisible]: !isTop && !isSticky,
            })}
          />
        </Link>
        {/* )} */}
        {showSearch && <Search />}
        <Button
          href='https://www.ironfish.network/docs/whitepaper/1_introduction'
          className={classNames(classes.button, {
            [classes.invisible]: !isTop && !isSticky,
          })}
          variant='contained'
        >
          {t('app.header.docs')}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
