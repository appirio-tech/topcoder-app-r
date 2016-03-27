import React, { PropTypes } from 'react'
import UserInfo from './UserInfo'
import UserStats from './UserStats'
import classNames from 'classnames'
import { DOMAIN } from '../../config/constants'

require('./MemberItem.scss')

const MemberItem = ({ member, userPlace, withBio }) => {
  const memberItemStyles = classNames(
    'member-item',
    { 'with-bio': withBio }
  )

  return (
    <a
      className={memberItemStyles}
      href={`https://www.${DOMAIN}/members/${member.handle}`}
    >
      <UserInfo user={member} userPlace={userPlace} withBio={withBio}/>

      <UserStats member={member} />
    </a>
  )
}

MemberItem.propTypes = {
  member   : PropTypes.object.isRequired,
  userPlace: PropTypes.number,
  withBio  : PropTypes.bool
}

export default MemberItem
