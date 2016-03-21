import React, { PropTypes } from 'react'

require('./ChallengeItem.scss')

const ChallengeItem = ({ challenge }) => {
  console.log(challenge)
  return (
    <div>
      {challenge.name} from track {challenge.track}
    </div>
  )
}

ChallengeItem.propTypes = {
  challenge: PropTypes.object.isRequired
}

export default ChallengeItem
