import React, { PropTypes } from 'react'
import MemberItem from '../MemberItem/MemberItem'

require('./MemberList.scss')

const MemberList = ({ members }) => (
  <div className="member-list">
    {members.map(member =>
      <MemberItem key={member.userId} member={member} />
    )}
  </div>
)

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MemberList
