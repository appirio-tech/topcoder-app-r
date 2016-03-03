import fetch from 'isomorphic-fetch'

export const MEMBER_SEARCH_REQUEST = 'MEMBER_SEARCH_REQUEST'
export const MEMBER_SEARCH_SUCCESS = 'MEMBER_SEARCH_SUCCESS'
export const MEMBER_SEARCH_FAILURE = 'MEMBER_SEARCH_FAILURE'

export default function loadMemberSearch(searchTerm) {
  const memberSearchUrl = 'http://search-tc-members-jmrdk5a3saqrjcyc23cs5bgkje.us-east-1.es.amazonaws.com/members/_search'

  const memberSearchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: {
        nested: {
          path: 'skills',
          query: {
            match: {'skills.name': 'python'}
          }
        }
      },
      sort: [
        {'maxRating.rating': 'desc'}
      ]
      // _source: {
        // include: ['userId', 'handle', 'maxRating.rating']
      // }
      // query: {
      //   match: { handle: searchTerm }
      // }
    })
  }


  return (dispatch => {
    dispatch({ type: MEMBER_SEARCH_REQUEST })

    const mockIdentifyTagRequest = new Promise()

    mockIdentifyTagRequest
    .then(response => {
      console.log('response?????????? ', response)
      // make 1 or 2 searches for members (and top members)

      fetch(memberSearchUrl, memberSearchOptions)
      .then(status)
      .then(json)
      .then(data => {
        console.log('rawData: ', data)
        const memberSearchResults = data.hits.hits.map(m => m._source)

        console.log('member response: ')
        console.log(memberSearchResults)

        dispatch({
          type: MEMBER_SEARCH_SUCCESS,
          memberSearchResults
        })
      })
    })
    .catch(err => {
      console.log('ERROR: ', err)
    })
  })
}

function status(response) {
  if (response.status >= 200 && response.status < 400) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}
