import _ from 'lodash'
import { SET_SEARCH_TERM, SET_SEARCH_TAG } from '../config/constants'

const initialState = {
  currentSearchTerm: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
  case SET_SEARCH_TERM:
    return _.merge({}, state, {
      currentSearchTerm: action.currentSearchTerm
    })

  case SET_SEARCH_TAG:
    return _.merge({}, state, {
      searchTermTag: action.searchTermTag
    })

  default: return state
  }
}
