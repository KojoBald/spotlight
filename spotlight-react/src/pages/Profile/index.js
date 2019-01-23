import React, { Component } from 'react'
import Loading from '@/components/loading'
import Playlist from '@/components/playlist'
import SpotifyAPI from '@/spotify-api'

import './profile-styles.scss'

const LOADING_USER_OBJECT = {
    birthdate: '',
    country: '',
    display_name: '',
    email: '',
    images: [ { url: '' } ]
}

export default class Profile extends Component {
    state = {
        user: null,
        playlists: []
    }
    
    componentDidMount = () => {
        SpotifyAPI.requestProfileData()
            .then(user => this.setState({ user }))
            .catch(error => console.error(error))

        SpotifyAPI.requestUserPlaylists()
            .then(({ items }) => this.setState({ playlists: items }))
            .catch(error => console.error(error))
    }

    render() {
        let {
            birthdate,
            country,
            display_name,
            email,
            images
        } = (this.state.user ? this.state.user : LOADING_USER_OBJECT)
        return(
            <>
            <section className="profile">
                <div className="profile__picture-container">
                    <img src={ images[0].url } alt="spotify profile" className="profile__picture" />
                </div>
                <h2 className="profile__display-name">{ display_name }</h2>
                <p className="profile__email">{ email }</p>
                <hr></hr>
                <ul className="profile__playlists">
                    { this.state.playlists.map((playlist, index) => (
                        <li key={ `playlist:${index}` }>
                            <Playlist playlist={ playlist }/>
                        </li>
                    ))}
                </ul>
            </section>
            { this.state.user === null && <Loading message="loading profile"/> }
            </>
        )
    }
}