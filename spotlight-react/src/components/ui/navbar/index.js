import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'bloomer'
import _debounce from 'lodash.debounce'

import './navbar-styles.scss'

class Navbar extends Component {
    state = {
        isSearching: false
    }

    render() {
        return (
            <nav>
                <p className={ `control has-icons-left${this.state.isSearching ? ' is-loading' : ''}` }>
                    <input className="input is-rounded" id="search" type="text" placeholder="search" onChange={ this.search } />
                    <span className="icon is-left">
                        <i className="fa fa-search" />
                    </span>
                </p>
                <Button isLink isOutlined onClick={ this.logout }>Log out</Button>
            </nav>
        )
    }

    logout = () => {
        console.log('logging out')
        sessionStorage.clear()
        this.props.history.push('/')
        this.props.onLogout()
    }

    search = _debounce(() => {
        console.log('searching');
        this.setState({ isSearching: true }, () => {
            setTimeout(() => {
                this.setState({ isSearching: false })
            }, 1000)
        })
    }, 500)
}

export default withRouter(Navbar);