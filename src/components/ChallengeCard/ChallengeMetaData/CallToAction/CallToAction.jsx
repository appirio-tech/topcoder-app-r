import React, { PropTypes } from 'react'

require('./CallToAction.scss')

const CallToAction = ({ phases, users }) => {
  const phase = phases[0] ? phases[0].type : null
  const user = users[0] ? users[0].handle : null

  return (
    <div>{phase} {user}</div>
  )
}

CallToAction.propTypes = {
  phases: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default CallToAction
