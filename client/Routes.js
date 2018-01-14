import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' render={() => <h2>Hello!</h2>} />
      <Route render={() => <h2>good bye!</h2>} />
    </Switch>
  </Router>
)

export default Routes
