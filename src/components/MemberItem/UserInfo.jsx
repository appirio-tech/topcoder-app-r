import React, { PropTypes } from 'react'
import _ from 'lodash'
import UserAvatar from '../User/UserAvatar'
import UserBio from '../User/UserBio'
import UsernameAndDetails from '../User/UsernameAndDetails'

require('./UserInfo.scss')

const UserInfo = ({ user, userPlace, withBio }) => {
  let userBio

  if (withBio && user.description) {
    userBio = <UserBio bio={user.description}/>
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

        <UsernameAndDetails
          username={user.handle}
          country={user.competitionCountryCode}
          numWins={user.wins}
          memberSince={user.createdAt}
        />
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
