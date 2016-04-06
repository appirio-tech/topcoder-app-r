import React, { PropTypes } from 'react'

require('./ChallengeInfoSecondary.scss')

const ChallengeInfoSecondary = ({ challenge }) => {
  return (
    <div className="challenge-info-secondary">
      {challenge.prizes ? '$' + challenge.prizes[0].amount : 'No prize'}
    </div>
  )
}

ChallengeInfoSecondary.propTypes = {
  challenge: PropTypes.object.isRequired
}

export default ChallengeInfoSecondary
