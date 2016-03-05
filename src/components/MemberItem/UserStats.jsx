import { PropTypes } from 'react'
import SkillList from '../SkillList/SkillList'
import SubtrackList from '../SubtrackList/SubtrackList'
import TrackList from '../TrackList/TrackList'

require('./user-stats.scss')

const MemberSearchUserStats = ({ member }) => {
  // TODO: Add functionality for no skills or tracks

  let userStatsList

  if (member.subtracks) {
    userStatsList = <SubtrackList subtracks={member.subtracks} />
  } else {
    userStatsList = <TrackList tracks={member.tracks} />
  }

  // FIXME: Remove || [] once api supports empty skills array
  return (
    <div className="user-stats">
      <div className="user-stats-wrap">
        <SkillList skills={member.skills || []} />

        {userStatsList}
      </div>
    </div>
  )
}

MemberSearchUserStats.propTypes = {
  member: PropTypes.object.isRequired
}

export default MemberSearchUserStats
