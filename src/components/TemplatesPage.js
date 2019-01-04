import { emitEvent } from 'fluxible-js'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'

import NewTemplateModal from './NewTemplateModal'

const TemplatesPage = ({ game, templates }) => (
  <div key="templates" container="column #top @stretch" flex>
    {/* App Title */}
    <div class="app-title">Cardinal</div>

    {/* Page */}
    <div class="page" container="column #top @stretch">
      {/* Page Title */}
      <div class="page-title">
        <Link to={`/games/`}>Games</Link>
      </div>
      <span class="list-title">{game.name} > Templates</span>

      {/* Templates List */}
      <div class="list" container="row #left @top">
        {templates.map(item => (
          <Link
            key={'templates-list-' + item.$id}
            class="item template-item"
            container="column #center @center"
            to={'/templates/' + item.$ref.id}
          >
            {item.name}
          </Link>
        ))}

        {/* New Template Button and Modal*/}
        <NewTemplateModal gameRef={game.$ref} />
      </div>
    </div>
  </div>
)

TemplatesPage.defaultHooks = {
  onComponentDidMount(domNode, props) {
    const { gameId } = props.match.params
    emitEvent('initTemplatesPage', { gameId })
  },
}

const map = ({ game, templates }) => ({ game, templates })
export default mapStatesToProps(TemplatesPage, map)
