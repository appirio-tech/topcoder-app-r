import { combineReducers } from 'redux'
import memberSearch from './memberSearch'
import searchTerm from './searchTerm'
// import * from './reducers'?? to cut down on boilerplate

export default combineReducers({
  memberSearch,
  searchTerm
})
