import React, { PropTypes } from 'react'
import ChallengePrizes from './ChallengePrizes/ChallengePrizes'
import ChallengeActivity from './ChallengeActivity/ChallengeActivity'

require('./ChallengeInfoSecondary.scss')

const ChallengeInfoSecondary = ({ challenge }) => {
  const { submissions, registrants } = challenge

  return (
    <div className="challenge-info-secondary">
      <ChallengePrizes prizes={challenge.prizes}/>

      <ChallengeActivity submissions={submissions} registrants={registrants}/>
    </div>
  )
}

ChallengeInfoSecondary.propTypes = {
  challenge: PropTypes.object.isRequired
}

export default ChallengeInfoSecondary
