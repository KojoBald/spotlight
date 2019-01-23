import React, { Component } from 'react'
import qs from 'query-string'
import SpotifyAPI from '@/spotify-api'

import Loading from '@/components/loading'

export default class AuthCallback extends Component {
    componentDidMount = () => {
        let params = qs.parse(this.props.location.search);
        SpotifyAPI.auth.requestSessionCredentials(params.code)
            .then(sessionInfo => {
                this.props.history.push('/user')
                this.props.onSuccess(sessionInfo);
            }).catch(error => {
                console.error(error)
            })
    }

    render() {
        return (
            <Loading message="Authorizing" />
        )
    }
}