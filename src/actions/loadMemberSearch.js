import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { status, json } from '../helpers'
import {
  START_MEMBER_SEARCH, CLEAR_MEMBER_SEARCH,
  USERNAME_SEARCH_SUCCESS, USERNAME_SEARCH_FAILURE,
  TOP_MEMBER_SEARCH_SUCCESS, TOP_MEMBER_SEARCH_FAILURE,
  SET_SEARCH_TAG,
  memberSearchUrl, memberSearchTagUrl } from '../config/constants'

export default function loadMemberSearch(searchTerm) {
  const memberSearchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }

  return (dispatch => {
    dispatch({ type: CLEAR_MEMBER_SEARCH })
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

        memberSearchAPICalls.unshift(getTopMembers(tag.name))
      }

      return Promise.all(memberSearchAPICalls)
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
        console.error(err)
        dispatch({
          type: USERNAME_SEARCH_FAILURE,
          usernameSearchResults: []
        })

        return []
      })
    }

    function getTopMembers(tag) {
      // FIXME: handle other tags besides skill
      // once backend supports it

      const options = _.merge({}, memberSearchOptions, {
        body: JSON.stringify({
          param: {
            from: 0, size: 10,
            query: {
              nested: {
                path: 'skills',
                query: { match: {'skills.name': tag} }
              }
            },
            sort: [
              {
                'skills.score': {
                  order: 'desc',
                  nested_filter: { //eslint-disable-line camelcase
                    term: {
                      'skills.name': tag
                    }
                  }
                }
              },
              { wins: 'desc' }
            ]
          },
          method: 'get'
        })
      })

      return fetch(memberSearchUrl, options)
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
