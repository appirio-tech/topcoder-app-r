import { PropTypes } from 'react'
require('./user-info.scss')

const UserInfo = ({ user }) => {
  // Render tracks or subtracks based on data
  return (
    <div className="user-info">
      <div className="user-profile">
        {/*<div className="list-number">1</div>*/}

        <div className="user-avatar">
          <svg className="default-avatar"><use xlinkHref="#ico-user-default"></use></svg>

          <div className="user-image" data-bg-src="i/jean.jpeg"></div>

          <div className="user-rank-wrap level-5">
            <svg className="user-rank"><use xlinkHref="#level-designator"></use></svg>
          </div>
        </div>

        <div className="username-and-details">
          <div className="username">{user.username}</div>

          <div className="user-details">
            <div className="user-details-1">
              <span className="user-country">{user.country}</span>

              <span className="user-info-sep"></span>

              <span className="total-wins"><span className="total-wins-count">{user.totalWins}</span> wins total</span>
            </div>

            <div className="member-since">
              Member since <span className="member-since-mm-yyyy">{user.memberSince}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserInfo
