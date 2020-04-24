import { h } from 'preact'
import { Router } from 'preact-router'
import Match from 'preact-router/match'

import Home from 'routes/home'
import Game from 'routes/game'

import g from './global.css'

export default function App() {
  return (
    <div id="app">
      {/* App Title */}
      <Match path="/">
        {({ matches }) => matches && <h1 class={g.title}>Cardinal</h1>}
      </Match>

      <Router>
        <Home path="/" />
        <Game path="/:gameId" />
        {/* <Profile path="/profile/:user" /> */}
      </Router>
    </div>
  )
}
