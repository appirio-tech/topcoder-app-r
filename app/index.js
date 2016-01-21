import React from 'react'
import { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route } from 'react-router'

const App = React.createClass({
  render: function() {
    return (
      <Search></Search>
    )
  }
})

const Search = React.createClass({
  render: function() {
    return (
      <div>Search Page</div>
    )
  }
})

render((
  <Router history={createBrowserHistory()}>
    <Route path="/search" component={App}>
    </Route>
  </Router>
), document.getElementById('root'))
