import React from 'react'
import { Switch, Route } from 'react-router-dom'

import * as Screens from './screens'

const Routes = props => (
  <Switch>
    <Route exact path='/' component={Screens.Dashboard} />
    <Route path='/updates' render={() => <div>HJello from updates1</div>} />
    <Route render={() => <h2>good bye!</h2>} />
  </Switch>
)

export default Routes
