import { PropTypes } from 'react'
import classNames from 'classnames'

const SubtrackItem = ({ subtrack }) => {
  const subtrackStyles = classNames(
    'subtrack-item',
    'track-' + subtrack.track
  )

  return (
    <span className={subtrackStyles}>
      <span className="subtrack-wins">
        <svg className="subtrack-win-icon">
          <use xlinkHref="#trophy-cup"></use>
        </svg>

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
