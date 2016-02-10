import Nav from './Nav'
import MemberSearch from './MemberSearch'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const App = React.createClass({
  render: function() {
    return (
      <Nav />
    )
  }
})

const createStoreWithMiddleware = applyMiddleware()(createStore)

render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/search/members" component={MemberSearch} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
