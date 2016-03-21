import React from 'react'

require('./LoadingIndicator.scss')

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <img src={require('./ripple.svg')} alt="Loading..."/>
    </div>
  )
}

export default LoadingIndicator
