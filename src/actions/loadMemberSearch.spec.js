import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('loadMemberSearch Actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('clearMemberSearch', () => {
    mockStore({
      memberSearch: {

      }
    })

    it('should run a fake test', () => {
      const myString = 'hello'
      myString.should.be.a('string')
    })
  })
})
