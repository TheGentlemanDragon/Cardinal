import { emitEvent } from 'fluxible-js'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'

import NewTemplateModal from './NewTemplateModal'

const getGames = () =>
  emitEvent('fetchState', {
    collection: 'games',
    sortKey: 'name',
  })

const getTemplates = game =>
  emitEvent('queryState', {
    collection: 'templates',
    query: { game },
    sortKey: 'name',
    game,
  })

const showModal = () => emitEvent('setState', { modal: 'newTemplate' })

const TemplatesPage = ({ match, templates }) => (
  <div key="templates" container="column #top @stretch" flex>
    {/* App Title */}
    <div class="app-title">Cardinal</div>

    {/* Page */}
    <div class="page" container="column #top @stretch">
      {/* Page Title */}
      <div class="page-title">
        <Link to={`/games/`}>Games</Link>
      </div>
      <span class="list-title">{match.params.gameId} > Templates</span>

      {/* Templates List */}
      <div class="list" container="row #left @top">
        {[...templates]
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map(item => (
            <Link
              key={item.$id}
              class="item template-item"
              container="column #center @center"
              to={'/templates/' + item.$ref.id}
            >
              {item.name}
            </Link>
          ))}

        {/* New Template */}
        <div
          key="new-template"
          class="item template-add"
          container="column #center @center"
          onClick={showModal}
        >
          + Template
        </div>
      </div>
    </div>

    <NewTemplateModal />
  </div>
)

TemplatesPage.defaultHooks = {
  onComponentWillMount(props) {
    // Fetch games if empty
    if (!props.games.size) {
      getGames()
    }

    getTemplates(props.match.params.gameId)
  },

  onComponentShouldUpdate(prevProps, newProps) {
    // Only update when number of templates changes
    return prevProps.templates.size !== newProps.templates.size
  },
}

const map = ({ games = new Map(), templates = new Map() }) => ({
  games,
  templates,
})
export default mapStatesToProps(TemplatesPage, map)
