import { h } from 'preact'
import { Router } from 'preact-router'
// import Match from 'preact-router/match'

import HomePage from 'routes/home'
import GamePage from 'routes/game'
import TemplatePage from 'routes/template'

import g from './global.css'

export default function App() {
  return (
    <div id="app">
      {/* <Match path="/">
        {({ matches }) => matches && <h1 class={g.title}>Cardinal</h1>}
      </Match> */}

      {/* App Title */}
      <h1 class={g.title}>Cardinal</h1>

      <Router>
        <HomePage path="/" />
        <GamePage path="/games/:gameId" />
        <TemplatePage path="/templates/:templateId" />
        {/* <Profile path="/profile/:user" /> */}
      </Router>
    </div>
  )
}
