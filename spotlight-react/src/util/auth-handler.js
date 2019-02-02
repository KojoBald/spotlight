import SpotifyAPI from '@/util/spotify-api'

export default {
    hasActiveSession() {
        let { access_token, expiry_time } = sessionStorage
        let now = new Date().getTime()
        return (access_token && now < expiry_time)
    },
    async refreshSession() {
        return new Promise((resolve, reject) => {
            let refresh_token = sessionStorage.getItem('refresh_token')
            if(!refresh_token) return reject('no session to refresh')

            SpotifyAPI.auth.refreshSession(refresh_token)
                .then(sessionInfo => {
                    this.setSession(sessionInfo)
                    resolve(true)
                })
                .catch(error => reject(error))
        })
    },
    setSession(sessionInfo) {
        let { access_token, refresh_token, expires_in } = sessionInfo
        sessionStorage.setItem('access_token', access_token)
        sessionStorage.setItem('refresh_token', refresh_token)
        sessionStorage.setItem('expiry_time', new Date().getTime() + (expires_in * 1000))
    },
    clearSession()  {
        sessionStorage.clear();
    }
}