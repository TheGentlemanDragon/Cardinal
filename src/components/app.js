import { h } from 'preact'
import { Router } from 'preact-router'

// Code-splitting is automated for routes
import Home from 'routes/home'
// import Profile from '../routes/profile'

import s from './global.css'

export default function App() {
  return (
    <div id="app">
      {/* App Title */}
      <h1 class={s.title}>Cardinal</h1>

      <Router>
        <Home path="/" />
        {/* <Profile path="/profile/" user="me" />
        <Profile path="/profile/:user" /> */}
      </Router>
    </div>
  )
}
