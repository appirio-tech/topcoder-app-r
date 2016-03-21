import React from 'react'
import Route from 'react-router/lib/Route'

import App             from './components/App/App'
import MemberSearch    from './containers/MemberSearch'
import ChallengeSearch from './containers/ChallengeSearch'

export default (
  <Route path="/" component={App}>
    <Route path="search/challenges" component={ChallengeSearch} />

    <Route path="search/members" component={MemberSearch} />
  </Route>
)
