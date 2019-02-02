import React from 'react'
import './playlist-styles.scss'

export default ({ playlist }) => (
    <div className="playlist">
        <div className="playlist-name-wrapper">
            <h2 className="playlist__name">{ playlist.name }</h2>
        </div>
        <ul className="playlist__info">
            <li>
                <span className="fa fa-music" title="tracks"></span>
                {  playlist.tracks.total }
            </li>
            <li>
                <span className="fa fa-users" title="followers"></span>
                {/* { this.state.numFollowers } */} 1
            </li>
        </ul>
        <img className="playlist__image" alt="playlist cover" src={ playlist.images[0].url } />
    </div>
)