import _ from 'lodash'
import { fetchJSON, mapTagToLeaderboardType } from '../helpers'
import {
  CLEAR_MEMBER_SEARCH, LOAD_MORE_USERNAMES,
  USERNAME_SEARCH_SUCCESS, MEMBER_SEARCH_FAILURE,
  TOP_MEMBER_SEARCH_SUCCESS, RESET_SEARCH_TERM,
  SET_SEARCH_TAG, SET_SEARCH_TERM, MEMBER_SEARCH_SUCCESS,
  leaderboardUrl, memberSearchUrl, memberSearchTagUrl } from '../config/constants'

export default function loadMemberSearch(searchTerm) {
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

      return getUsernameMatches()
    }

    dispatch({ type: SET_SEARCH_TERM, searchTerm })

    return checkIfSearchTermIsATag()
    .then((tag) => {
      dispatch({ type: SET_SEARCH_TAG, searchTermTag: tag })

      const memberSearchAPICalls = [getUsernameMatches()]

      if (tag) {
        memberSearchAPICalls.unshift(getTopMembers(tag))
      }

      return Promise.all(memberSearchAPICalls)
      .then(() => {
        dispatch({ type: MEMBER_SEARCH_SUCCESS })
      })
      .catch(err => {
        memberSearchFailure()
        throw new Error(`Could not resolve all promises. Reason: ${err}`)
      })
    })

    function checkIfSearchTermIsATag() {
      const url = `${memberSearchTagUrl}?filter=name%3D${window.encodeURIComponent(searchTerm)}`

      return fetchJSON(url)
      .then(data => {
        const tagInfo = _.get(data, 'result.content')

        if (!_.isArray(tagInfo)) {
          throw new Error('Tag response must be an array')
        }

        return tagInfo[0]
      })
      .catch(err => {
        memberSearchFailure()
        throw new Error(`Could not determine if search term is a tag. Reason: ${err}`)

      })
    }

    function getUsernameMatches() {
      const offset = numCurrentUsernameMatches
      const url = `${memberSearchUrl}?query=MEMBER_SEARCH&handle=${window.encodeURIComponent(searchTerm)}&offset=${offset}&limit=10`

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

    function getTopMembers(tag) {
      const leaderboardType = mapTagToLeaderboardType(tag.domain)
      const queryString = `?filter=id%3D${tag.id}%26type%3D${leaderboardType}`
      const url = leaderboardUrl + queryString

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
        memberSearchFailure()

        throw new Error(`Could not fetch top members. Reason: ${err}`)
      })
    }

    function memberSearchFailure() {
      dispatch({ type: MEMBER_SEARCH_FAILURE })
      dispatch({ type: RESET_SEARCH_TERM})
    }
  })
}
