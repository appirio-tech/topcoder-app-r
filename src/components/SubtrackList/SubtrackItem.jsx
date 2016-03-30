import React, { PropTypes } from 'react'
import {
  getSubtrackAbbreviation,
  getRoundedPercentage,
  numberWithCommas
} from '../../helpers'

import TrophyIcon from '../../icons/TrophyIcon'
import classNames from 'classnames'
require('./SubtrackItem.scss')

const SubtrackItem = ({ subtrack }) => {
  const subtrackStyles = classNames(
    'subtrack-item',
    'track-' + subtrack.track
  )

  const statType = subtrack.stat.type
  let statValue  = subtrack.stat.value

  statValue = statType === 'fulfillment'
    ? getRoundedPercentage(statValue)
    : numberWithCommas(statValue)

  const trophyIcon = statType === 'wins' ? <TrophyIcon /> : null

  return (
    <span className={subtrackStyles}>
      <span className="subtrack-wins">
        {trophyIcon}

        <span>{statValue}</span>
      </span>

      <span className="track-code">{getSubtrackAbbreviation(subtrack.name)}</span>
    </span>
  )
}

SubtrackItem.propTypes = {
  subtrack: PropTypes.object.isRequired
}

export default SubtrackItem
