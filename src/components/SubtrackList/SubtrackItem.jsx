import { PropTypes } from 'react'

import TrophyIcon from '../../icons/TrophyIcon'
import classNames from 'classnames'

const SubtrackItem = ({ subtrack }) => {
  const subtrackStyles = classNames(
    'subtrack-item',
    'track-' + subtrack.track
  )

  return (
    <span className={subtrackStyles}>
      <span className="subtrack-wins">
        <TrophyIcon fill={'level'} />

        <span>{subtrack.rating || subtrack.wins}</span>
      </span>

      <span className="track-code">{subtrack.code}</span>
    </span>
  )
}

SubtrackItem.propTypes = {
  subtrack: PropTypes.object.isRequired
}

export default SubtrackItem
