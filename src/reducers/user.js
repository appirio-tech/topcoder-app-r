import { SET_USER, UNSET_USER } from '../config/constants'

export const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {

  case SET_USER:
    return Object.assign({}, state, action.user)

  case UNSET_USER:
    return null

  default:
    return state
  }
}
