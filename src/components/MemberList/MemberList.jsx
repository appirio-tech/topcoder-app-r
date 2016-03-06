import { PropTypes } from 'react'
import MemberItem from '../MemberItem/MemberItem'

const MemberList = ({ members }) => (
  <div className="members-list">
    {members.map(member =>
      <MemberItem key={member.userId} member={member} />
    )}
  </div>
)

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MemberList
