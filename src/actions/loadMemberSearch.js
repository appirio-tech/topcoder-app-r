import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { status, json, mapTagToLeaderboardType } from '../helpers'
import {
  START_MEMBER_SEARCH, CLEAR_MEMBER_SEARCH,
  USERNAME_SEARCH_SUCCESS, USERNAME_SEARCH_FAILURE,
  TOP_MEMBER_SEARCH_SUCCESS, TOP_MEMBER_SEARCH_FAILURE,
  SET_SEARCH_TAG, SET_SEARCH_TERM,
  leaderboardUrl, memberSearchUrl, memberSearchTagUrl } from '../config/constants'

export default function loadMemberSearch(searchTerm) {
  const memberSearchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }

  return ((dispatch, getState) => {
    const state = getState()
    const previousSearchTerm = state.searchTerm.previousSearchTerm
    const isNewSearchTerm = searchTerm.toLowerCase() !== previousSearchTerm

    if (isNewSearchTerm && state.memberSearch.loading) {
      dispatch({ type: CLEAR_MEMBER_SEARCH })
    } else {
      return
    }

    dispatch({ type: START_MEMBER_SEARCH })

    // TODO: Handle searchTerm === ''

    checkIfSearchTermIsATag(searchTerm)
    .then((tag) => {
      const memberSearchAPICalls = [getUsernameMatches(searchTerm)]

      if (tag) {
        dispatch({
          type: SET_SEARCH_TAG,
          searchTermTag: tag
        })

        memberSearchAPICalls.unshift(getTopMembers(tag))
      }

      return Promise.all(memberSearchAPICalls)
      .then((results, hi) => {
        console.log(results)
        console.log(hi)
        dispatch({ type: SET_SEARCH_TERM, searchTerm })
      })
      .finally(err => {
        console.log('fewlkafjwlkaefjw: ', err)
        console.log(`error message after Promise.all: ${err}`)
      })
    })

    function checkIfSearchTermIsATag(searchTerm) {
      const url = memberSearchTagUrl + '/?q=' + searchTerm

      return fetch(url, memberSearchOptions)
      .then(status)
      .then(json)
      .then(data => {
        const tag = data.hits.hits

        return tag.length ? tag[0]._source : null
      })
      .catch(err => {
        // FIXME: How do we handle error determining if search term is a tag?
        console.error(err)
        // Error loading leaderboard and load username results only?
        // dispatch({ type: USERNAME_SEARCH_FAILURE })
      })
    }

    function getUsernameMatches(searchTerm) {
      const options = _.merge({}, memberSearchOptions, {
        body: JSON.stringify({
          param: {
            from: 0, size: 11,
            query: {
              filtered: {
                query: {
                  bool: {
                    should: [
                      { match: { 'handle.phrase': searchTerm } },
                      { match: { handle: searchTerm } }
                    ]
                  }
                },
                filter: {
                  bool: {
                    should: [
                      { exists: { field: 'description' } },
                      { exists: { field: 'skills' } },
                      { exists: { field: 'photoURL' } }
                    ]
                  }
                }
              }
            }
          },
          method: 'get'
        })
      })

      return fetch(memberSearchUrl, options)
      .then(status)
      .then(json)
      .then(data => {
        const usernameSearchResults = _.get(data, 'result.content', [])

        throw new Error('my fake error')
        console.log('Member list: ')
        console.log(usernameSearchResults)
        dispatch({
          type: USERNAME_SEARCH_SUCCESS,
          usernameSearchResults,
          totalUsernameMatches: _.get(data, 'result.metadata.totalCount', 0)
        })

        return usernameSearchResults
      })
      .catch(err => {
        console.log('here')
        console.error(err)
        dispatch({
          type: USERNAME_SEARCH_FAILURE,
          usernameSearchResults: []
        })

        return []
      })
    }

    function getTopMembers(tag) {
      const leaderboardType = mapTagToLeaderboardType(tag.domain)
      const queryString = `?filter=name%3D${tag.name}%26type%3D${leaderboardType}`
      const url = leaderboardUrl + queryString

      return fetch(url)
      .then(status)
      .then(json)
      .then(data => {
        const topMemberSearchResults = _.get(data, 'result.content', [])
        console.log('Topmembers: ', topMemberSearchResults)

        dispatch({
          type: TOP_MEMBER_SEARCH_SUCCESS,
          topMemberSearchResults
        })

        return topMemberSearchResults
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: TOP_MEMBER_SEARCH_FAILURE,
          topMemberSearchResults: []
        })

        return []
      })
    }
  })
}
