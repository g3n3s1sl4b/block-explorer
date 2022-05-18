import { createStyles, Theme } from '@material-ui/core'
import { HEADER_HEIGHT, HEADER_HEIGHT_SM } from '../../theme'

const adStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primaryBackground?.main,
      boxShadow: 'none',
      height: `${HEADER_HEIGHT}px`,
      background: 'none',
      padding: theme.spacing(0, 10, 0, 10),
      zIndex: 1,
      transition: `all 0.1s ${theme.transitions.easing.easeInOut}`,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 3, 0, 3),
        height: HEADER_HEIGHT_SM,
      },
      '& .MuiToolbar-root': {
        display: 'flex',
        maxWidth: '1413px',
        margin: '0 auto',
        height: HEADER_HEIGHT,
        width: '100%',
        alignContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          alignItems: 'baseline',
        },
      },
    },
    search: {
      marginLeft: '46px',
      marginRight: '46px',
      flex: 1,
      maxWidth: '988px',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px',
        marginRight: '0px',
        width: '100%',
        position: 'absolute',
        marginTop: '58px',
      },
    },
    isTop: {
      border: `1px solid ${theme.palette.borderColor?.main}`,
      boxShadow: theme.shadows[1],
    },
    sticky: {
      position: 'fixed',
      border: `1px solid ${theme.palette.borderColor?.main}`,
      top: 0,
    },
    toolbar: {
      padding: 0,
    },
    leftWrapper: {
      display: 'flex',
      alignItems: 'center',
      columnGap: '32px',
      [theme.breakpoints.down('sm')]: {
        left: 0,
        columnGap: '12px',
      },
    },
    rightWrapper: {
      display: 'flex',
      alignItems: 'center',
      columnGap: '12px',
      [theme.breakpoints.down('sm')]: {
        right: 0,
        position: 'absolute',
      },
    },
    button: {
      opacity: 1,
      display: 'block',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '11px',
      },
    },
    logo: {
      opacity: 1,
      flex: 1,
      [theme.breakpoints.down('sm')]: {
        marginTop: '12px',
      },
    },
    invisible: {
      opacity: 0,
    },
    networkUnavailableBanner: {
      background: 'linear-gradient(90deg, #f6a143, #ffcd85)',
      color: 'black',
      display: 'flex',
      height: '48px',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(0, -10),
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(-2),
        marginBottom: theme.spacing(1),
      },
    },
    versionChip: {
      marginBottom: '6px',
      fontSize: '12px',
      background: '#f3f3f4',
      borderRadius: '144px',
      display: 'inline-block',
      padding: '6px 16px',
      fontFamily: 'mono-regular',
      position: 'relative',
      zIndex: 1000,
      '&:hover': {
        background: '#ffcd85',
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: '-6px',
        padding: '6px 8px',
      },
      [theme.breakpoints.down(480)]: {
        display: 'none',
      },
    },
  })

export default adStyle
