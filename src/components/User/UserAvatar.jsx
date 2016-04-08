import React, { PropTypes } from 'react'
import LevelDesignatorIcon from '../../icons/LevelDesignatorIcon'
import { memberLevelByRating } from '../../helpers'

require('./UserAvatar.scss')

const UserAvatar = ({ showLevel, rating, photoURL }) => {
  let levelIcon

  if (showLevel) {
    levelIcon = <LevelDesignatorIcon level={memberLevelByRating(rating)} height={'17px'} width={'17px'}/>
  }

  const backgroundImageUrl = {
    backgroundImage: `url(${photoURL}), url(${require('./default-avatar.svg')})`
  }

  return (
    <div className="user-avatar" style={backgroundImageUrl}>
      {levelIcon}
    </div>
  )
}


UserAvatar.propTypes = {
  showLevel: PropTypes.bool,
  rating   : PropTypes.number,
  photoURL : PropTypes.string
}

export default UserAvatar
