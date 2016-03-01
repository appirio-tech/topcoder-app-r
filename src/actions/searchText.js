import _ from 'lodash'
import Q from 'q'

import { mockData } from '../data.js'

export const SEARCH_TEXT_REQUEST = 'SEARCH_TEXT_REQUEST'
export const SEARCH_TEXT_SUCCESS = 'SEARCH_TEXT_SUCCESS'
export const SEARCH_TEXT_FAILURE = 'SEARCH_TEXT_FAILURE'


function searchForText(text) {
  return _.find(mockData.skills, (skill) => {
    return skill.name.toLowerCase() === text.toLowerCase()
  })
}

export default function searchText(searchText) {
  return dispatch => {
    const deferred = Q.defer()

    dispatch({ type: SEARCH_TEXT_REQUEST })

    setTimeout(() => {
      const results = searchForText(searchText)

      dispatch({
        type: SEARCH_TEXT_SUCCESS,
        results
      })

      deferred.resolve()
    }, 3000)

    return deferred.promise
  }
}
