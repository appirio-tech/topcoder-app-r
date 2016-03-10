import { PropTypes } from 'react'
import classNames from 'classnames'
import TrophyIcon from '../../icons/TrophyIcon'


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
      <TrophyIcon fill={'tomato'} />
    </span>
  )
}

TrackItem.propTypes = {
  track: PropTypes.string.isRequired
}

export default TrackItem
