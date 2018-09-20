import 'inferno'
import Provider from 'inferno-context-api-store'
import { BrowserRouter, Redirect, Route, Switch } from 'inferno-router'

import GamesPage from './components/GamesPage'
import TemplatePage from './components/TemplatePage'
import TemplatesPage from './components/TemplatesPage'
import store from './modules/store'

import './registerServiceWorker'
import './App.css'

const App = () => (
  <Provider store={store} defer={100}>
    <BrowserRouter>
      <Switch>
        <Route path="/templates/:templateId" render={TemplatePage} />
        <Route path="/games/:gameId" render={TemplatesPage} />
        <Route path="/games" component={GamesPage} />
        <Redirect from="/" to="/games" />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App
