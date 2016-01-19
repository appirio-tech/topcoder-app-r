import React from 'react'
import { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link } from 'react-router'

const App = React.createClass({
  render: function() {
    return (
      <div>Hello, Nick</div>
    )
  }
})

const Home = React.createClass({
  render: function() {
    return (
      <div>At home</div>
    )
  }
})

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="home" component={Home}/>
    </Route>
  </Router>
), document.getElementById('root'))
