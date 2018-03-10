import { h, app } from 'hyperapp'
import {
  Link,
  location,
  Redirect,
  Route,
  Switch,
} from '@hyperapp/router'

import { Games, gamesActions } from './Games'

import Templates from './Templates'
import Template from './Template'

const state = {
  location: location.state,
  games: []
}

const actions = {
  location: location.actions,
  ...gamesActions
}

const view = (state, actions) =>
  <Switch>
    <Route path="/" render={() => Redirect({ from:'/', to:'/games' })} />
    <Route path="/games" render={Games(state, actions)} />
    <Route path="/games/:gameId" render={Templates(state)} />
    <Route path="/templates/:templateId" render={Template(state)} />
  </Switch>

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
