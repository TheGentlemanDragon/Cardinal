import 'inferno'
import { BrowserRouter, Redirect, Route, Switch } from 'inferno-router'

import Assets from './pages/Assets'
import Games from './pages/Games'
import Template from './pages/Template'
import Templates from './pages/Templates'
import { Firebase } from './modules/data'

import './modules/store'
import './modules/events'
import './registerServiceWorker'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/assets/:gameId" component={Assets} />
      <Route path="/templates/:templateId" component={Template} />
      <Route path="/games/:gameId" component={Templates} />
      <Route path="/games" component={Games} />
      <Redirect from="/" to="/games" />
    </Switch>
  </BrowserRouter>
)

App.defaultHooks = {
  async onComponentWillMount() {
    Firebase.setOwner('nando')
  },
}

export default App
