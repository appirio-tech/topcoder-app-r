import _ from 'lodash'
import {
  CLEAR_MEMBER_SEARCH, USERNAME_SEARCH_SUCCESS,
  LOAD_MORE_USERNAMES, TOP_MEMBER_SEARCH_SUCCESS,
  MEMBER_SEARCH_FAILURE, MEMBER_SEARCH_SUCCESS
} from '../config/constants'

const initialState = {
  pageLoaded: false,
  loadingMore: false,
  error: false,
  usernameMatches: [],
  totalCount: 0,
  moreMatchesAvailable: false,
  topMembers: []
}

export default function(state = initialState, action) {
  switch (action.type) {

  case CLEAR_MEMBER_SEARCH:
    return _.merge({}, state, {
      usernameMatches: [],
      topMembers: [],
      error: false,
      loadingMore: false,
      totalCount: 0
    })

  case MEMBER_SEARCH_SUCCESS:
    return _.merge({}, state, {
      pageLoaded: true
    })

  case MEMBER_SEARCH_FAILURE:
    return _.merge({}, state, {
      loadingMore: false,
      error: true,
      usernameMatches: [],
      topMembers: [],
      totalCount: 0
    })

  case LOAD_MORE_USERNAMES:
    return _.merge({}, state, {
      loadingMore: true
    })

  case USERNAME_SEARCH_SUCCESS:
    return _.merge({}, state, {
      loadingMore: false,
      usernameMatches: state.usernameMatches.concat(action.usernameMatches),
      moreMatchesAvailable: state.usernameMatches.length + action.usernameMatches.length < action.totalCount,
      totalCount: action.totalCount
    })

  case TOP_MEMBER_SEARCH_SUCCESS:
    return _.merge({}, state, {
      topMembers: action.topMembers
    })

  default:
    return state
  }
}
