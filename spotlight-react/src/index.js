import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.scss';
import App from './App';

const apollo = new ApolloClient({
    uri: 'https://spotlight-server-1def133064.herokuapp.com'
})
const Root = () => (
    <ApolloProvider client={ apollo }>
        <App />
    </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
