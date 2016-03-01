import { PropTypes } from 'react'
import UserInfo from '../UserInfo/UserInfo'
import MemberSearchUserStats
  from '../MemberSearchUserStats/MemberSearchUserStats'



const MemberItem = ({ member }) => {
  // Render tracks or subtracks based on data
  return (
    <div className="member-item">
      <UserInfo user={member}/>
      <MemberSearchUserStats member={member} />
    </div>
  )
}

MemberItem.propTypes = {
  member: PropTypes.object.isRequired
}

export default MemberItem
