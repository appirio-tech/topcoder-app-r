import _ from 'lodash'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { initialState } from '../reducers/memberSearch.js'
import { initialState as searchTermInitialState } from '../reducers/searchTerm.js'
import { V3_API } from '../config/constants.js'

import {
  loadMemberSearch, checkIfSearchTermIsATag,
  getUsernameMatches, getTopMembers,
  memberSearchFailure
} from './loadMemberSearch.js'

import {
  CLEAR_MEMBER_SEARCH, LOAD_MORE_USERNAMES,
  USERNAME_SEARCH_SUCCESS, MEMBER_SEARCH_FAILURE,
  TOP_MEMBER_SEARCH_SUCCESS, RESET_SEARCH_TERM,
  SET_SEARCH_TAG, SET_SEARCH_TERM, MEMBER_SEARCH_SUCCESS
} from '../config/constants'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('loadMemberSearch Actions:', () => {
  const mockTag = {
    categores: ['DEVELOP'],
    domain: 'SKILLS',
    id: 247,
    name: 'Java',
    priority: 14,
    status: 'APPROVED'
  }
  const usernameMatchResults = _.range(10)
  const topMemberResults = ['topMember1', 'topMember2']

  const mockSuccessfulTagAPICall = () => {
    nock(V3_API)
      .get(/\/tags/)
      .reply(200, { result: {
        content: [mockTag]
      }})
  }

  const mockSuccessfulUsernameMatchesAPICall = () => {
    nock(V3_API)
      .get(/\/members\/_search/)
      .reply(200, { result: {
        content: usernameMatchResults,
        metadata: { totalCount: 30 }
      }})
  }

  const mockSuccessfulTopMembersAPICall = () => {
    nock(V3_API)
      .get(/\/leaderboards\/\?filter/)
      .reply(200, { result: { content: topMemberResults } })
  }

  afterEach(() => {
    nock.cleanAll()
  })

  describe('loadMemberSearch', () => {
    it(`dispatches ${CLEAR_MEMBER_SEARCH} if the search term is new`, () => {
      const store = mockStore({
        memberSearch: initialState,
        searchTerm: {
          previousSearchTerm: 'Python',
          searchTermTag: mockTag
        }
      })

      nock(V3_API)
        .get(/\/tags/)
        .reply(200, { result: { content: [] }})

      mockSuccessfulUsernameMatchesAPICall()

      return loadMemberSearch('luke%20skywalker')(store.dispatch, store.getState)
        .then( () => {
          const storeActions = store.getActions()

          const clearAction = _.some(storeActions, a => a.type === CLEAR_MEMBER_SEARCH)

          clearAction.should.be.true
        })
    })

    it(`dispatches ${LOAD_MORE_USERNAMES} and calls getUsernameMatches when loading more usernames`, () => {
      const mockStoreData = {
        memberSearch: initialState,
        searchTerm: {
          previousSearchTerm: 'Java',
          searchTermTag: mockTag
        }
      }
      mockStoreData.memberSearch.usernameMatches = _.range(10)
      mockStoreData.memberSearch.moreMatchesAvailable = true
      mockStoreData.memberSearch.totalCount = 342

      const store = mockStore({
        memberSearch: initialState,
        searchTerm: {
          previousSearchTerm: 'Java',
          searchTermTag: mockTag
        }
      })

      mockSuccessfulTagAPICall()
      mockSuccessfulUsernameMatchesAPICall()

      return loadMemberSearch('Java')(store.dispatch, store.getState)
        .then( () => {
          const storeActions = store.getActions()

          const loadMoreAction = _.some(storeActions, a => a.type === LOAD_MORE_USERNAMES)
          const successAction = _.some(storeActions, a => a.type === USERNAME_SEARCH_SUCCESS)

          loadMoreAction.should.be.true
          successAction.should.be.true
        })
    })

    it(`dispatches ${SET_SEARCH_TERM}, ${SET_SEARCH_TAG}, ${USERNAME_SEARCH_SUCCESS}, ${TOP_MEMBER_SEARCH_SUCCESS}, and ${MEMBER_SEARCH_SUCCESS} when searching for a new tag`, () => {
      mockSuccessfulTagAPICall()
      mockSuccessfulUsernameMatchesAPICall()
      mockSuccessfulTopMembersAPICall()

      const store = mockStore({
        memberSearch: initialState,
        searchTerm: searchTermInitialState
      })

      return loadMemberSearch('Java')(store.dispatch, store.getState)
        .then( () => {
          const storeActions = store.getActions()

          const searchTermAction = _.some(storeActions, a => a.type === SET_SEARCH_TERM)
          const searchTagAction = _.some(storeActions, a => a.type === SET_SEARCH_TAG)
          const usernamesAction = _.some(storeActions, a => a.type === USERNAME_SEARCH_SUCCESS)
          const topMembersAction = _.some(storeActions, a => a.type === TOP_MEMBER_SEARCH_SUCCESS)
          const successAction = _.some(storeActions, a => a.type === MEMBER_SEARCH_SUCCESS)

          searchTermAction.should.be.true
          searchTagAction.should.be.true
          usernamesAction.should.be.true
          topMembersAction.should.be.true
          successAction.should.be.true
        })
    })
  })

  describe('checkIfSearchTermIsATag', () => {
    it('returns the tag data when the request succeeds', () => {
      const store = mockStore({ memberSearch: initialState })

      mockSuccessfulTagAPICall()

      return checkIfSearchTermIsATag(store.dispatch, 'Java')
        .then( (data) => {
          data.should.deep.equal(mockTag)
        })
    })

    it('calls memberSearchFailure when the request fails', () => {
      const store = mockStore({ memberSearch: initialState })

      nock(V3_API)
        .get(/\/tags/)
        .reply(500, 'failure')

      return checkIfSearchTermIsATag(store.dispatch, 'Java')
        .catch( () => {
          const storeActions = store.getActions()
          const failureActions = []

          // Actions dispatched by memberSearchFailure function
          failureActions.push(_.some(storeActions, a => a.type === MEMBER_SEARCH_FAILURE))
          failureActions.push(_.some(storeActions, a => a.type === RESET_SEARCH_TERM))

          failureActions[0].should.be.true
          failureActions[1].should.be.true

          // Action dispatched by getTopMembers success callback
          const successAction = _.some(storeActions, a => a.type === MEMBER_SEARCH_SUCCESS)

          successAction.should.be.false
        })
    })
  })

  describe('getUsernameMatches', () => {
    it(`dispatches ${USERNAME_SEARCH_SUCCESS} with results when the request succeeds`, () => {

      const store = mockStore({ memberSearch: initialState })

      mockSuccessfulUsernameMatchesAPICall()

      return getUsernameMatches(store.dispatch, 'luke%20skywalker')
        .then( () => {
          const successAction = _.find(store.getActions(), a => a.type === USERNAME_SEARCH_SUCCESS)

          successAction.usernameMatches.should.deep.equal(usernameMatchResults)
          successAction.totalCount.should.equal(30)
        })
    })

    it(`dispatches ${MEMBER_SEARCH_FAILURE} when the request fails`, () => {
      const store = mockStore({ memberSearch: initialState })

      nock(V3_API)
        .get(/\/members\/_search/)
        .reply(500, 'failure')

      return getUsernameMatches(store.dispatch, 'luke%20skywalker')
        .catch( () => {
          const storeActions = store.getActions()

          // Actions dispatched by memberSearchFailure function
          const failureAction = _.some(storeActions, a => a.type === MEMBER_SEARCH_FAILURE)

          failureAction.should.be.true

          // Action dispatched by getTopMembers success callback
          const successAction = _.some(storeActions, a => a.type === USERNAME_SEARCH_SUCCESS)

          successAction.should.be.false
        })
    })
  })

  describe('getTopMembers', () => {
    it(`dispatches ${TOP_MEMBER_SEARCH_SUCCESS} with results when the request succeeds`, () => {
      const store = mockStore({ memberSearch: initialState })

      mockSuccessfulTopMembersAPICall()

      return getTopMembers(store.dispatch, { domain: 'SKILLS', id: 391 })
        .then( () => {
          const successAction = _.find(store.getActions(), a => a.type === TOP_MEMBER_SEARCH_SUCCESS)

          successAction.topMembers.should.deep.equal(topMemberResults)
        })
    })

    it('calls memberSearchFailure when the request fails', () => {
      const store = mockStore({ memberSearch: initialState })

      nock(V3_API)
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
