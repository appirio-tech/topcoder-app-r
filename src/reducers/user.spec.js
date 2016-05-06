import register from 'ignore-styles'
register(['.svg', '.scss'])

import user, { initialState } from './user'
import freeze from 'deep-freeze-node'

import { SET_USER, UNSET_USER, SET_USER_PHOTO } from '../config/constants'

describe('user reducer: ', () => {
  const mockUser = {
    username: 'r2d2',
    id: 123456,
    roles: ['copilot']
  }

  const currentState = freeze({ oldState: 'oldState' })

  const action = { type: 'UNCAUGHT_ACTION' }

  it('returns the original state for any action not caught in its switch block', () => {
    const newState = user(currentState, action)

    newState.should.equal(currentState)
  })

  describe(SET_USER, () => {
    const currentState = null

    const { username, id, roles } = mockUser
    const action = { type: SET_USER, username, id, roles }

    const newState = user(currentState, action)

    it('sets the new user', () => {
      newState.should.deep.equal(mockUser)
    })
  })

  describe(SET_USER_PHOTO, () => {
    const currentState = freeze(mockUser)

    const mockPhotoURL = 'https://www.topcoder.com/i/m/r2d2.jpeg'
    const action = { type: SET_USER_PHOTO, photoURL: mockPhotoURL }

    const newState = user(currentState, action)

    it('sets the photoURL of the user', () => {
      newState.should.deep.equal({
        username: 'r2d2',
        id: 123456,
        roles: ['copilot'],
        photoURL: mockPhotoURL
      })
    })
  })

  describe(UNSET_USER, () => {
    const currentState = freeze(mockUser)

    const action = { type: UNSET_USER }

    const newState = user(currentState, action)

    it('sets the user to initial state when logging out', () => {
      newState.should.deep.equal(initialState)
    })
  })
})
