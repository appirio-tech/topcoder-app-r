import SET_SEARCH_TERM from '../config/constants'

export default function setSearchTerm(searchTerm) {
  return dispatch => {
    dispatch({
      type: SET_SEARCH_TERM,
      currentSearchTerm: searchTerm
    })
  }
}
