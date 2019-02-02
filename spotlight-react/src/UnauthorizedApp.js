import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthCallback from '@/pages/AuthCallback'
import LandingPage from '@/pages/Landing'

export default (props) => (
  <Switch>
    <Route exact path="/callback" render={ (routeProps) => <AuthCallback { ...routeProps } onSuccess={ props.onAuth }/> } />
    <Route component={ LandingPage } />
  </Switch>
)