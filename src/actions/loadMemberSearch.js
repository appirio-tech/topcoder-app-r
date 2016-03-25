import _ from 'lodash'
import { fetchJSON, mapTagToLeaderboardType } from '../helpers'
import {
  START_MEMBER_SEARCH, CLEAR_MEMBER_SEARCH,
  USERNAME_SEARCH_SUCCESS, MEMBER_SEARCH_FAILURE,
  TOP_MEMBER_SEARCH_SUCCESS, RESET_SEARCH_TERM,
  SET_SEARCH_TAG, SET_SEARCH_TERM,
  leaderboardUrl, memberSearchUrl, memberSearchTagUrl } from '../config/constants'

export default function loadMemberSearch(searchTerm) {
  return ((dispatch, getState) => {
    const state = getState()
    const numCurrentUsernameMatches = state.memberSearch.usernameMatches.length
    const previousSearchTerm = state.searchTerm.previousSearchTerm
    const isNewSearchTerm = searchTerm.toLowerCase() !== previousSearchTerm

    if (isNewSearchTerm) {
      dispatch({ type: CLEAR_MEMBER_SEARCH })
    } else if (previousSearchTerm && numCurrentUsernameMatches >= 10) {
      dispatch({ type: START_MEMBER_SEARCH })

      return getUsernameMatches()
    }

    dispatch({ type: START_MEMBER_SEARCH })
    dispatch({ type: SET_SEARCH_TERM, searchTerm })

    return checkIfSearchTermIsATag()
    .then((tag) => {
      const memberSearchAPICalls = [getUsernameMatches()]

      if (tag) {
        memberSearchAPICalls.unshift(getTopMembers(tag))
      }

      return Promise.all(memberSearchAPICalls)
      .then(() => {
        dispatch({ type: SET_SEARCH_TAG, searchTermTag: tag })

      })
      .catch(err => {
        memberSearchFailure()
        throw new Error(`Error thrown fetching member lists: ${err}`)
      })
    })

    function checkIfSearchTermIsATag() {
      const url = `${memberSearchTagUrl}?filter=name%3D${searchTerm}`

      return fetchJSON(url)
      .then(data => {
        return _.get(data, 'result.content')[0]
      })
      .catch(err => {
        memberSearchFailure()
        throw new Error(`Error determining if search term is a tag: ${err}`)

      })
    }

    function getUsernameMatches() {
      const offset = numCurrentUsernameMatches
      const url = `${memberSearchUrl}?query=MEMBER_SEARCH&handle=${searchTerm}&offset=${offset}&limit=10`

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
        throw new Error(`Error fetching username matches: ${err}`)
      })
    }

    function getTopMembers(tag) {
      const leaderboardType = mapTagToLeaderboardType(tag.domain)
      const queryString = `?filter=name%3D${tag.name}%26type%3D${leaderboardType}`
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

        throw new Error(`Error fetching top members: ${err}`)
      })
    }

    function memberSearchFailure() {
      dispatch({ type: MEMBER_SEARCH_FAILURE })
      dispatch({ type: RESET_SEARCH_TERM})
    }
  })
}

