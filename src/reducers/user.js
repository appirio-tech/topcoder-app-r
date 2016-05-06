import { SET_USER, UNSET_USER, SET_USER_PHOTO } from '../config/constants'

export const initialState = {
  username: null,
  id      : null,
  roles   : [],

  // Require file if this PR gets merged:
  // https://github.com/bkonkle/ignore-styles/pull/5
  // photoURL: require('../components/User/default-avatar.svg')
  photoURL: 'https://s3.amazonaws.com/app.topcoder.com/83b4e2a0156bf9ff87e4ea2af8b8c40b.svg'
}

export default function(state = initialState, action) {
  switch (action.type) {
  case SET_USER:
    return Object.assign({}, state, {
      username: action.username,
      id      : action.id,
      roles   : action.roles
    })

  case SET_USER_PHOTO:
    return Object.assign({}, state, {
      photoURL: action.photoURL
    })

  case UNSET_USER:
    return Object.assign({}, state, initialState)

  default:
    return state
  }
}
