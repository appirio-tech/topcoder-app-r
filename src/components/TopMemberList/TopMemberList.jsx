import { PropTypes } from 'react'
import MemberItem from '../MemberItem/MemberItem'

// FIXME: Add tag to state and reference tag in header
      // <h1>Top Members in ADD TAG TO STATE</h1>
const TopMemberList = ({ topMembers }) => {
  topMembers = topMembers
    .sort((a, b) => {
      return a.wins < b.wins
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
