import React, { PropTypes } from 'react'
import PhaseTimeline from './PhaseTimeline/PhaseTimeline'
import ChallengeWinners from './ChallengeWinners/ChallengeWinners'
import ChallengeResult from './ChallengeResult/ChallengeResult'
import CallToAction from './CallToAction/CallToAction'

require('./ChallengeMetaData.scss')

const ChallengeMetaData = ({ challenge }) => {
  const { phases, users } = challenge

  const challengeResult = 'hi' === challenge.z ? <ChallengeResult results/> : null
  const challengeWinners = 'h' === challenge.z ? <ChallengeWinners winners={users} /> : null

  return (
    <div className="challenge-meta-data">
      <PhaseTimeline phases={phases}/>

      {challengeResult}

      {challengeWinners}

      <CallToAction phases={phases} users={users}/>
    </div>
  )
}

ChallengeMetaData.propTypes = {
  challenge: PropTypes.object.isRequired
}

export default ChallengeMetaData
