import React from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import Queries from '@/util/gql-queries'
import './sidebar-styles.scss'

export default compose(
    graphql(Queries.spotify.GET_CURRENT_USER, { name: 'userFetch' }),
    graphql(Queries.spotify.GET_USER_PLAYLISTS, { name: 'playlistsFetch' }),
)( (props) => {
    let hasError = props.userFetch.error || props.playlistsFetch.error
    let isLoading = props.userFetch.loading || props.playlistsFetch.loading
    let user = props.userFetch.user
    let playlists = props.playlistsFetch.playlists
    if(!hasError && !isLoading) { return(
        <div id="sidebar">
            <div className="sidebar__user">
                <div className="user__image-container">
                    <img src={ user.images[0].url } alt="spotify profile" />
                </div>
                <h2>
                    <Link to={ `/user/${user.id}`}><div className="link">{ user.displayName }</div></Link>
                </h2>
            </div>
            <h3>Playlists</h3>
            <ul className="sidebar__playlists">
                { playlists.map((playlist) => (
                    <li key={ playlist.id }>
                        <Link to={ `/playlist/${playlist.id}` } className="link">{ playlist.name }</Link>
                    </li>
                ))}
            </ul>
            <hr></hr>
            <h3>Friends</h3>
            <ul>
            </ul>
        </div>
    )} else { return(
        <div id="sidebar">
            sidebar
        </div>
    )}
})