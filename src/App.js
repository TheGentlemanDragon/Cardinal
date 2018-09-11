import 'inferno'
import Provider from 'inferno-context-api-store'
import { BrowserRouter, Redirect, Route, Switch } from 'inferno-router'

import Games from './components/Games'
import Templates from './components/Templates'
import store from './modules/store'

import './registerServiceWorker'
import './App.css'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      {/* <AssetManager /> */}
      <Switch>
        <Redirect exact from="/" to="/games" />
        <Route exact path="/games" component={Games} />
        <Route exact path="/games/:gameId" render={Templates} />
        {/*<Route path="/templates/:templateId" render={Template(state, actions)} /> */}
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App
