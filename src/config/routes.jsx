import React from 'react'
import Route from 'react-router/lib/Route'
import { refreshAuth } from './auth'

import App             from '../components/App/App'
import MemberSearch    from '../components/MemberSearch/MemberSearch'
import ChallengeSearch from '../components/ChallengeSearch/ChallengeSearch'

export default (
  <Route path="/" component={App} onEnter={refreshAuth} >
    <Route path="search/challenges" component={ChallengeSearch} />

    <Route path="search/members" component={MemberSearch} />
  </Route>
)
