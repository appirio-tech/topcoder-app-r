import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TagList from '../TagList/TagList'
import SubtrackList from '../SubtrackList/SubtrackList'
import TrackList from '../TrackList/TrackList'
import { getMostRecentSubtracks, sortSkillsByScoreAndTag } from '../../helpers'

require('./UserStats.scss')

const UserStats = ({ member, searchTermTag }) => {
  let userStatsList

  if (member.stats) {
    const subtracks = getMostRecentSubtracks(member.stats, 5)

    userStatsList = <SubtrackList subtracks={subtracks} />
  } else {
    userStatsList = <TrackList tracks={member.tracks} />
  }

  const skills = sortSkillsByScoreAndTag(member.skills, searchTermTag, 4)

  return (
    <div className="user-stats">
      <div className="user-stats-wrap">
        <TagList tags={skills} label="Skills" emptyMessage="No Skills"/>

        {userStatsList}
      </div>
    </div>
  )
}

UserStats.propTypes = {
  member: PropTypes.object.isRequired
}

const mapStateToProps = ({ searchTerm }) => {
  return {
    searchTermTag: searchTerm.searchTermTag
  }
}

export default connect(mapStateToProps)(UserStats)
