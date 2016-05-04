import React, { PropTypes } from 'react'

require('./ChallengeActivity.scss')

const ChallengeActivity = ({ submissions, registrants }) => {
  return (
    <div>
      <div>Submissions: {submissions}</div>
      <div>Registrants: {registrants}</div>
    </div>
  )
}

ChallengeActivity.propTypes = {
  submissions: PropTypes.number.isRequired,
  registrants: PropTypes.number.isRequired
}

export default ChallengeActivity
