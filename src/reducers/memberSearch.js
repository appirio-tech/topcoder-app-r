import _ from 'lodash'
import {
  START_MEMBER_SEARCH, CLEAR_MEMBER_SEARCH,
  USERNAME_SEARCH_SUCCESS, MEMBER_SEARCH_FAILURE,
  TOP_MEMBER_SEARCH_SUCCESS, MEMBER_SEARCH_SUCCESS
} from '../config/constants'

const initialState = {
  loading: false,
  error: false,
  usernameMatches: [],
  totalCount: 0,
  moreMatchesAvailable: false,
  topMembers: []
}

export default function(state = initialState, action) {
  switch (action.type) {
  case START_MEMBER_SEARCH:
    return _.merge({}, state, {
      loading: true
    })
  case CLEAR_MEMBER_SEARCH:
    return _.merge({}, state, {
      usernameMatches: [],
      topMembers: [],
      error: false,
      totalCount: 0
    })

  case MEMBER_SEARCH_SUCCESS:
    return _.merge({}, state, {
      loading: false
    })

  case MEMBER_SEARCH_FAILURE:
    return _.merge({}, state, {
      loading: false,
      error: true,
      usernameMatches: [],
      topMembers: [],
      totalCount: 0
    })

  case USERNAME_SEARCH_SUCCESS:
    return _.merge({}, state, {
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
