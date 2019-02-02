import gql from 'graphql-tag'

export default {
    spotify: {
        GET_CURRENT_USER: gql`
            query currentUser {
                user @rest(type: "User", path: "/me", endpoint: "v1") {
                    id,
                    displayName: display_name,
                    images @type(name: "UserImages") {
                        url
                    }
                }
            }
        `,
        GET_USER_PLAYLISTS: gql`
            query userPlaylists {
                playlists @rest(type: "Playlist", path: "/me/playlists", endpoint: "items") {
                    id,
                    name,
                    public,
                    images,
                    tracks @type(name: "PlaylistTrackInfo") {
                        total,
                        href
                    }
                }
            }
        `,
        GET_PLAYLIST_WITH_TRACKS: gql`
            query playlist($playlistId: Int!) {
                playlist(id: $playlistId) @rest(type: "Playlist", path: "/playlists/{args.id}", endpoint: "v1") {
                    id,
                    name,
                    public,
                    images,
                    owner @type(name: "User") {
                        id,
                        displayName: display_name,
                        href
                    },
                    tracks @type(name: "PlaylistTrackInfo") {
                        total,
                        href,
                        items @type(name: "PlaylistTrack") {
                            addedAt: added_at
                            track @type(name: "Track") {
                                id,
                                name,
                                trackNumber: track_number,
                                durationMs: duration_ms,
                                isExplicit: explicit,
                                artists,
                                album,
                                popularity
                            }
                        }
                    } 
                }
            }
        `
    }
}