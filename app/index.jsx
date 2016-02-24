import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import store from './config/store'

import MemberSearch from './MemberSearch'
import Nav from './Nav'

const App = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
})

const mountNode = document.getElementById('root')

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/search/members" component={MemberSearch} />
      </Route>
    </Router>
  </Provider>
), mountNode)
