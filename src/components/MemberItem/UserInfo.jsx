import React, { PropTypes } from 'react'
import _ from 'lodash'
import moment from 'moment'
import UserAvatar from '../User/UserAvatar'
import ISOCountries from '../../helpers/ISOCountries'
import { singlePluralFormatter } from '../../helpers'

require('./UserInfo.scss')

const UserInfo = ({ user, userPlace, withBio }) => {
  const memberSince = moment(user.createdAt).format('MMM YYYY')

  const countryObject = _.find(ISOCountries, {alpha3: user.competitionCountryCode})
  const userCountry = countryObject ? countryObject.name : ''

  const numberWins = singlePluralFormatter(user.wins, 'win')

  // FIXME: Move nested HTML into separate React components!!!

  let userBio

  if (withBio && user.description) {
    userBio = (
      <div className="user-bio">
        {user.description}
      </div>
    )
  }

  if (_.isFinite(userPlace)) {
    userPlace = <div className="list-number">{userPlace + 1}</div>
  }

  return (
    <div className="user-info">
      <div className="user-profile">
        {userPlace}

        <UserAvatar
          showLevel
          rating={user.maxRating.rating}
          photoURL={user.photoURL}
        />

        <div className="username-and-details">
          <div className="username">
            {user.handle}
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
