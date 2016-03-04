import _ from 'lodash'
import {
  MEMBER_SEARCH_REQUEST, MEMBER_SEARCH_SUCCESS,
  MEMBER_SEARCH_FAILURE
} from '../config/constants'

const initialState = { loading: true, memberSearchResults: [] }

export default function(state = initialState, action) {
  switch (action.type) {
  case MEMBER_SEARCH_REQUEST:
    return _.merge({}, state, {
      loading: true
    })

  case MEMBER_SEARCH_SUCCESS:
  case MEMBER_SEARCH_FAILURE:
    return _.merge({}, state, {
      loading: false,
      memberSearchResults: action.memberSearchResults
    })

  default:
    return state
  }
}
