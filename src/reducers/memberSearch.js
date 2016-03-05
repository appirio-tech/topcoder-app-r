import _ from 'lodash'
import {
  START_MEMBER_SEARCH, USERNAME_SEARCH_SUCCESS,
  USERNAME_SEARCH_FAILURE, TOP_MEMBER_SEARCH_SUCCESS,
  TOP_MEMBER_SEARCH_FAILURE
} from '../config/constants'

const initialState = {
  loading: true,
  usernameSearchResults: [],
  topMemberSearchResults: []
}

export default function(state = initialState, action) {
  switch (action.type) {
  case START_MEMBER_SEARCH:
    return _.merge({}, state, {
      loading: true
    })

  case USERNAME_SEARCH_SUCCESS:
  case USERNAME_SEARCH_FAILURE:
    return _.merge({}, state, {
      loading: false,
      usernameSearchResults: action.usernameSearchResults
    })

  case TOP_MEMBER_SEARCH_SUCCESS:
  case TOP_MEMBER_SEARCH_FAILURE:
    return _.merge({}, state, {
      loading: false,
      topMemberSearchResults: action.topMemberSearchResults
    })

  default:
    return state
  }
}
