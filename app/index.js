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

const pageClass = path => 'page ' + path.substr(1)

const toTitleCase = str => str.charAt(0).toUpperCase() + str.substr(1)

const toTitleLink = path => {
  const [main, sub] = path.substr(1).split('/')
  return sub
    ? [<Link to={'/' + main}>{main}</Link>, <span> > {sub}</span>]
    : main
}

const view = (state, actions) =>
  <div id="main" container="column #top @stretch">

    <div class="app-title">
      Cardinal
    </div>

    <Switch>
      <Route path="/" render={() => Redirect({ from:'/', to:'/games' })} />
      <Route path="/games" render={Games(state)} />
      <Route path="/games/:gameId" render={Templates(state)} />
      <Route path="/templates/:templateId" render={Template(state)} />
    </Switch>

  </div>

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
