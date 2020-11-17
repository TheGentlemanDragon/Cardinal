import { h } from 'preact'
import { Router } from 'preact-router'
// import Match from 'preact-router/match'

import { HomePage } from '../pages/HomePage'
import { TemplatesPage } from '../pages/TemplatesPage'
import { EditorPage } from '../pages/EditorPage'

import './global.css'

export default function App() {
  return (
    <div id="app">
      {/* <Match path="/">
        {({ matches }) => matches && <h1 class={g.title}>Cardinal</h1>}
      </Match> */}

      <Router>
        <HomePage path="/" />
        <TemplatesPage path="/games/:gameId" />
        <EditorPage path="/games/:gameId/templates/:templateId" />
        {/* <Profile path="/profile/:user" /> */}
      </Router>
    </div>
  )
}
