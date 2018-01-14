import React, { Component } from 'react'
import Routes from './Routes'
import Button from 'material-ui/Button'

import styles from './App.css'

import logo from '_img/logo'

class App extends Component {
  state = {
    users: []
  }

  render () {
    const { users } = this.state
    return (
      <div className={styles.app}>
        <img src={logo} alt='Logo' />
        <Button color='primary'>You can click me!</Button>
        <Routes />
      </div>
    )
  }
}

export default App
