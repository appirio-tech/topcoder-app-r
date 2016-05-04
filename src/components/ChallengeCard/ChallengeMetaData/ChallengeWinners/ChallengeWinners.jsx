import React, { PropTypes } from 'react'

require('./ChallengeWinners.scss')

const ChallengeWinners = ({ winners }) => {
  const names = winners.map((winner) => {
    return <span>{winner.handle}</span>
  })

  return (
    <div>{names}</div>
  )
}

ChallengeWinners.propTypes = {
  winners: PropTypes.array.isRequired
}

export default ChallengeWinners
