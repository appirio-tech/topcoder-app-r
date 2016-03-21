import React, { PropTypes } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { memberLevelByRating, singlePluralFormatter } from '../../helpers'
import ISOCountries from '../../helpers/ISOCountries'

import DefaultUserAvatarIcon from '../../icons/DefaultUserAvatarIcon'
import LevelDesignatorIcon from '../../icons/LevelDesignatorIcon'
require('./UserInfo.scss')

const UserInfo = ({ user, userPlace, exactMatch }) => {
  const memberSince = moment(user.createdAt).format('MMM YYYY')

  const countryObject = _.find(ISOCountries, {alpha3: user.competitionCountryCode})
  const userCountry = countryObject ? countryObject.name : ''
  // FIXME: common country name should come directly from backend
  // const userCountry = user.competitionCountryName

  const numberWins = singlePluralFormatter(user.wins, 'win')


  // FIXME: Move nested HTML into separate React components!!!

  let userBio
  if (exactMatch && user.description) {
    userBio = (
      <div className="user-bio">
        {user.description}
      </div>
    )
  }
  const userRating = user.maxRating ? user.maxRating.rating : 0
  const userLevel = memberLevelByRating(userRating)

  let userImage
  if (user.photoURL) {
    userImage = <img className="user-image" src={user.photoURL} />
  } else {
    userImage = <DefaultUserAvatarIcon width={'60px'} height={'60px'}/>
  }

  return (
    <div className="user-info">
      <div className="user-profile">
        {userPlace !== undefined ? <div className="list-number">{userPlace + 1}</div> : ''}

        <div className="user-avatar">
          {userImage}

          <div className="user-rank-wrap">
            <LevelDesignatorIcon level={userLevel}/>
          </div>
        </div>

        <div className="username-and-details">
          <div className="username">
            <a href={'https://www.topcoder-dev.com/members/' + user.handle}>{user.handle}</a>
          </div>

          <div className="user-details">
            <div className="user-details-1">
              <span className="user-country">{userCountry}</span>

              <span className="total-wins">{' ' + numberWins}</span>
            </div>

            <div className="member-since">
              Member since {memberSince}
            </div>
          </div>
        </div>
      </div>

      {userBio}
    </div>
  )
}

UserInfo.propTypes = {
  user     : PropTypes.object.isRequired,
  userPlace: PropTypes.number,
  showBio  : PropTypes.bool
}

export default UserInfo
