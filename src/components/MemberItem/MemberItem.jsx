import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import UserInfo from './UserInfo'
import UserStats from './UserStats'
import classNames from 'classnames'
import { DOMAIN } from '../../config/constants'

require('./MemberItem.scss')

const MemberItem = ({ member, userPlace, withBio, shouldAnimate = false }) => {
  const memberItemStyles = classNames(
    'member-item',
    { 'with-bio': withBio }
  )

  const memberItem = (
    <a
      className={memberItemStyles}
      href={`https://www.${DOMAIN}/members/${member.handle}`}
    >
      <UserInfo user={member} userPlace={userPlace} withBio={withBio} />

      <UserStats member={member} userPlace={userPlace} />
    </a>
  )

  if (shouldAnimate) {
    return (
      <ReactCSSTransitionGroup
        transitionName="member-item"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {memberItem}
      </ReactCSSTransitionGroup>
    )
  }

  return memberItem
}

MemberItem.propTypes = {
  member       : PropTypes.object.isRequired,
  userPlace    : PropTypes.number,
  withBio      : PropTypes.bool,
  shouldAnimate: PropTypes.bool
}

export default MemberItem
