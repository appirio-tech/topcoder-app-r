import Q from 'q'

const initialState = { term: '' }

export function searchForTerm(state = initialState, action) {
  const deferred = Q.defer()

  switch (action.type) {
  case 'SEARCH_UPDATED':
    return { term: action.text }
  }

  return state
}
