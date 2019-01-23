import axios from 'axios'

const AUTH_URL = 'http://localhost:8080/auth'
const SPOTIFY_URL = 'https://api.spotify.com/v1'

export default {
    auth: {
        redirectForCode() {
            window.location.href = `${AUTH_URL}`
        },
        async requestSessionCredentials(code) {
           return new Promise((resolve, reject) => {
               axios.get(`${AUTH_URL}?code=${code}`)
               .then(response => resolve(response.data))
               .catch(error => reject(error))
           })
        },
        async refreshSession() {
            return new Promise((resolve, reject) => {
                let refreshToken = sessionStorage.getItem('refresh_token')
                if(!refreshToken) return reject('no session to refresh')

                axios.get(`${AUTH_URL}?refresh_token=${refreshToken}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
            })
        }
    },
    async requestProfileData() {
        return new Promise((resolve, reject) => {
            let { access_token } = sessionStorage
            axios.get(`${SPOTIFY_URL}/me`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }).then(response => resolve(response.data))
            .catch(error => reject(error))
        })
    },
    async requestUserPlaylists() {
        return new Promise((resolve, reject) => {
            let { access_token } = sessionStorage
            axios.get(`${SPOTIFY_URL}/me/playlists`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }).then(response => resolve(response.data))
            .catch(error => reject(error))
        })
    }
}