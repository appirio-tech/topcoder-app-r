// Actions

// Search
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_SEARCH_TAG  = 'SET_SEARCH_TAG'

// Member Search
export const START_MEMBER_SEARCH       = 'START_MEMBER_SEARCH'
export const CLEAR_MEMBER_SEARCH       = 'CLEAR_MEMBER_SEARCH'
export const USERNAME_SEARCH_SUCCESS   = 'USERNAME_SEARCH_SUCCESS'
export const USERNAME_SEARCH_FAILURE   = 'USERNAME_SEARCH_FAILURE'
export const TOP_MEMBER_SEARCH_SUCCESS = 'TOP_MEMBER_SEARCH_SUCCESS'
export const TOP_MEMBER_SEARCH_FAILURE = 'TOP_MEMBER_SEARCH_FAILURE'

// Urls
export const memberSearchUrl = ' https://xsmjngybcg.execute-api.us-east-1.amazonaws.com/dev/v3/members/_search'
export const memberSearchTagUrl = 'https://search-topcoder-squ62azmqlwkvnmztjmk4cq5fq.us-east-1.es.amazonaws.com/tags/_search'
export const challengeSearchUrl = 'https://ol348e2ya5.execute-api.us-east-1.amazonaws.com/dev'


// Get paramterized domain from process.env.API_URL_***
// Detect if a search term is a tag
// https://xsmjngybcg.execute-api.us-east-1.amazonaws.com/dev/v3/tags/?filter=name%3Djava

// Auto suggest for keywords
// https://xsmjngybcg.execute-api.us-east-1.amazonaws.com/dev/v3/tags/_suggest?q=jav

// Challenge search
// https://ol348e2ya5.execute-api.us-east-1.amazonaws.com/dev


// https://internal.api.topcoder-dev.com/v3/leaderboards/?filter=name%3Djava%26type%3DMEMBER_SKILL
