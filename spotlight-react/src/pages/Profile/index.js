import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import Playlist from '@/components/playlist'
import InfoHeader from '@/components/info-header'

import SpotifyAPI from '@/util/spotify-api'
import Queries from  '@/util/gql-queries'

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
    
    componentWillMount = () => {
        SpotifyAPI.requestProfileData()
            .then(user => this.setState({ user }))
            .catch(error => console.error(error))
    }

    render() {
        let {
            display_name,
            email,
            images
        } = (this.state.user ? this.state.user : LOADING_USER_OBJECT)
        return(
            <Query query={ Queries.spotify.GET_USER_PLAYLISTS }>
            { ({ data, loading, error }) => {
                console.log(data, loading, error);
                if(!error) return(
                    <section className="profile">
                        <InfoHeader imgRound imgSrc={ images[0].url } imgAlt="spotify profile" header={ display_name } text={ email }/>
                        <div className="profile__playlists">
                            <h3>{ display_name }'s Playlists</h3>
                            <ul className="playlists__items">
                            { data.playlists && data.playlists.map((playlist, index) => (
                                <Link to={`/playlist/${playlist.id}`} key={ playlist.id }>
                                    <li className="playlists__item" key={ `playlist:${index}` }>
                                        <Playlist playlist={ playlist }/>
                                    </li>
                                </Link>
                            ))}
                            </ul>
                        </div>
                    </section>
            )}}
            </Query>
        )
    }
}