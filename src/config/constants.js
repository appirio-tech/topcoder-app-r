// Actions

// Search Term
export const SET_SEARCH_TERM   = 'SET_SEARCH_TERM'
export const SET_SEARCH_TAG    = 'SET_SEARCH_TAG'
export const RESET_SEARCH_TERM = 'RESET_SEARCH_TERM'

// Member Search
export const START_MEMBER_SEARCH       = 'START_MEMBER_SEARCH'
export const CLEAR_MEMBER_SEARCH       = 'CLEAR_MEMBER_SEARCH'
export const MEMBER_SEARCH_FAILURE     = 'MEMBER_SEARCH_FAILURE'
export const USERNAME_SEARCH_SUCCESS   = 'USERNAME_SEARCH_SUCCESS'
export const TOP_MEMBER_SEARCH_SUCCESS = 'TOP_MEMBER_SEARCH_SUCCESS'

// Urls
export const memberSearchTagUrl = 'https://search-topcoder-squ62azmqlwkvnmztjmk4cq5fq.us-east-1.es.amazonaws.com/tags/_search'

export const memberSearchUrl = 'https://internal-api.topcoder-dev.com/v3/members/_search/'
export const challengeSearchUrl = 'https://ol348e2ya5.execute-api.us-east-1.amazonaws.com/dev'

// FIXME: parameterize
export const leaderboardUrl = 'https://internal-api.topcoder-dev.com/v3/leaderboards/'

// Detect if a search term is a tag
// https://xsmjngybcg.execute-api.us-east-1.amazonaws.com/dev/v3/tags/?filter=name%3Djava

// Auto suggest for keywords
// https://xsmjngybcg.execute-api.us-east-1.amazonaws.com/dev/v3/tags/_suggest?q=jav

// Challenge search
// https://ol348e2ya5.execute-api.us-east-1.amazonaws.com/dev

