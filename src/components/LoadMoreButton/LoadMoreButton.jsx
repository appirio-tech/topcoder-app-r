import React, { PropTypes } from 'react'

require('./LoadMoreButton.scss')

const LoadMoreButton = ({ callback }) => {
  return (
    <button className="load-more" onClick={callback}>
      Load More
    </button>
  )
}

LoadMoreButton.propTypes = {
  callback: PropTypes.func.isRequired
}

export default LoadMoreButton
