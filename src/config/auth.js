import { getFreshToken } from 'tc-accounts'

export const checkAuth = () => {
  return getFreshToken()
    .then(token => {
      console.log(`My token: ${token}`)

      return token
    })
    .catch(err => {
      console.log('No user is logged in.')
      console.log(err)

      return null
    })
}
