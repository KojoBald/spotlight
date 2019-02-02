import { RestLink } from 'apollo-link-rest'

let restLink

export default () => {
    if(!restLink) {
        restLink = new RestLink({
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
            },
            endpoints: {
                v1: {
                    uri: 'https://api.spotify.com/v1',
                    responseTransformer: async res => res.json(),
                },
                items : {
                    uri: 'https://api.spotify.com/v1',
                    responseTransformer: async res => res.json().then(({ items }) => items)
                }
            }
        })
    }
    return restLink
}