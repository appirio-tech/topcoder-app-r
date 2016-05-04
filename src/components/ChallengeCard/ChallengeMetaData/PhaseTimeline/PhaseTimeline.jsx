import React, { PropTypes } from 'react'

require('./PhaseTimeline.scss')

const PhaseTimeline = ({ phases }) => {
  const phaseName = phases[0].type

  return (
    <div>{phaseName}</div>
  )
}

PhaseTimeline.propTypes = {
  phases: PropTypes.array.isRequired
}

export default PhaseTimeline
