import { PropTypes } from 'react'
import RobotIcon from '../../icons/RobotIcon'

require('./no-results.scss')

const NoResults = ({ entry }) => {
  return (
    <div className="no-results">
      <RobotIcon />

      <p>Sorry, no results found for <span>{entry}</span></p>
    </div>
  )
}

NoResults.propTypes = {
  entry: PropTypes.string.isRequired
}

export default NoResults
