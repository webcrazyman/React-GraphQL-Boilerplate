import React from 'react'
import { withStyles } from 'material-ui'

import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Typography from 'material-ui/Typography'

import styles from './style.css'

const themeStyle = theme => ({
  icon: {
    color: theme.palette.grey['500']
  }
})
const TopBar = ({ toggleMenu, classes }) => (
  <AppBar position='static'>
    <div className={styles.appBar}>
      <div className={styles.menuIcon}>
        <Button fab mini aria-label='menu' onClick={toggleMenu}>
          <Icon className={`${styles.menuIcon} ${classes.icon}`}>menu</Icon>
        </Button>
      </div>
      <div className={styles.title}>
        <Typography type='title' color='inherit'>
          GraphQL Boilerplate
        </Typography>
      </div>
    </div>
  </AppBar>
)

TopBar.displayName = 'TopBar'

export default withStyles(themeStyle)(TopBar)
