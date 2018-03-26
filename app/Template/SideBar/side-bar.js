import { h } from 'hyperapp'
import { Compose } from '../'
import './side-bar.styl'

export const SideBar = () => (state, actions) =>
  <div key="sidebar" class="sidebar" container="column #top @stretch">

    {/* Bar Title */}
    <div class="sidebar-title">Cardinal</div>

    {/* Tabs */}
    <div class="sidebar-tabs" container="row #spaced @middle">
      <button
          class={state.tab === 'compose' && 'active'}
          onclick={() => actions.setTab('compose')}>
        Compose
      </button>

      <button
          class={state.tab === 'preview' && 'active'}
          onclick={() => actions.setTab('preview')}>
        Preview
      </button>
    </div>

    {state.tab === 'compose' ? <Compose />: <h2>Preview</h2>}
  </div>


SideBar.state = {
  tab: 'compose',
}

SideBar.actions = {
  setTab: value => state => ({ ...state, tab: value }),
}
