import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { dissoc } from 'ramda'

class TransitionRoute extends Component {
  componentWillMount () {
    console.log('mounting?')
    this.props.onTransition()
  }

  componentDidUpdate () {
    this.props.onTransition()
  }

  render () {
    const props = dissoc('onTransition', this.props)
    return <Route {...props} />
  }
}

export default TransitionRoute
