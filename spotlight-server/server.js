require('dotenv').config();

const app = require('express')();
const axios = require('axios');
const qs = require('querystring');

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SCOPES = 'user-read-birthdate user-read-email user-read-private'

app.use(require('./middleware/headers'))

app.get('/auth', (req, res) => {
    if(req.query.code) {
        requestSpotifyAccessToken(req.query.code)
        .then(response => res.status(200).json(response.data))
        .catch(error => res.status(500).json(error.response.data));
    } else if(req.query.refresh_token) {
        refreshSpotifyAccessToken(req.query.refresh_token)
        .then(response => res.status(200).json(response.data))
        .catch(error => res.status(500).json(error.response.data));
    } else {
        console.log('getting spotify access code');
        res.redirect(`${AUTH_URL}?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPES}&show_dialog=true`);
    }
});

async function requestSpotifyAccessToken(code) {
    console.log('requesting spotify access token')
    return axios.post(TOKEN_URL, qs.stringify({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': process.env.REDIRECT_URI
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${new Buffer(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`
        }
    });
}

async function refreshSpotifyAccessToken(refreshToken) {
    console.log('refreshing spotify session token')
    return axios.post(TOKEN_URL, qs.stringify({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${new Buffer(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`
        }
    })
}

app.listen(8080, () => console.log('App is listening'));