import { h, app } from 'hyperapp'
import {
  Link,
  location,
  Redirect,
  Route,
  Switch,
} from '@hyperapp/router'

import { Games } from './Games'
import { Templates } from './Templates'
import { Editor, SideBar, Template } from './Template'

const state = {
  location: location.state,
  ...Editor.state,
  ...Games.state,
  ...Templates.state,
  ...Template.state,
  ...SideBar.state,
}

const actions = {
  location: location.actions,
  ...Editor.actions,
  ...Games.actions,
  ...Templates.actions,
  ...Template.actions,
  ...SideBar.actions,
}

const view = (state, actions) =>
  <div container="row #left @stretch" flex>
    <Route path="/" render={() => Redirect({ from:'/', to:'/games' })} />
    <Route path="/games" render={Games(state, actions)} />
    <Route path="/games/:gameId" render={Templates(state, actions)} />
    <Route path="/templates/:templateId" render={Template(state, actions)} />
  </div>

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
