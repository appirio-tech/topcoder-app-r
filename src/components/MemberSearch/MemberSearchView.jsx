import React from 'react'
import ListContainer from '../ListContainer/ListContainer'
import TopMemberList from '../TopMemberList/TopMemberList'
import MemberList from '../MemberList/MemberList'
import MemberItem from '../MemberItem/MemberItem'
import NoResults from '../NoResults/NoResults'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import { getSearchTagPreposition } from '../../helpers'

require('./MemberSearchView.scss')

const MemberSearchView = (props) => {
  let usernameMatches = props.usernameSearchResults
  const totalCount    = props.totalUsernameMatches
  const topMembers    = props.topMemberSearchResults
  const isLoading     = props.loading
  const searchTerm    = props.previousSearchTerm
  const tag           = props.searchTermTag

  let memberSearchContent
  let memberMatch

  if (!isLoading && usernameMatches.length) {
    const isExactMatch = usernameMatches[0].handle.toLowerCase() === searchTerm

    if (isExactMatch && !tag) {
      memberMatch = <MemberItem member={usernameMatches[0]} withBio />
      usernameMatches = usernameMatches.slice(1)
    }

    memberSearchContent = (
      <ListContainer
        headerText={`Usernames matching "${searchTerm}"`}
        listCount={totalCount}
      >
        <MemberList members={usernameMatches} />
      </ListContainer>
    )
  } else if (!isLoading && !usernameMatches.length) {
    memberSearchContent = ''
  } else {
    // FIXME: move to page wide, not just memberSearchContent
    memberSearchContent = <LoadingIndicator />
  }

  let topMemberContent = ''

  if (topMembers.length && tag) {
    const preposition = getSearchTagPreposition(tag.domain)

    topMemberContent = (
      <ListContainer headerText={`Top Members ${preposition} ${tag.name}`}>
        <TopMemberList topMembers={topMembers} />
      </ListContainer>
    )
  }

  let noResults = null
  if (!isLoading && !memberMatch && !usernameMatches.length && !topMembers.length) {
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
