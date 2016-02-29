import { PropTypes } from 'react'
import SkillList from '../SkillList/SkillList'
import SubtrackList from '../SubtrackList/SubtrackList'

const MemberSearchUserStats = ({ member }) => {
  // Render tracks or subtracks based on data
  return (
    <div>
      <SkillList skills={member.skills} />
      <SubtrackList subtracks={member.subtracks} />
    </div>
  )
}

MemberSearchUserStats.propTypes = {
  member: PropTypes.object.isRequired
}

export default MemberSearchUserStats
