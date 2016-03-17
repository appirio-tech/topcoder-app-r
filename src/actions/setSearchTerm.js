import { SET_SEARCH_TERM } from '../config/constants'

export function setSearchTerm(currentSearchTerm) {
  return dispatch => {
    dispatch({
      type: SET_SEARCH_TERM,
      currentSearchTerm
    })
  }
}