import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import Particles from 'react-particles-js'

import cache from '@/util/cache'
import getSpotifyLink from '@/util/spotify-link'

import Navbar from '@/components/ui/navbar'
import Sidebar from '@/components/ui/sidebar'

import ProfilePage from '@/pages/Profile'
import PlaylistPage from '@/pages/Playlist'

export default class AuthorizedApp extends Component {
  state = {
    apollo: null
  }

  componentWillMount() {
    _initializeApollo(this)
    console.log('mounting app')
  }

  render() {
      return (
        <ApolloProvider client={ this.state.apollo }>
            <div className="layout" id="layout">
              <Navbar onLogout={ this.props.onLogout }/>
              <div className="columns is-gapless">
                <div className="column is-one-fifth">
                  <Sidebar />
                </div>
                <div className="column is-four-fifths" id="content">
                    <Switch>
                      <Route exact path="/user" render={ props => <ProfilePage client={ this.state.apollo } { ...props } /> } />
                      <Route path="/playlist/:id" render={ props => <PlaylistPage client={ this.state.apollo } { ...props } /> } />
                      <Route render={ props => <ProfilePage client={ this.state.apollo } { ...props } /> } />
                    </Switch>
                </div>
              </div>
            </div>
            <Particles params={{ 
              particles: {
                color: { value: '#57B560' },
                size: { value: 50, random: true },
                line_linked: { enable: false },
                move: {
                  direction: 'top',
                  random: true,
                  speed: 1,
                  out_mode: 'out'
                }
              },
              // interactivity: {
              //   onhover: { enable: false }
              // }
            }} className="particles" />
        </ApolloProvider>
      )
  }
}

function _initializeApollo(app) {
  app.setState({
    apollo: new ApolloClient({
      uri: 'https://spotlight-server-1def133064.herokuapp.com/prisma-server/dev',
      cache,
      link: getSpotifyLink()
    })
  })
}