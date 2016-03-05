import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { status, json } from '../helpers'
import {
  START_MEMBER_SEARCH, USERNAME_SEARCH_SUCCESS,
  USERNAME_SEARCH_FAILURE, TOP_MEMBER_SEARCH_SUCCESS,
  TOP_MEMBER_SEARCH_FAILURE, memberSearchUrl,
  memberSearchTagUrl } from '../config/constants'

export default function loadMemberSearch(searchTerm) {
  const memberSearchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }

  return (dispatch => {
    dispatch({ type: START_MEMBER_SEARCH })
    // TODO: Handle searchTerm === ''

    checkIfSearchTermIsATag(searchTerm)
    .then((tag) => {
      const memberSearchAPICalls = [getUsernameMatches(searchTerm)]

      if (tag) {
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
          query: { match: { handle: searchTerm } }
        })
      })

      return fetch(memberSearchUrl, options)
      .then(status)
      .then(json)
      .then(data => {
        const usernameSearchResults = data.hits.hits.map(m => m._source)

        console.log('Member list: ')
        console.log(usernameSearchResults)

        dispatch({
          type: USERNAME_SEARCH_SUCCESS,
          usernameSearchResults
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({ type: USERNAME_SEARCH_FAILURE })
      })
    }

    function getTopMembers(tag) {
      // FIXME: handle other tags besides skill
      const options = _.merge({}, memberSearchOptions, {
        body: JSON.stringify({
          query: {
            nested: {
              path: 'skills',
              query: { match: {'skills.name': tag} }
            }
          },
          sort: [
            {'maxRating.rating': 'desc'}
          ]
        })
      })

      return fetch(memberSearchUrl, options)
      .then(status)
      .then(json)
      .then(data => {
        const topMemberSearchResults = data.hits.hits.map(m => m._source)
        console.log('Topmembers: ', topMemberSearchResults)

        dispatch({
          type: TOP_MEMBER_SEARCH_SUCCESS,
          topMemberSearchResults
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({ type: TOP_MEMBER_SEARCH_FAILURE })
      })
    }
  })
}
