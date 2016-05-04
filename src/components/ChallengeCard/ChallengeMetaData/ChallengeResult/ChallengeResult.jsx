import React, { PropTypes } from 'react'

require('./ChallengeResult.scss')

const ChallengeResult = ({ results }) => {
  return (
    <div>Results: {results}</div>
  )
}

ChallengeResult.propTypes = {
  results: PropTypes.boolean
}

export default ChallengeResult
