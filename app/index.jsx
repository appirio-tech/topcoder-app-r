import Nav from './Nav'
import MemberSearch from './MemberSearch'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const middleware = [thunk]

if (process.env.ENV === 'DEV') {
  const createLogger = require('redux-logger')
  const logger = createLogger()
  middleware.push(logger)
}


const store = createStore(
  reducers,
  applyMiddleware(
    ...middleware
  )
)

const App = React.createClass({
  render: function() {
    return (
      <Nav />
    )
  }
})

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/search/members" component={MemberSearch} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
