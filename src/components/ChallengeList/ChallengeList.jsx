import React, { PropTypes } from 'react'
import ChallengeCard from '../ChallengeCard/ChallengeCard'

require('./ChallengeList.scss')

const ChallengeList = ({ challenges }) => (
  <div className="challenge-list">
    {challenges.map(challenge =>
      <ChallengeCard key={challenge.id} challenge={challenge} />
    )}
  </div>
)

ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ChallengeList
