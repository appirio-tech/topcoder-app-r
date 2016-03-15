import React, { PropTypes } from 'react'
import TrackItem from './TrackItem'

const TrackList = ({ tracks }) => {
  if (tracks.length) {
    tracks = tracks.map(t => <TrackItem key={t} track={t} />)
  } else {
    tracks = <TrackItem track={''} />
  }

  return (
    <div className="user-tracks-list">
      {tracks}
    </div>
  )
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired
}

export default TrackList
