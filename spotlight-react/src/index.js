import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import UnauthorizedApp from '@/UnauthorizedApp';
import AuthorizedApp from '@/AuthorizedApp'

import AuthHandler from '@/util/auth-handler'
import './index.scss';

class Root extends React.Component {
    state = {
        hasActiveSession: false,
        loading: null
    }

    componentWillMount() {
        if(AuthHandler.hasActiveSession()) {
            this.setState({ hasActiveSession: true })
        } else {
            AuthHandler.refreshSession()
                .then(hasActiveSession => this.setState({ hasActiveSession }))
                .catch(error => console.error(error))
        }
    }

    render() {
        return(
                <Router>
                {
                    this.state.hasActiveSession 
                    ? <AuthorizedApp 
                        $loading={ Function.prototype }
                        onLogout={ this.onLogout } />
                    : <UnauthorizedApp 
                        $loading={ Function.prototype }
                        onAuth={ this.onAuth } />
                }
                </Router>
        )
    }

    onAuth = (sessionInfo) => {
        AuthHandler.setSession(sessionInfo)
        this.setState({ hasActiveSession: true })
    } 

    onLogout = () => {
        this.setState({ hasActiveSession: false })
        AuthHandler.clearSession();
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
