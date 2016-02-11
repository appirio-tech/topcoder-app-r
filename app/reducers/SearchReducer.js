const initialState = { term: 'initial term' }

export default function(state = initialState, action) {
  switch(action.type) {
  case 'SEARCH_UPDATED':
    return { term: action.payload }
  }

  return state
}
