import React, { PropTypes } from 'react'
import DefaultUserAvatarIcon from '../../icons/DefaultUserAvatarIcon'
import LevelDesignatorIcon from '../../icons/LevelDesignatorIcon'
import { memberLevelByRating } from '../../helpers'

require('./UserAvatar.scss')

const UserAvatar = ({ showLevel, rating, photoURL }) => {
  let levelIcon

  if (showLevel) {
    levelIcon = <LevelDesignatorIcon level={memberLevelByRating(rating)}/>
  }

  let defaultUserImage
  let backgroundImageUrl

  if (photoURL) {
    backgroundImageUrl = { backgroundImage: `url(${photoURL})` }
  } else {
    defaultUserImage = <DefaultUserAvatarIcon width={'60px'} height={'60px'}/>
  }

  return (
    <div className="user-avatar" style={backgroundImageUrl}>
      {levelIcon}

      {defaultUserImage}
    </div>
  )
}


UserAvatar.propTypes = {
  showLevel: PropTypes.bool,
  rating   : PropTypes.number,
  photoURL : PropTypes.string
}

export default UserAvatar
