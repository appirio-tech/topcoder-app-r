import _ from 'lodash'
import { getFreshToken, decodeToken } from 'tc-accounts'
import { SET_USER, UNSET_USER } from './constants'
import store from './store'

export const refreshAuth = (nextState, replace, callback) => {
  getFreshToken()
    .then((token) => {
      const decodedJWT = decodeToken(token)

      const user = _.pick(decodedJWT, ['handle', 'roles', 'userId'])
      // Update properties names and values
      user.username = user.handle
      user.id   = _.toNumber(user.userId)
      delete user.handle
      delete user.userId

      store.dispatch({ type: SET_USER, user })
    })
    .catch( () => {
      store.dispatch({ type: UNSET_USER })

    })
    .then(callback)
}
