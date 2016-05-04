import React, { PropTypes } from 'react'

require('./ChallengePrizes.scss')

const ChallengePrizes = ({ prizes }) => {
  return (
    <div>{prizes ? '$' + prizes[0].amount : 'No prize'}</div>
  )
}

ChallengePrizes.propTypes = {
  prizes: PropTypes.array.isRequired
}

export default ChallengePrizes
