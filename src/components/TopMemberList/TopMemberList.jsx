import React, { PropTypes } from 'react'
import MemberItem from '../MemberItem/MemberItem'

const TopMemberList = ({ topMembers }) => {
  topMembers = topMembers
    .sort((a, b) => {
      return b.wins - a.wins
    })
    .map((member, index) => {
      return <MemberItem key={member.userId} member={member} userPlace={index}/>
    })

  return (
    <div className="top-member-list">
      {topMembers}
    </div>
  )
}

TopMemberList.propTypes = {
  topMembers: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TopMemberList
