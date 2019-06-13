import 'inferno'
import { BrowserRouter, Redirect, Route, Switch } from 'inferno-router'

import AssetsPage from './components/AssetsPage'
import GamesPage from './components/GamesPage'
import TemplatePage from './components/TemplatePage'
import TemplatesPage from './components/TemplatesPage'
import { Firebase } from './modules/data'

import './modules/store'
import './modules/events'
import './registerServiceWorker'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/assets/:gameId" component={AssetsPage} />
      <Route path="/templates/:templateId" component={TemplatePage} />
      <Route path="/games/:gameId" component={TemplatesPage} />
      <Route path="/games" component={GamesPage} />
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
