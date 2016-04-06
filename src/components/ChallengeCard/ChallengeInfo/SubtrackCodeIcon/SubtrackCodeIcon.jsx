import React, { PropTypes } from 'react'
import { getSubtrackAbbreviation } from '../../../../helpers'

require('./SubtrackCodeIcon.scss')

const SubtrackCodeIcon = ({ subtrack }) => {
  const subtrackCode = getSubtrackAbbreviation(subtrack)

  return (
    <div className="subtrack-code-icon">
      {subtrackCode}
    </div>
  )
}

SubtrackCodeIcon.propTypes = {
  subtrack: PropTypes.string.isRequired
}

export default SubtrackCodeIcon
