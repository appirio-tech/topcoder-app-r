import { PropTypes } from 'react'
import SkillList from '../SkillList/SkillList'
import SubtrackList from '../SubtrackList/SubtrackList'
import TrackList from '../TrackList/TrackList'

const MemberSearchUserStats = ({ member }) => {
  // TODO: Add functionality for no skills or tracks

  let userStatsList

  if (member.subtracks) {
    userStatsList = <SubtrackList subtracks={member.subtracks} />
  } else {
    userStatsList = <TrackList tracks={member.tracks} />
  }

  return (
    <div>
      <SkillList skills={member.skills} />

      {userStatsList}
    </div>
  )
}

MemberSearchUserStats.propTypes = {
  member: PropTypes.object.isRequired
}

export default MemberSearchUserStats
