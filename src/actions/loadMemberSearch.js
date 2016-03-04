import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { status, json } from '../config/helpers'
import {
  MEMBER_SEARCH_REQUEST, MEMBER_SEARCH_SUCCESS,
  MEMBER_SEARCH_FAILURE, memberSearchUrl,
  memberSearchTagUrl } from '../config/constants'

export default function loadMemberSearch(searchTerm) {
  const memberSearchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }

  return (dispatch => {
    dispatch({ type: MEMBER_SEARCH_REQUEST })
    // TODO: Handle searchTerm === ''

    isSearchTermATag(searchTerm)
    .then(({ isTag, results }) => {
      console.log(isTag, results)
      getUsernameMatches(searchTerm)
      // const memberSearchAPICalls = [getUsernameMatches(searchTerm)]

      // if (isTag) {
      //   memberSearchAPICalls.unshift(getTopMembers(results.name))
      // }

      // Promise.all(memberSearchAPICalls)
      // .then(results => {

      // })
    })

    function isSearchTermATag(searchTerm) {
      const options = _.merge({}, memberSearchOptions, {
        body: JSON.stringify({
          query: { match: { name: searchTerm } }
        })
      })

      return fetch(memberSearchTagUrl, options)
      .then(status)
      .then(json)
      .then(data => {
        const results = data.hits.hits

        console.log(results)

        return {
          isTag: Boolean(results.length),
          results: results[0]._source
        }
      })
      .catch(err => {
        console.log('3232323232')
        dispatch({ type: MEMBER_SEARCH_FAILURE })
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
        console.log('rawData: ', data)
        const memberSearchResults = data.hits.hits.map(m => m._source)

        console.log('member response: ')
        console.log(memberSearchResults)

        dispatch({
          type: MEMBER_SEARCH_SUCCESS,
          memberSearchResults
        })
      })
      .catch(err => {
        console.log('hearhaewkjfhewakjla')
        dispatch({ type: MEMBER_SEARCH_FAILURE })
      })
    }
  })
}
