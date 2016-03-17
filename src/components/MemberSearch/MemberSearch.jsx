import React from 'react'
import _ from 'lodash'
import ListContainer from '../ListContainer/ListContainer'
import TopMemberList from '../TopMemberList/TopMemberList'
import MemberList from '../MemberList/MemberList'
import MemberItem from '../MemberItem/MemberItem'
import NoResults from '../NoResults/NoResults'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

require('./member-search-view.scss')

const MemberSearchView = (props) => {
  const members       = props.usernameSearchResults
  const topMembers    = props.topMemberSearchResults
  const isLoading     = props.loading
  const searchTerm    = props.currentSearchTerm
  // const searchTermTag = props.searchTermTag

  let memberSearchContent
  let memberMatch

  if (!isLoading && members.length) {
    // FIXME: show complete count, not just the first 10
    const exactMemberMatch = members.splice(0, 1)[0]

    memberMatch = <MemberItem member={exactMemberMatch} exactMatch />
    memberSearchContent = (
      <ListContainer
        headerText={`Usernames matching ${searchTerm}`}
        listCount={members.length}
      >
        <MemberList members={members} />
      </ListContainer>
    )
  } else if (!isLoading && !members.length) {
    memberSearchContent = ''
  } else {
    // FIXME: move to page wide, not just memberSearchContent
    memberSearchContent = <LoadingIndicator />
  }

  let topMemberContent = ''

  if (topMembers.length) {
    topMemberContent = (
      <ListContainer headerText={`Top Members in ${_.capitalize(searchTerm)}`}>
        <TopMemberList topMembers={topMembers} />
      </ListContainer>
    )
  }

  let noResults = null
  if (!isLoading && !memberMatch && !members.length && !topMembers.length) {
    noResults = <NoResults entry={searchTerm} />
  }

  return (
    <div className="member-search-view">
      {noResults}
      {memberMatch}
      {topMemberContent}
      {memberSearchContent}
    </div>
  )
}

export default MemberSearchView
