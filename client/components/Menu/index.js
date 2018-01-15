import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Icon from 'material-ui/Icon'

import styles from './style.css'

const Menu = ({ isOpen, toggleMenu, menuItems }) => (
  <Drawer open={isOpen} onClose={toggleMenu} className={styles.drawer}>
    <List>
      {menuItems.map(({ path, text, icon, ...rest }) => (
        <Link to={path} key={path}>
          <ListItem button onClick={toggleMenu}>
            <Avatar>
              <Icon>{icon}</Icon>
            </Avatar>
            <ListItemText primary={text} {...rest} />
          </ListItem>
        </Link>
      ))}
    </List>
  </Drawer>
)

Menu.defaultProps = {
  isOpen: false,
  menuItems: [
    {
      path: '/',
      text: 'Home',
      icon: 'home',
      secondary: 'Get back to your Dashboard'
    },
    {
      path: '/updates',
      text: 'Updates',
      icon: 'notifications',
      secondary: 'Check your notifications!'
    },
    {
      path: '/notreal',
      text: '404 Route',
      secondary: 'Get taken to a non-real route',
      icon: 'close'
    }
  ]
}

Menu.propTypes = {
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func.isRequired
}

export default Menu
