import React from 'react'
import _ from 'lodash'
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
  const { pageLoaded, loadingMore, error, usernameMatches, totalCount, topMembers } = props
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

    } else if (searchTerm && pageLoaded && !usernameMatches.length && !topMembers.length) {
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
    } else if (!pageLoaded && !usernameMatches.length && !topMembers.length) {
      const loadingListItems = []

      for (let i = 0; i < 10; i++) {
        loadingListItems.push(
          <LoadingListItem type={'MEMBER'} key={i} />
        )
      }

      return (
        <ReactCSSTransitionGroup
          transitionName="list-container"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <ListContainer
            headerText={'Loading members...'}
          >
            <ul>
              {loadingListItems}
            </ul>
          </ListContainer>
        </ReactCSSTransitionGroup>
      )
    }
  }

  function renderTopMembers() {
    if (pageLoaded && tag && topMembers.length) {
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

    if (pageLoaded && usernameMatches.length) {
      // Check if the first member in the array matches the search term
      const isSearchTerm = _.isString(searchTerm)
      const isExactMatch = isSearchTerm && usernameMatches[0].handle.toLowerCase() === searchTerm.toLowerCase()

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
          <ReactCSSTransitionGroup
            transitionName="list-container"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <ListContainer
              headerText={'Usernames matching '}
              headerHighlightedText={searchTerm}
              numListItems={totalCount}
            >
              <MemberList members={exactMemberMatch ? restOfUsernameMatches : usernameMatches} />
            </ListContainer>
          </ReactCSSTransitionGroup>
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

    if (pageLoaded && !loadingMore && !error && usernameMatches.length === 10) {
      return <LoadMoreButton callback={loadMoreMembers}/>
    }

    if (loadingMore && !error && usernameMatches.length === 10) {
      return <LoadMoreButton callback={loadMoreMembers} loading />
    }

    return null
  }

  function renderEndOfResults() {
    const numResults = usernameMatches.length

    // Don't show 'End of results' if the page is loading
    if (!pageLoaded) {
      return null

    // Or if there are more members to load
    } else if (numResults !== totalCount) {
      return null

    // Or if there are no results at all
    } else if (numResults === 0 && topMembers.length === 0) {
      return null

    } else {
      return <EndOfResults />
    }
  }
}

export default MemberSearchView
