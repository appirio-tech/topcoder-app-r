import {
  CLEAR_MEMBER_SEARCH, USERNAME_SEARCH_SUCCESS,
  LOAD_MORE_USERNAMES, TOP_MEMBER_SEARCH_SUCCESS,
  MEMBER_SEARCH_FAILURE, MEMBER_SEARCH_SUCCESS
} from '../config/constants'

const initialState = {
  pageLoaded: false,
  loadingMore: false,
  error: false,
  totalCount: 0,
  moreMatchesAvailable: false,
  usernameMatches: [],
  topMembers: []
}

export default function(state = initialState, action) {
  switch (action.type) {

  case CLEAR_MEMBER_SEARCH:
    return Object.assign({}, state, {
      loadingMore: false,
      error: false,
      totalCount: 0,
      usernameMatches: [],
      topMembers: []
    })

  case MEMBER_SEARCH_SUCCESS:
    return Object.assign({}, state, {
      pageLoaded: true
    })

  case MEMBER_SEARCH_FAILURE:
    return Object.assign({}, state, {
      loadingMore: false,
      error: true,
      totalCount: 0,
      usernameMatches: [],
      topMembers: []
    })

  case LOAD_MORE_USERNAMES:
    return Object.assign({}, state, {
      loadingMore: true
    })

  case USERNAME_SEARCH_SUCCESS:
    return Object.assign({}, state, {
      loadingMore: false,
      totalCount: action.totalCount,
      moreMatchesAvailable: state.usernameMatches.length + action.usernameMatches.length < action.totalCount,
      usernameMatches: state.usernameMatches.concat(action.usernameMatches)
    })

  case TOP_MEMBER_SEARCH_SUCCESS:
    return Object.assign({}, state, {
      topMembers: action.topMembers
    })

  default:
    return state
  }
}
