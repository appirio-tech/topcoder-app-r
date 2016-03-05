import { PropTypes } from 'react'
import UserInfo from './UserInfo'
import MemberSearchUserStats from './MemberSearchUserStats'

const MemberItem = ({ member, rank }) => {
  return (
    <div className="member-item">
      <UserInfo user={member} rank={rank}/>

      <MemberSearchUserStats member={member} />
    </div>
  )
}

MemberItem.propTypes = {
  member: PropTypes.object.isRequired,
  rank  : PropTypes.number
}

export default MemberItem
