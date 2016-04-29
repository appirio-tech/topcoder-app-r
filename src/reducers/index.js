import { combineReducers } from 'redux'
import user from './user'
import memberSearch from './memberSearch'
import searchTerm from './searchTerm'

export default combineReducers({
  user,
  memberSearch,
  searchTerm
})
