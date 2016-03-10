import { PropTypes } from 'react'
// import _ from 'lodash'
import moment from 'moment'
import { memberLevel } from '../../helpers'
// import ISOCountries from '../../helpers/ISOCountries'


import DefaultUserAvatarIcon from '../../icons/DefaultUserAvatarIcon'
import LevelDesignatorIcon from '../../icons/LevelDesignatorIcon'
import classNames from 'classnames'
require('./user-info.scss')

const UserInfo = ({ user, userPlace, exactMatch }) => {
  // FIXME: Show level dynamically, not just hardcoded to 5
  // FIXME: Show country name, not code
  const memberSince = moment(user.createdAt).format('MMM YYYY')

  // const countryObject = _.find(ISOCountries, {alpha3: user.competitionCountryCode})
  // can remove if backend fixes country object?
  // const userCountry = countryObject ? countryObject.name : ''
  const userCountry = user.competitionCountryName

  let numberWins

  switch (user.wins) {
  case 0:
  // Remove these when backend returns wins property for every member
  case undefined:
  case null:
    numberWins = ''
    break
  case 1:
    numberWins = ' 1 win'
    break
  default:
    numberWins = ` ${user.wins} wins`
  }

  let userBio
  if (exactMatch && user.description) {
    userBio = (
      <div className="user-bio">
        {user.description}
      </div>
    )
  }
  const userRating = user.maxRating ? user.maxRating.rating : 0
  const userRankStyles = classNames(
    'user-rank-wrap',
    `level-${memberLevel(userRating)}`
  )

          // <svg className="default-avatar"><use xlinkHref="#ico-user-default"></use></svg>
  return (
    <div className="user-info">
      <div className="user-profile">
        {userPlace !== undefined ? <div className="list-number">{userPlace + 1}</div> : ''}

        <div className="user-avatar">
          <DefaultUserAvatarIcon width={'60px'} height={'60px'}/>

          <img className="user-image" src={user.photoURL} />

          <div className={userRankStyles}>
            <LevelDesignatorIcon className="user-rank"/>
          </div>
        </div>

        <div className="username-and-details">
          <div className="username">{user.handle}</div>

          <div className="user-details">
            <div className="user-details-1">
              <span className="user-country">{userCountry}</span>

              <span className="total-wins">{numberWins}</span>
            </div>

            <div className="member-since">
              Member since <span className="member-since-mm-yyyy">{memberSince}</span>
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
