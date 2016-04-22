import _ from 'lodash'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { initialState } from '../reducers/memberSearch.js'
import { INTERNAL_API } from '../config/constants.js'

import {
  // loadMemberSearch,
  // checkIfSearchTermIsATag,
  // getUsernameMatches,
  getTopMembers,
  memberSearchFailure
} from './loadMemberSearch.js'

import {
  // CLEAR_MEMBER_SEARCH, LOAD_MORE_USERNAMES,
  // USERNAME_SEARCH_SUCCESS,
  MEMBER_SEARCH_FAILURE,
  TOP_MEMBER_SEARCH_SUCCESS, RESET_SEARCH_TERM
  // SET_SEARCH_TAG, SET_SEARCH_TERM, MEMBER_SEARCH_SUCCESS
} from '../config/constants'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('loadMemberSearch Actions:', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('getTopMembers', () => {
    it(`dispatches ${TOP_MEMBER_SEARCH_SUCCESS} with results when the request succeeds`, () => {
      const store = mockStore({ memberSearch: initialState })
      const topMemberResults = ['topMember1', 'topMember2']

      nock(INTERNAL_API)
        .get(/\/leaderboards.*/)
        .reply(200, { result: { content: topMemberResults } })

      return getTopMembers(store.dispatch, { domain: 'SKILLS', id: 391 })
        .then( () => {
          const successAction = _.find(store.getActions(), a => a.type === TOP_MEMBER_SEARCH_SUCCESS)

          successAction.topMembers.should.deep.equal(topMemberResults)
        })
    })

    it('calls memberSearchFailure when the request fails', () => {
      const store = mockStore({ memberSearch: initialState })

      nock(INTERNAL_API)
        .get(/\/leaderboards.*/)
        .reply(500, 'failure')

      return getTopMembers(store.dispatch, { domain: 'SKILLS', id: 391 })
        .catch( () => {
          const storeActions = store.getActions()
          const failureActions = []

          // Actions dispatched by memberSearchFailure function
          failureActions.push(_.some(storeActions, a => a.type === MEMBER_SEARCH_FAILURE))
          failureActions.push(_.some(storeActions, a => a.type === RESET_SEARCH_TERM))

          failureActions[0].should.be.true
          failureActions[1].should.be.true

          // Action dispatched by getTopMembers success callback
          const successAction = _.some(storeActions, a => a.type === TOP_MEMBER_SEARCH_SUCCESS)

          successAction.should.be.false
        })
    })
  })

  describe('memberSearchFailure', () => {
    const store = mockStore({ memberSearch: initialState })

    it(`dispatches ${MEMBER_SEARCH_FAILURE} and ${RESET_SEARCH_TERM}`, () => {
      memberSearchFailure(store.dispatch)

      store.getActions()[0].should.deep.equal({ type: MEMBER_SEARCH_FAILURE })
      store.getActions()[1].should.deep.equal({ type: RESET_SEARCH_TERM })
    })
  })
})
