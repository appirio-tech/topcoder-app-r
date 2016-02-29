import { PropTypes } from 'react'

const NoResults = ({ entry }) =>
  <div>Sorry, no results found for {entry}</div>

NoResults.propTypes = {
  entry: PropTypes.string.isRequired
}

export default NoResults
