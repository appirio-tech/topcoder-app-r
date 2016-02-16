import Q from 'q'

const initialState = { term: '' }

export function searchForTerm(state = initialState, action) {
  const deferred = Q.defer()

  switch (action.type) {
  case 'SEARCH_UPDATED':
    return { term: deferred.promise }
  }

  return state
}
