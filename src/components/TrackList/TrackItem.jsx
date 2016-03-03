import { PropTypes } from 'react'
import classNames from 'classnames'

const TrackItem = ({ track }) => {
  const subtrackStyles = classNames(
    'track-item',
    'track-' + track.toLowerCase()
  )

  const trackMap = {
    DEVELOP     : 'Developer',
    DESIGN      : 'Designer',
    DATA_SCIENCE: 'Data Scientist'
  }

  track = trackMap[track]

  return <span className={subtrackStyles}>{track}</span>
}

TrackItem.propTypes = {
  track: PropTypes.string.isRequired
}

export default TrackItem
