/*
 * ACTION CONSTANTS
 */

// Current Logged in User
export const SET_USER    = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

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

// Accounts URLs
export const CONNECTOR_URL = `https://accounts.${DOMAIN}/connector.html`
export const ACCOUNTS_URL = `https://accounts.${DOMAIN}/tc`

// FIXME: Change to process.env.INTERNAL_API after added to webpack
export const INTERNAL_API = `https://internal-api.${DOMAIN}/v3`

export const memberSearchTagUrl = `${INTERNAL_API}/tags/`

export const memberSearchUrl = `${INTERNAL_API}/members/_search/`
export const challengeSearchUrl = 'https://ol348e2ya5.execute-api.us-east-1.amazonaws.com/dev'

export const leaderboardUrl = `${INTERNAL_API}/leaderboards/`
