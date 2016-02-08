import React from 'react'
import Search from './Search'
import MemberSearch from './MemberSearch'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

const App = React.createClass({
  render: function() {
    return (
      <Search>
      </Search>
    )
  }
})

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/search" component={Search}>
        <Route path="/search/members" component={MemberSearch} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))
