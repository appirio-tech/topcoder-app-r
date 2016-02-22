import Q from 'q'
import data from '../data.js'
export const SEARCH_TEXT_REQUEST = 'SEARCH_TEXT_REQUEST'
export const SEARCH_TEXT_SUCCESS = 'SEARCH_TEXT_SUCCESS'
export const SEARCH_TEXT_FAILURE = 'SEARCH_TEXT_FAILURE'


function searchForText(text) {
  return _.find(data.skills, (skill) => {
    return skill.name.toLowerCase() === text.toLowerCase()
  })
}

export default function searchText(searchText) {
  return dispatch => {
    let deferred = Q.defer()

    dispatch({ type: SEARCH_TEXT_REQUEST })

    setTimeout(function() {
      let results = searchForText(searchText)

      dispatch({
        type: SEARCH_TEXT_SUCCESS,
        results
      })

      deferred.resolve()
    }, 3000)

    return deferred.promise
  }
}
