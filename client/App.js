import React, { Component } from 'react'
import Routes from './Routes'
import Button from 'material-ui/Button'

import styles from './App.css'
import { gql } from '_graph'

import logo from '_img/logo'

const query = gql('http://localhost:5000/graphql')

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.fetchLatest()
  }

  fetchLatest = () => query({
    query: `
      query {
        users {
          name,
          _id
        }
      }
    `
  }).then(({ data }) => this.setState({ users: data.users }))

  addUser = () =>
    query({
      query: `
        mutation CreateUser($user: NewUser!) {
          newUser(input: $user) {
            name,
            _id
          }
        }
      `,
      variables: {
        user: { name: 'Tim' }
      }
    }).then(this.fetchLatest)

  render() {
    const { users } = this.state
    return (
      <div className={styles.app}>
        <img src={logo} alt='Logo' />
        <h2>Total Users: {users.length}</h2>
        <Button color='primary' onClick={this.addUser}>You can click me!</Button>
        <Routes />
      </div>
    )
  }
}

export default App
