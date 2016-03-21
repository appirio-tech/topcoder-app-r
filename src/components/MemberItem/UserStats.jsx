import React, { PropTypes } from 'react'
import SkillList from '../SkillList/SkillList'
import SubtrackList from '../SubtrackList/SubtrackList'
import TrackList from '../TrackList/TrackList'
import { getMostRecentSubtracks } from '../../helpers'

require('./UserStats.scss')

const UserStats = ({ member }) => {
  // TODO: Add functionality for no skills or tracks
  let userStatsList

  if (member.stats) {
    const subtracks = getMostRecentSubtracks(member.stats, 5)

    userStatsList = <SubtrackList subtracks={subtracks} />
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

UserStats.propTypes = {
  member: PropTypes.object.isRequired
}

export default UserStats
