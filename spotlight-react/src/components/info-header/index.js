import React from 'react'
import './info-header-styles.scss'

export default (props) => (
    <div className="info">
        <div className={ `info__picture-container ${props.imgRound ? 'round' : ''}` }>
            <img src={ props.imgSrc } alt={ props.imgAlt || 'info'} className="info__picture" />
        </div>
        <div>
            <h2 className="info__header">{ props.header }</h2>
            <p className="info__text">{ props.text }</p>
        </div>
    </div>
)