import React, { Component } from 'react'
import Routes from './Routes'
import { TopBar, Menu } from './components'

import styles from './App.css'

class App extends Component {
  state = {
    menuOpen: false
  }

  toggleMenu = () => this.setState(({ menuOpen }) => ({ menuOpen: !menuOpen }))

  closeMenu = () => this.setState(() => ({ menuOpen: false }))

  render () {
    return (
      <div className={styles.app}>
        <TopBar toggleMenu={this.toggleMenu} />
        <Routes onTransition={this.closeMenu} />
        <Menu isOpen={this.state.menuOpen} toggleMenu={this.toggleMenu} />
      </div>
    )
  }
}

export default App
