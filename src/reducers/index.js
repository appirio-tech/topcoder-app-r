import { combineReducers } from 'redux'
import memberSearch from './memberSearch'
import searchTerm from './searchTerm'

export default combineReducers({
  memberSearch,
  searchTerm
})
