// Actions

// Member Search
export const MEMBER_SEARCH_REQUEST = 'MEMBER_SEARCH_REQUEST'
export const MEMBER_SEARCH_SUCCESS = 'MEMBER_SEARCH_SUCCESS'
export const MEMBER_SEARCH_FAILURE = 'MEMBER_SEARCH_FAILURE'

// Urls
export const memberSearchUrl = 'http://search-tc-members-jmrdk5a3saqrjcyc23cs5bgkje.us-east-1.es.amazonaws.com/members/_search'
export const memberSearchTagUrl = 'http://search-topcoder-squ62azmqlwkvnmztjmk4cq5fq.us-east-1.es.amazonaws.com/tags/_search'

// body: JSON.stringify({
  // query: {
  //   nested: {
  //     path: 'skills',
  //     query: {
  //       match: {'skills.name': 'python'}
  //     }
  //   }
  // },
  // sort: [
  //   {'maxRating.rating': 'desc'}
  // ]
  // _source: {
    // include: ['userId', 'handle', 'maxRating.rating']
  // }
// })