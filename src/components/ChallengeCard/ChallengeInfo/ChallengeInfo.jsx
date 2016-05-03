import React, { PropTypes } from 'react'
import SubtrackCodeIcon from './SubtrackCodeIcon/SubtrackCodeIcon'
import TagList from '../../TagList/TagList'
import { challengeDetailsURL } from '../../../helpers'

require('./ChallengeInfo.scss')

const ChallengeInfo = ({ subtrack, track, name, id }) => {
  const url = challengeDetailsURL(track, id)

  return (
    <div className="challenge-card-info">
      <SubtrackCodeIcon track={track} subtrack={subtrack}/>

      <a className="tc-link challenge-card-title" href={url}>{name}</a>

      <TagList tags={[{name: 'JavaScript'}, {name: 'Python'}]} />
    </div>
  )
}

ChallengeInfo.propTypes = {
  id      : PropTypes.number.isRequired,
  name    : PropTypes.string.isRequired,
  track   : PropTypes.string.isRequired,
  subtrack: PropTypes.string.isRequired
}

export default ChallengeInfo
