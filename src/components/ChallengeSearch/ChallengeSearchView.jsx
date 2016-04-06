import React from 'react'
import ListContainer from '../ListContainer/ListContainer'
import ChallengeList from '../ChallengeList/ChallengeList'

require('./ChallengeSearchView.scss')

const ChallengeSearchView = ({ challengeData }) => {
  const challengeList = (
    <ListContainer headerText={'List of Challenges'}>
      <ChallengeList challenges={challengeData} />
    </ListContainer>
  )

  return (
    <div className="challenge-search-view">
      {challengeList}
    </div>
  )
}

export default ChallengeSearchView
