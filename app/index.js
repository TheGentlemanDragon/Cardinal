import { h, app } from 'hyperapp'
import {
  Link,
  location,
  Redirect,
  Route,
  Switch,
} from '@hyperapp/router'

import { Games, gamesActions } from './Games'
import { Templates, templatesActions } from './Templates'
import { Template, templateActions } from './Template'

const state = {
  location: location.state,
  games: [],
  templates:[],
  template: {},
}

const actions = {
  location: location.actions,
  ...gamesActions,
  ...templatesActions,
  ...templateActions,
}

const view = (state, actions) =>
  <Switch>
    <Route path="/" render={() => Redirect({ from:'/', to:'/games' })} />
    <Route path="/games" render={Games(state, actions)} />
    <Route path="/games/:gameId" render={Templates(state, actions)} />
    <Route path="/templates/:templateId" render={Template(state, actions)} />
  </Switch>

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
