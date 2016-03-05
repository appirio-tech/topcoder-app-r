import { PropTypes } from 'react'
import MemberItem from '../MemberItem/MemberItem'


// FIXME: Add tag to state and reference tag in header
const TopMemberList = ({ topMembers }) => {
  return (
    <div className="top-members-list">
      <h1>Top Members in ADD TAG TO STATE</h1>

      <ul>
        {topMembers.map((member, index) => {
          return <MemberItem key={member.userId} member={member} rank={index}/>
        })}
      </ul>
    </div>
  )
}

TopMemberList.propTypes = {
  topMembers: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TopMemberList
