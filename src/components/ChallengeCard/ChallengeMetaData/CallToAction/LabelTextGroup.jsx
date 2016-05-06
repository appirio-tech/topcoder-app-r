import React, { PropTypes } from 'react'

import classNames from 'classnames'
require('./IconTextGroup.scss')

const IconTextGroup = ({ iconSource, text, header, placeIcon, linkURL, openInNewTab }) => {
  const iconTextStyles= classNames(
    'label-text-group',
    placeIcon
  )

  const icon = <img className="icon" src={iconSource}/>

  let renderedText

  if (header) {
    renderedText = (
      <div className="text">
        <span className="text-header">{header}</span>

        {text}
      </div>
    )
  } else {
    renderedText = <div className="text">{text}</div>
  }

  let iconTextGroup

  if (linkURL) {
    iconTextGroup = (
      <a
        className={iconTextStyles}
        href={linkURL}
        target={openInNewTab ? '_blank' : '_self'}
      >
        {icon}

        {renderedText}
      </a>
    )
  } else {
    iconTextGroup = (
      <div className={iconTextStyles}>
        {icon}

        {renderedText}
      </div>
    )
  }

  return iconTextGroup
}

IconTextGroup.propTypes = {
  iconSource  : PropTypes.string.isRequired,
  text        : PropTypes.string.isRequired,
  header      : PropTypes.string,
  iconPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  linkURL     : PropTypes.string,
  openInNewTab: PropTypes.boolean
}

IconTextGroup.defaultProps = {
  iconPosition: 'left',
  openInNewTab: false
}

export default IconTextGroup
