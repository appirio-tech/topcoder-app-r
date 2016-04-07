import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ListContainer from '../ListContainer/ListContainer'
import TopMemberList from '../TopMemberList/TopMemberList'
import MemberList from '../MemberList/MemberList'
import MemberItem from '../MemberItem/MemberItem'
import LoadingListItem from '../LoadingListItem/LoadingListItem'
import PageError from '../PageError/PageError'
import NoResults from '../NoResults/NoResults'
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton'
import EndOfResults from '../EndOfResults/EndOfResults'
import { getSearchTagPreposition } from '../../helpers'

require('./MemberSearchView.scss')

const MemberSearchView = (props) => {
  const { loading, error, usernameMatches, totalCount, topMembers } = props
  const { previousSearchTerm: searchTerm, searchTermTag: tag } = props

  const { exactMemberMatch, memberMatches } = renderUsernameMatches()
  const topMemberLeaderboard = renderTopMembers()
  const pageStatus = renderPageState()
  const loadMoreButton = renderLoadMoreButton()
  const endOfResults = renderEndOfResults()

  return (
    <div className="member-search-view">
      {pageStatus}

      {exactMemberMatch}

      {topMemberLeaderboard}

      {memberMatches}

      {loadMoreButton}

      {endOfResults}
    </div>
  )

  function renderPageState() {
    if (error) {
      return (
        <ReactCSSTransitionGroup
          transitionName="page-error"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <PageError />
        </ReactCSSTransitionGroup>
      )

    } else if (searchTerm && !loading && !error && !usernameMatches.length && !topMembers.length) {
      return (
        <ReactCSSTransitionGroup
          transitionName="no-results"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <NoResults entry={searchTerm} />
        </ReactCSSTransitionGroup>
      )
    } else if (loading && !usernameMatches.length && !topMembers.length) {
      return (
        <ListContainer
          headerText={'Loading users...'}
        >
          <ul>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => {
              return <LoadingListItem type={'MEMBER'} key={i} />
            })}
          </ul>
        </ListContainer>
      )
    }
  }

  function renderTopMembers() {
    if (!loading && tag && topMembers.length) {
      const preposition = getSearchTagPreposition(tag.domain)

      return (
        <ListContainer
          headerText={`Top Members ${preposition} `}
          headerHighlightedText={tag.name}
        >
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

    if (!loading && usernameMatches.length) {
      // Check if the first member in the array matches the search term
      const isExactMatch = usernameMatches[0].handle.toLowerCase() === searchTerm

      // If it's an exact match, and there is no leaderboard,
      // show the exact match separately
      if (isExactMatch && !tag) {
        exactMemberMatch = <MemberItem member={usernameMatches[0]} withBio shouldAnimate />

        restOfUsernameMatches = usernameMatches.slice(1)
      }

      // If there is an exact match and no other matching usernames
      if (restOfUsernameMatches && restOfUsernameMatches.length === 0) {
        memberMatches = null

      } else {
        memberMatches = (
          <ListContainer
            headerText={'Usernames matching '}
            headerHighlightedText={searchTerm}
            numListItems={totalCount}
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

    if (loading && !error && usernameMatches.length === 10) {
      return <LoadMoreButton callback={loadMoreMembers} loading />
    }

    return null
  }

  function renderEndOfResults() {
    const numResults = usernameMatches.length

    // If the member matches list is rendered
    // and the number of items in the list equals the total number
    if (numResults > 0 && numResults === totalCount && memberMatches) {
      return <EndOfResults />
    }

    return null
  }

}

export default MemberSearchView
