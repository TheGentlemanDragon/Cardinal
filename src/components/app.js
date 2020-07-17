import { h } from 'preact'
import { Router } from 'preact-router'
// import Match from 'preact-router/match'

import { HomePage, TemplatesPage, EditorPage } from 'components/Pages'

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
        <TemplatesPage path="/games/:gameId" />
        <EditorPage path="/games/:gameId/templates/:templateId" />
        {/* <Profile path="/profile/:user" /> */}
      </Router>
    </div>
  )
}
