import React from 'react'
import ListContainer from '../ListContainer/ListContainer'
import TopMemberList from '../TopMemberList/TopMemberList'
import MemberList from '../MemberList/MemberList'
import MemberItem from '../MemberItem/MemberItem'
import PageError from '../PageError/PageError'
import NoResults from '../NoResults/NoResults'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton'
import { getSearchTagPreposition } from '../../helpers'

require('./MemberSearchView.scss')

const MemberSearchView = (props) => {
  const { loading, error, usernameMatches, totalCount, topMembers } = props
  const { previousSearchTerm: searchTerm, searchTermTag: tag } = props

  const { exactMemberMatch, memberMatches } = renderUsernameMatches()
  const topMemberLeaderboard = renderTopMembers()
  const pageStatus = renderPageState()
  const loadMoreButton = renderLoadMoreButton()

  return (
    <div className="member-search-view">
      {pageStatus}

      {exactMemberMatch}

      {topMemberLeaderboard}

      {memberMatches}

      {loadMoreButton}
    </div>
  )

  function renderPageState() {
    if (loading && !usernameMatches.length) {
      return <LoadingIndicator />

    } else if (error) {
      return <PageError />

    } else if (searchTerm && !loading && !error && !usernameMatches.length && !topMembers.length) {
      return <NoResults entry={searchTerm} />
    }
  }

  function renderTopMembers() {
    if (topMembers.length && tag) {
      const preposition = getSearchTagPreposition(tag.domain)

      return (
        <ListContainer headerText={`Top Members ${preposition} ${tag.name}`}>
          <TopMemberList topMembers={topMembers} />
        </ListContainer>
      )
    }

    return null
  }

  function renderUsernameMatches() {
    let memberMatches
    let exactMemberMatch
    let restOfUsernameMatches

    if (usernameMatches.length) {
      // Check if the first member in the array matches the search term
      const isExactMatch = usernameMatches[0].handle.toLowerCase() === searchTerm

      // If it's an exact match, and there is no leaderboard,
      // show the exact match separately
      if (isExactMatch && !tag) {
        exactMemberMatch = <MemberItem member={usernameMatches[0]} withBio />

        restOfUsernameMatches = usernameMatches.slice(1)
      }

      if (restOfUsernameMatches && restOfUsernameMatches.length === 0) {
        memberMatches = null

      } else {
        memberMatches = (
          <ListContainer
            headerText={`Usernames matching "${searchTerm}"`}
            listCount={totalCount}
          >
            <MemberList members={exactMemberMatch ? restOfUsernameMatches : usernameMatches} />
          </ListContainer>
        )
      }
    }

    return {
      exactMemberMatch,
      memberMatches
    }
  }

  function renderLoadMoreButton() {
    const loadMoreMembers = () => {
      props.loadMemberSearch(searchTerm)
    }

    if (!loading && !error && usernameMatches.length === 10) {
      return <LoadMoreButton callback={loadMoreMembers}/>
    }

    return null
  }
}

export default MemberSearchView
