import { PropTypes } from 'react'
require('./user-info.scss')

const UserInfo = ({ user, rank }) => {
  // FIXME: Show level dynamically, not just hardcoded to 5
  // FIXME: Show country name, not code
  let numberWins

  switch (user.wins) {
  case 0:
    numberWins = ''
    break
  case 1:
    numberWins = ' 1 win'
    break
  default:
    numberWins = ` ${user.wins} wins`
  }

  return (
    <div className="user-info">
      <div className="user-profile">
        {rank !== undefined ? <div className="list-number">{rank + 1}</div> : ''}

        <div className="user-avatar">
          <svg className="default-avatar"><use xlinkHref="#ico-user-default"></use></svg>

          <img className="user-image" src={user.photoURL} />

          <div className="user-rank-wrap level-5">
            <svg className="user-rank"><use xlinkHref="#level-designator"></use></svg>
          </div>
        </div>

        <div className="username-and-details">
          <div className="username">{user.handle}</div>

          <div className="user-details">
            <div className="user-details-1">
              <span className="user-country">{user.competitionCountryCode}</span>

              <span className="total-wins">{numberWins}</span>
            </div>

            <div className="member-since">
              Member since <span className="member-since-mm-yyyy">{user.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  rank: PropTypes.number
}

export default UserInfo
