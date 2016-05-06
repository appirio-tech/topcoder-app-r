import _ from 'lodash'
import { fetchJSON, mapTagToLeaderboardType } from '../helpers'
import {
  CLEAR_MEMBER_SEARCH, LOAD_MORE_USERNAMES,
  USERNAME_SEARCH_SUCCESS, MEMBER_SEARCH_FAILURE,
  TOP_MEMBER_SEARCH_SUCCESS, RESET_SEARCH_TERM,
  SET_SEARCH_TAG, SET_SEARCH_TERM, MEMBER_SEARCH_SUCCESS,
  leaderboardURL, memberSearchURL, memberSearchTagURL } from '../config/constants'

export function loadMemberSearch(searchTerm) {
  return ((dispatch, getState) => {
    const state = getState()
    const numCurrentUsernameMatches = state.memberSearch.usernameMatches.length
    const previousSearchTerm = state.searchTerm.previousSearchTerm
    const isPreviousSearchTerm = _.isString(previousSearchTerm)
    const isNewSearchTerm = isPreviousSearchTerm && searchTerm.toLowerCase() !== previousSearchTerm.toLowerCase()

    if (isNewSearchTerm) {
      dispatch({ type: CLEAR_MEMBER_SEARCH })
    } else if (previousSearchTerm && numCurrentUsernameMatches >= 10) {
      dispatch({ type: LOAD_MORE_USERNAMES })

      return getUsernameMatches(dispatch, searchTerm, numCurrentUsernameMatches)
    }

    dispatch({ type: SET_SEARCH_TERM, searchTerm })

    return checkIfSearchTermIsATag(dispatch, searchTerm)
    .then((tag) => {
      dispatch({ type: SET_SEARCH_TAG, searchTermTag: tag })

      const memberSearchAPICalls = [getUsernameMatches(dispatch, searchTerm, numCurrentUsernameMatches)]

      if (tag) {
        memberSearchAPICalls.unshift(getTopMembers(dispatch, tag))
      }

      return Promise.all(memberSearchAPICalls)
      .then(() => {
        dispatch({ type: MEMBER_SEARCH_SUCCESS })
      })
      .catch(err => {
        memberSearchFailure(dispatch)
        throw new Error(`Could not resolve all promises. Reason: ${err}`)
      })
    })
  })
}

export function checkIfSearchTermIsATag(dispatch, searchTerm) {
  const url = `${memberSearchTagURL}?filter=name%3D${encodeURIComponent(searchTerm)}`

  return fetchJSON(url)
  .then(data => {
    const tagInfo = _.get(data, 'result.content')

    if (!_.isArray(tagInfo)) {
      throw new Error('Tag response must be an array')
    }

    return tagInfo[0]
  })
  .catch(err => {
    memberSearchFailure(dispatch)
    throw new Error(`Could not determine if search term is a tag. Reason: ${err}`)

  })
}

export function getUsernameMatches(dispatch, searchTerm, numMatches) {
  const offset = numMatches
  const url = `${memberSearchURL}?query=MEMBER_SEARCH&handle=${encodeURIComponent(searchTerm)}&offset=${offset}&limit=10`

  return fetchJSON(url)
  .then(data => {
    const usernameMatches = _.get(data, 'result.content')
    const totalCount      = _.get(data, 'result.metadata.totalCount')

    if (!_.isArray(usernameMatches)) {
      throw new Error('Expected array for username response results')
    } else if (!_.isNumber(totalCount)) {
      throw new Error('Expected number for metadata total count')
    }

    dispatch({
      type: USERNAME_SEARCH_SUCCESS,
      usernameMatches,
      totalCount
    })

    return usernameMatches
  })
  .catch(err => {
    dispatch({ type: MEMBER_SEARCH_FAILURE })
    throw new Error(`Could not fetch username matches. Reason: ${err}`)
  })
}

export function getTopMembers(dispatch, tag) {
  const leaderboardType = mapTagToLeaderboardType(tag.domain)
  const queryString = `?filter=id%3D${tag.id}%26type%3D${leaderboardType}`
  const url = leaderboardURL + queryString

  return fetchJSON(url)
  .then(data => {
    const topMembers = _.get(data, 'result.content', [])

    dispatch({
      type: TOP_MEMBER_SEARCH_SUCCESS,
      topMembers
    })

    return topMembers
  })
  .catch(err => {
    memberSearchFailure(dispatch)

    throw new Error(`Could not fetch top members. Reason: ${err}`)
  })
}

export function memberSearchFailure(dispatch) {
  dispatch({ type: MEMBER_SEARCH_FAILURE })
  dispatch({ type: RESET_SEARCH_TERM})
}
