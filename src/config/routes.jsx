import React from 'react'
import Route from 'react-router/lib/Route'
import { checkAuth } from './auth'

import App             from '../components/App/App'
import MemberSearch    from '../components/MemberSearch/MemberSearch'
import ChallengeSearch from '../components/ChallengeSearch/ChallengeSearch'

export default (
  <Route path="/" component={App} onEnter={checkAuth}>
    <Route path="search/challenges" component={ChallengeSearch} />

    <Route path="search/members" component={MemberSearch} />
  </Route>
)
