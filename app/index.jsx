import React from 'react'
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

const Search = React.createClass({
  render: function() {
    return (
      <div>
        <MemberSearch></MemberSearch>
      </div>
    )
  }
})

const MemberSearch = React.createClass({
  render: function() {
    return (
      <div>Member Search Page</div>
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
