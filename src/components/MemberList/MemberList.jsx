import { PropTypes } from 'react'
import MemberItem from '../MemberItem/MemberItem'

const MemberList = ({ members }) => (
  <div className="members-list">
    <h1>Members: {members.length}</h1>

    <ul>
      {members.map(member =>
        <MemberItem key={member.id} member={member} />
      )}
    </ul>
  </div>
)

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MemberList
