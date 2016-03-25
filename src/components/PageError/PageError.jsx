import React from 'react'
import RobotIcon from '../../icons/RobotIcon'

require('./PageError.scss')

const PageError = () => {
  return (
    <div className="page-error">
      <RobotIcon />

      <p>Oops! There was an error.</p>
    </div>
  )
}

export default PageError
