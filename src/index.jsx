import { Provider } from 'react-redux'
import browserHistory from 'react-router/lib/browserHistory'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import { render } from 'react-dom'
import store from './config/store'

import MemberSearch from './components/MemberSearch/MemberSearch'
import App from './components/App/App'

const mountNode = document.getElementById('root')

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="search" component={MemberSearch} />
      </Route>
    </Router>
  </Provider>
), mountNode)
