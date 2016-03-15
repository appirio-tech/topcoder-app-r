import React, { PropTypes } from 'react'
import classNames from 'classnames'

require('./track-item.scss')

const TrackItem = ({ track }) => {
  const subtrackStyles = classNames(
    'user-track-item',
    { [`track-${track.toLowerCase()}`]: track.length },
    { 'no-track': !track.length }
  )

  const trackMap = {
    DEVELOP     : 'Developer',
    DESIGN      : 'Designer',
    DATA_SCIENCE: 'Data Scientist'
  }

  track = trackMap[track]

  return (
    <span className={subtrackStyles}>
      <span className="track-name">{track || 'No track'}</span>
    </span>
  )
}

TrackItem.propTypes = {
  track: PropTypes.string.isRequired
}

export default TrackItem
