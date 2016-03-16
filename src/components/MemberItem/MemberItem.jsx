import React, { PropTypes } from 'react'
import UserInfo from './UserInfo'
import UserStats from './UserStats'
import classNames from 'classnames'

require('./member-item.scss')

const MemberItem = ({ member, userPlace, exactMatch }) => {
  const memberItemStyles = classNames(
    'member-item',
    { 'exact-match': exactMatch }
  )

  return (
    <div className={memberItemStyles}>
      <UserInfo user={member} userPlace={userPlace} exactMatch={exactMatch}/>

      <UserStats member={member} />
    </div>
  )
}

MemberItem.propTypes = {
  member   : PropTypes.object.isRequired,
  userPlace: PropTypes.number
}

export default MemberItem
