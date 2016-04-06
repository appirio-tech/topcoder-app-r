import React, { PropTypes } from 'react'

require('./ChallengeMetaData.scss')

const ChallengeMetaData = ({ challenge }) => {
  return (
    <div className="challenge-meta-data">
      {challenge.phases[0].typeString}
    </div>
  )
}

ChallengeMetaData.propTypes = {
  challenge: PropTypes.object.isRequired
}

export default ChallengeMetaData
