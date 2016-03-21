import React, { PropTypes } from 'react'
import ChallengeItem from '../ChallengeItem/ChallengeItem'

require('./ChallengeList.scss')

const ChallengeList = ({ challenges }) => (
  <div className="challenge-list">
    {challenges.map(challenge =>
      <ChallengeItem key={challenge.id} challenge={challenge} />
    )}
  </div>
)

ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ChallengeList
