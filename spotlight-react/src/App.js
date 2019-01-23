import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SpotifyAPI from '@/spotify-api'

import AuthCallback from '@/pages/AuthCallback'
import LandingPage from '@/pages/Landing'
import ProfilePage from '@/pages/Profile'

import Navbar from '@/components/navbar'
import Loading from '@/components/loading'

import '@/App.css'

export default class App extends Component {
  state = {
    loading: true,
    message: 'Checking for active session',
    hasActiveSession: false 
  }

  componentDidMount = () => {
    this.checkForActiveSession();
  }

  render = () => (
    <section id="app">
      <Router>
      {
        !this.state.hasActiveSession 
        ? (
            <Switch>
              <Route exact path="/callback" render={ props => <AuthCallback { ...props } onSuccess={ this.setSession }/> } />
              <Route render={() => (
                <>
                <LandingPage />
                { this.state.loading && <Loading message={ this.state.message } /> }
                </>
              )} />
          </Switch>
        )
        : (
            <>
            <Navbar onLogout={ this.clearSession }/>
            <Switch>
              <Route exact path="/user" component={ ProfilePage } />
              <Route component={ ProfilePage } />
            </Switch>
            </>
        )
      }
      </Router>
    </section>
  )

  checkForActiveSession = () => {
    this.setState({ loading: true, message: 'Checking for active session' }, () => {
      let accessToken = sessionStorage.getItem('access_token')
      let expiryTime = parseInt(sessionStorage.getItem('expiry_time'))
      let now = new Date().getTime()
  
      if(!accessToken || now >= expiryTime) {
        this.refreshSession()
      } else {
        this.setState({ loading: false, message: '', hasActiveSession: true })
      }
    })
  }

  refreshSession = () => {
    console.log('refreshing session')
    this.setState({ loading: true, message: 'Refreshing session' }, () => {
      SpotifyAPI.auth.refreshSession()
        .then(sessionInfo => this.setSession(sessionInfo))
        .catch(error => this.setState({ loading: false, message: '', hasActiveSession: false }))
    })
  }

  setSession = (sessionInfo) => {
    let { access_token, refresh_token, expires_in } = sessionInfo
    sessionStorage.setItem('access_token', access_token)
    sessionStorage.setItem('refresh_token', refresh_token)
    sessionStorage.setItem('expiry_time', new Date().getTime() + (expires_in * 1000))
    this.setState({ hasActiveSession: true })
  }

  clearSession = () => {
    sessionStorage.clear();
    this.setState({ hasActiveSession: false })
  }
}