import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import TagList from '../TagList/TagList'
import SubtrackList from '../SubtrackList/SubtrackList'
import TrackList from '../TrackList/TrackList'
import { getMostRecentSubtracks, sortSkillsByScoreAndTag } from '../../helpers'

require('./UserStats.scss')

const UserStats = ({ member, userPlace, searchTermTag }) => {
  let userStatsList

  const stats = (_.isArray(member.stats) && member.stats.length > 0) ? member.stats[0]:member.stats
  const subtracks = getMostRecentSubtracks(stats, 5)

  if (subtracks.length) {
    userStatsList = <SubtrackList subtracks={subtracks} />
  } else {
    userStatsList = <TrackList tracks={member.tracks} />
  }

  // Highlight the skill that was searched for if the user has it
  // but only in the leaderboard, which is indicated by having userPlace
  const tag = _.isFinite(userPlace) ? searchTermTag : null

  const skills = sortSkillsByScoreAndTag(member.skills, tag, 4)

  return (
    <div className="user-stats">
      <div className="aligner">
        <TagList tags={skills} label="Skills:" emptyMessage="No skills added"/>

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
