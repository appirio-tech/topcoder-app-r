import {
  SEARCH_TEXT_REQUEST, SEARCH_TEXT_SUCCESS,
  SEARCH_TEXT_FAILURE
} from '../actions/searchText'

const initialState = { loading: false, results: {name: ''} }

export default function(state = initialState, action) {
  switch (action.type) {
  case SEARCH_TEXT_REQUEST:
    return _.merge({}, state, { loading: true })

  case SEARCH_TEXT_SUCCESS:
  case SEARCH_TEXT_FAILURE:
    return _.merge({}, state, { loading: false, results: action.results }
    )

  default:
    return state
  }
}
