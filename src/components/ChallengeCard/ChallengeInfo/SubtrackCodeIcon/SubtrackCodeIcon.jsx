import React, { PropTypes } from 'react'
import { getSubtrackAbbreviation,
  mapTrackConstantsToClassNames } from '../../../../helpers'

import classNames from 'classnames'
require('./SubtrackCodeIcon.scss')

const SubtrackCodeIcon = ({ track, subtrack }) => {
  const subtrackCodeStyles = classNames(
    'subtrack-code-icon',
    mapTrackConstantsToClassNames(track)
  )

  const subtrackCode = getSubtrackAbbreviation(subtrack)

  return (
    <div className={subtrackCodeStyles}>
      {subtrackCode}
    </div>
  )
}

SubtrackCodeIcon.propTypes = {
  track   : PropTypes.string.isRequired,
  subtrack: PropTypes.string.isRequired
}

export default SubtrackCodeIcon
