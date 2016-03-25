import React, { PropTypes } from 'react'
import UserInfo from './UserInfo'
import UserStats from './UserStats'
import classNames from 'classnames'

require('./MemberItem.scss')

const MemberItem = ({ member, userPlace, withBio }) => {
  const memberItemStyles = classNames(
    'member-item',
    { 'with-bio': withBio }
  )

  return (
    <div className={memberItemStyles}>
      <UserInfo user={member} userPlace={userPlace} withBio={withBio}/>

      <UserStats member={member} />
    </div>
  )
}

MemberItem.propTypes = {
  member   : PropTypes.object.isRequired,
  userPlace: PropTypes.number,
  withBio  : PropTypes.bool
}

export default MemberItem
