import 'babel-polyfill'
import React          from 'react'
import { render }     from 'react-dom'
import { Provider }   from 'react-redux'
import browserHistory from 'react-router/lib/browserHistory'
import Router         from 'react-router/lib/Router'

import store  from './config/store'
import routes from './config/routes'

import { configureConnector } from 'tc-accounts'
import { CONNECTOR_URL } from './config/constants'

configureConnector({
  connectorUrl: CONNECTOR_URL,
  frameId: 'tc-accounts-iframe'
})

const mountNode = document.getElementById('root')

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), mountNode)
