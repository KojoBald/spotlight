import { InMemoryCache } from 'apollo-boost'

const cache = new InMemoryCache()

export default cache

const defaults = {
    user: {
        birthdate: '',
        country: '',
        display_name: '',
        email: '',
        images: [ { url: '' } ]
    },
    userPlaylists: []
}

const resolvers = {
    
}

const typeDefs = {

}

export {
    defaults,
    resolvers,
    typeDefs
}