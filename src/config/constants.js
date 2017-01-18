/*
 * ACTIONS
 */

// Search Term
export const SET_SEARCH_TERM   = 'SET_SEARCH_TERM'
export const SET_SEARCH_TAG    = 'SET_SEARCH_TAG'
export const RESET_SEARCH_TERM = 'RESET_SEARCH_TERM'

// Member Search
export const CLEAR_MEMBER_SEARCH       = 'CLEAR_MEMBER_SEARCH'
export const MEMBER_SEARCH_FAILURE     = 'MEMBER_SEARCH_FAILURE'
export const MEMBER_SEARCH_SUCCESS     = 'MEMBER_SEARCH_SUCCESS'
export const LOAD_MORE_USERNAMES       = 'LOAD_MORE_USERNAMES'
export const USERNAME_SEARCH_SUCCESS   = 'USERNAME_SEARCH_SUCCESS'
export const TOP_MEMBER_SEARCH_SUCCESS = 'TOP_MEMBER_SEARCH_SUCCESS'

/*
 * URLs
 */

export const DOMAIN = process.env.domain || 'topcoder.com'

export const V3_API = `https://api.${DOMAIN}/v3`

export const memberSearchTagUrl = `${V3_API}/tags/`

export const memberSearchUrl = `${V3_API}/members/_search/`
export const challengeSearchUrl = 'https://ol348e2ya5.execute-api.us-east-1.amazonaws.com/dev'

export const leaderboardUrl = `${V3_API}/leaderboards/`
