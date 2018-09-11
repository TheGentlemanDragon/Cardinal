import { h, app } from 'hyperapp'
import { Link, location, Redirect, Route, Switch } from '@hyperapp/router'
import devtools from 'hyperapp-redux-devtools'

import AssetManager from './components/AssetManager'
import Games from './pages/Games'
import Template from './pages/Template'
import Templates from './pages/Templates'

// import static assets
import './assets/fonts.css'
import './assets/styles.styl'

import appState from './modules/state'
import appActions from './modules/actions'

appState.location = location.state
appActions.location = location.actions

const view = (state, actions) => (
  <div container="row #left @stretch" flex>
    <AssetManager />
    <Route path="/" render={() => Redirect({ from: '/', to: '/games' })} />
    <Route path="/games" render={Games(state, actions)} />
    <Route path="/games/:gameId" render={Templates(state, actions)} />
    <Route path="/templates/:templateId" render={Template(state, actions)} />
  </div>
)

const main = devtools(app)(appState, appActions, view, document.body)
const unsubscribe = location.subscribe(main.location)
