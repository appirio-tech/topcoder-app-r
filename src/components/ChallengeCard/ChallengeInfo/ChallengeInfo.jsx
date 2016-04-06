import React, { PropTypes } from 'react'
import SubtrackCodeIcon from './SubtrackCodeIcon/SubtrackCodeIcon'

require('./ChallengeInfo.scss')

const ChallengeInfo = ({ challenge }) => {
  return (
    <div className="challenge-info">
      <SubtrackCodeIcon subtrack={challenge.subtrack}/>

      <h1>{challenge.name}</h1>
    </div>
  )
}

ChallengeInfo.propTypes = {
  challenge: PropTypes.object.isRequired
}

export default ChallengeInfo
