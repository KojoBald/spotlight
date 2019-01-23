import React, { Component } from 'react'
import './playlist-styles.scss'

export default class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.playlist.name,
            numTracks: props.playlist.tracks.total
        }
    }

    render() {
        return(
            <div className="playlist">
                <h2>{ this.state.name }</h2>
                <p>{ this.state.numTracks } tracks</p>

                <img className="playlist__image" alt="playlist cover" src={ this.props.playlist.images[0].url } />
            </div>
        )
    }
}