import React, { PropTypes } from 'react'
import _ from 'lodash'
import MemberItem from '../MemberItem/MemberItem'

const TopMemberList = ({ topMembers }) => {
  const sortedTopMembers = _.orderBy(topMembers, 'wins', 'desc')

  topMembers = sortedTopMembers.map((member, i) => {
    return <MemberItem key={i} member={member} userPlace={i}/>
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
