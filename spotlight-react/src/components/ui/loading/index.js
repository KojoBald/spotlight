import React from 'react'
import './loading-styles.scss'

export default (props) => (
    <div id="loading">
        <div className="lds-css ng-scope">
            <div className="lds-spin"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
        </div>
        <h2>{ props.message }</h2>
    </div>
)