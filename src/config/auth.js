import _ from 'lodash'
import { getFreshToken, decodeToken } from 'tc-accounts'
import { SET_USER, UNSET_USER } from './constants'
import store from './store'

export const refreshAuth = (nextState, replace, callback) => {
  getFreshToken()
    .then((token) => {
      const decodedJWT = decodeToken(token)

      const user = _.pick(decodedJWT, ['handle', 'roles', 'userId'])

      store.dispatch({ type: SET_USER, user })
      callback()
    })
    .catch( () => {
      store.dispatch({ type: UNSET_USER })
      callback()
    })
}
