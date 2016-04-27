import memberSearch from './memberSearch'
import freeze from 'deep-freeze-node'

import {
  CLEAR_MEMBER_SEARCH, USERNAME_SEARCH_SUCCESS,
  LOAD_MORE_USERNAMES, TOP_MEMBER_SEARCH_SUCCESS,
  MEMBER_SEARCH_FAILURE, MEMBER_SEARCH_SUCCESS
} from '../config/constants'

describe('memberSearch reducer', () => {
  const currentState = freeze({ oldState: 'oldState' })

  const action = { type: 'UNCAUGHT_ACTION' }

  it('should return the original state for any action not caught in its switch block', () => {
    const newState = memberSearch(currentState, action)

    newState.should.equal(currentState)
  })

  describe(CLEAR_MEMBER_SEARCH, () => {
    const currentState = freeze({
      loadingMore: true,
      error: true,
      totalCount: 41,
      usernameMatches: [1, 2, 3],
      topMembers: [1, 2]
    })

    const action = { type: CLEAR_MEMBER_SEARCH }

    const newState = memberSearch(currentState, action)

    it('should clear the username matches and top members', () => {
      newState.usernameMatches.should.be.an('array')
      newState.usernameMatches.length.should.equal(0)

      newState.topMembers.should.be.an('array')
      newState.topMembers.length.should.equal(0)
    })

    it('should reset the error flag', () => {
      newState.error.should.be.false
    })

    it('should reset the loadingMore flag', () => {
      newState.loadingMore.should.be.false
    })

    it('should reset the total count of username matches', () => {
      newState.totalCount.should.equal(0)
    })
  })

  describe(MEMBER_SEARCH_SUCCESS, () => {
    const currentState = freeze({
      pageLoaded: false
    })

    const action = { type: MEMBER_SEARCH_SUCCESS }

    const newState = memberSearch(currentState, action)

    it('should set pageLoaded to true', () => {
      newState.pageLoaded.should.be.true
    })
  })

  describe(MEMBER_SEARCH_FAILURE, () => {
    const currentState = freeze({
      loadingMore: true,
      error: false,
      totalCount: 41,
      usernameMatches: [1, 2, 3],
      topMembers: [1, 2]
    })

    const action = { type: MEMBER_SEARCH_FAILURE }

    const newState = memberSearch(currentState, action)

    it('should set error to true', () => {
      newState.error.should.be.true
    })

    it('should reset loadingMore, totalCount, usernameMatches, and topMembers', () => {
      newState.loadingMore.should.be.false
      newState.totalCount.should.equal(0)
      newState.usernameMatches.length.should.equal(0)
      newState.topMembers.length.should.equal(0)
    })
  })

  describe(LOAD_MORE_USERNAMES, () => {
    const currentState = freeze({
      loadingMore: false
    })

    const action = { type: LOAD_MORE_USERNAMES }

    const newState = memberSearch(currentState, action)

    it('should set loadingMore to true', () => {
      newState.loadingMore.should.be.true
    })
  })

  describe(USERNAME_SEARCH_SUCCESS, () => {
    const currentState = freeze({
      loadingMore: true,
      totalCount: 5,
      moreMatchesAvailable: false,
      usernameMatches: [1, 2, 3]
    })

    const action = {
      type: USERNAME_SEARCH_SUCCESS,
      totalCount: 6,
      usernameMatches: [4, 5]
    }

    const newState = memberSearch(currentState, action)

    it('should set loadingMore to false', () => {
      newState.loadingMore.should.be.false
    })

    it('should set the totalCount', () => {
      newState.totalCount.should.equal(6)
    })

    it('should set moreMatchesAvailable to true if the number of usernameMatches is less than the totalCount after concatenating the new usernameMatches results', () => {
      const newNumOfUsernameMatches = currentState.usernameMatches.length + action.usernameMatches.length

      newState.usernameMatches.length.should.equal(newNumOfUsernameMatches)
      newState.moreMatchesAvailable.should.be.true
    })

    it('should concatenate the new usernameMatches to the previous state\'s usernameMatches', () => {
      newState.usernameMatches.should.deep.equal([1, 2, 3, 4, 5])
    })
  })

  describe(TOP_MEMBER_SEARCH_SUCCESS, () => {
    const currentState = freeze({
      topMembers: [1, 2]
    })

    const action = {
      type: TOP_MEMBER_SEARCH_SUCCESS,
      topMembers: [3, 2, 1]
    }

    const newState = memberSearch(currentState, action)

    it('should replace the old state\'s topMembers with the new ones', () => {
      newState.topMembers.should.deep.equal([3, 2, 1])
    })
  })
})
