import { PropTypes } from 'react'
import TrackItem from './TrackItem'

require('./track-list.scss')

const TrackList = ({ tracks }) => {
  return (
    <div className="track-item-list">
      {tracks.map(t => <TrackItem key={t} track={t} />)}
    </div>
  )
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired
}

export default TrackList
