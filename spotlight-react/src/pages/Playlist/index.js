import React, { Component } from 'react'
import { Query } from 'react-apollo'

import InfoHeader from '@/components/info-header'

import Queries from '@/util/gql-queries'
import formatDate from '@/util/format-date'
import loadingSVG from '@/assets/loading.svg'

import './playlist-styles.scss'

export default class PlaylistPage extends Component {
    render() {
        let playlistId = this.props.match.params.id
        return(
            <Query query={ Queries.spotify.GET_PLAYLIST_WITH_TRACKS } variables={{ playlistId }}>
            { ({ data: { playlist }, loading, error}) => {
                if(!error) { return(
                    <section id="playlist-page">
                        <InfoHeader imgSrc={ loading ? loadingSVG : playlist.images[0].url } imgAlt="spotify playlist" header={ loading ? 'loading' : playlist.name } text={ loading ? '' : playlist.owner.displayName } />
                        <div className="playlist__tracks">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{width: '20%'}}><span>Title</span></th>
                                        <th style={{width: '20%'}}><span>Artist</span></th>
                                        <th style={{width: '40%'}}><span>Album</span></th>
                                        <th style={{width: '10%'}}><i className="fa fa-calendar" /></th>
                                        <th style={{width: '10%'}}><i className="fa fa-clock" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                { playlist && playlist.tracks.items.map(({ addedAt, track }, index) => (
                                    <tr key={ track.id }>
                                        <td style={{width: '20%'}}><span className="link">{ track.name }</span></td>
                                        <td style={{width: '20%'}}><span className="link">{ track.artists[0].name }</span></td>
                                        <td style={{width: '40%'}}><span className="link">{ track.album.name }</span></td>
                                        <td style={{width: '10%'}}>{ formatDate(addedAt) }</td>
                                        <td style={{width: '10%'}}>{ formatMilliseconds(track.durationMs) }</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )} else { return (
                    <div>Error</div>
                )}
            }}
            </Query>
        )
    }
}

function formatMilliseconds(ms) {
    let totalSeconds = ms / 1000
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds - (minutes * 60))
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}