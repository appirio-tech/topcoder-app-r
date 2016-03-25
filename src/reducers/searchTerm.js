import _ from 'lodash'
import { SET_SEARCH_TERM, SET_SEARCH_TAG, RESET_SEARCH_TERM } from '../config/constants'

const initialState = {
  previousSearchTerm: null,
  searchTermTag: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case SET_SEARCH_TERM:
    return _.merge({}, state, {
      previousSearchTerm: action.searchTerm.toLowerCase()
    })

  case SET_SEARCH_TAG:
    return _.merge({}, state, {
      searchTermTag: action.searchTermTag
    })

  case RESET_SEARCH_TERM:
    return _.merge({}, state, {
      previousSearchTerm: null,
      searchTermTag: null
    })

  default: return state
  }
}
