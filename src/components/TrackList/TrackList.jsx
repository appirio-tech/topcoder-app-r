import React, { PropTypes } from 'react'
import TrackItem from './TrackItem'

require('./TrackList.scss')

const TrackList = ({ tracks }) => {
  if (tracks.length) {
    tracks = tracks.map(t => <TrackItem key={t} track={t} />)
  } else {
    tracks = <TrackItem track={''} />
  }

  return (
    <div className="track-list">
      {tracks}
    </div>
  )
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired
}

export default TrackList
