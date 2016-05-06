import _ from 'lodash'
import { getFreshToken, decodeToken } from 'tc-accounts'
import { SET_USER, UNSET_USER,
  SET_USER_PHOTO, userProfileURL } from './constants'
import { fetchJSON } from '../helpers'
import store from './store'

export const refreshAuth = (nextState, replace, callback) => {
  getFreshToken()
    .then((token) => {
      const decodedJWT = decodeToken(token)
      const user = _.pick(decodedJWT, ['handle', 'roles', 'userId'])

      const username = user.handle
      const id       = _.toNumber(user.userId)
      const roles    = user.roles

      store.dispatch({ type: SET_USER, username, id, roles })

      // Get user's photo URL
      fetchJSON(userProfileURL + username)
        .then((userProfile) => {
          const photoURL = _.get(userProfile, 'result.content.photoURL')

          if (photoURL) {
            store.dispatch({ type: SET_USER_PHOTO, photoURL})
          }
        })
        .catch(console.log)
    })
    .catch( () => {
      store.dispatch({ type: UNSET_USER })

    })
    .then(callback)
}
