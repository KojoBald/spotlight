import React from 'react'
import { Button } from 'bloomer'
import SpotifyAPI from '@/util/spotify-api'

import './landing-styles.scss'

export default (props) => (
    <section id="landing-page">
        <Button isLink isOutlined onClick={ SpotifyAPI.auth.redirectForCode }>
            Connect to Spotify
        </Button>
    </section>
)