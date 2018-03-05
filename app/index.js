import { h, app } from 'hyperapp'
import {
  Link,
  location,
  Redirect,
  Route,
  Switch,
} from '@hyperapp/router'

import Games from './Games'
import Templates from './Templates'
import Template from './Template'

const state = {
  location: location.state,
  games: [
    { name: 'lmn' },
    { name: 'bcd' },
    { name: 'xyz', templates: [{ name: '123' }, { name: '567' }] },
    { name: 'cde' },
    { name: 'abc', templates: [{ name: '234' }, { name: '567' }] },
  ]
}

const actions = {
  location: location.actions,
  // up: value => state => ({ count: state.count + value }),
}

const view = (state, actions) =>
  <Switch>
    <Route path="/" render={() => Redirect({ from:'/', to:'/games' })} />
    <Route path="/games" render={Games(state)} />
    <Route path="/games/:gameId" render={Templates(state)} />
    <Route path="/templates/:templateId" render={Template(state)} />
  </Switch>

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
