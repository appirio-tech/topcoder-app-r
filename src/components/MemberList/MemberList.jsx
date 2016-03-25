import React, { PropTypes } from 'react'
import MemberItem from '../MemberItem/MemberItem'

require('./MemberList.scss')

const MemberList = (({ members }) => {
  return (
    <div className="member-list">
      {members.map((member, i) =>
        <MemberItem key={i} member={member} />
      )}
    </div>
  )
})

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MemberList
