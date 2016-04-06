import React, { PropTypes } from 'react'

import classNames from 'classnames'
require('./MyChallengeIndicator.scss')

const MyChallengeIndicator = ({ myChallenge }) => {
  const indicatorStyles = classNames(
    'my-challenge-indicator',
    { show: myChallenge }
  )

  return (
    <div className={indicatorStyles} />
  )
}

MyChallengeIndicator.propTypes = {
  myChallenge: PropTypes.bool.isRequired
}

export default MyChallengeIndicator

