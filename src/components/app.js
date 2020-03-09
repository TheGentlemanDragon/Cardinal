import { h } from 'preact'
import { Router } from 'preact-router'

import Header from './header'

// Code-splitting is automated for routes
import Home from '../routes/home'
import Profile from '../routes/profile'

export default function App() {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  //   handleRoute = e => {
  //     this.currentUrl = e.url
  //   }

  return (
    <div id="app">
      <Header />
      <Router>
        <Home path="/" />
        <Profile path="/profile/" user="me" />
        <Profile path="/profile/:user" />
      </Router>
    </div>
  )
}
