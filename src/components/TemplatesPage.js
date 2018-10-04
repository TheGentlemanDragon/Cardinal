import { Component, linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'
import { Link } from 'inferno-router'

import NewTemplateModal from './NewTemplateModal'
import { fetchTemplates, setGame, showModal } from '../modules/actions'

class TemplatesPage extends Component {
  componentWillMount() {
    const game = this.props.match.params.gameId || ''
    this.props.setGame(game)
    this.props.fetchTemplates(game)
  }

  render() {
    const { match, showModal, templates } = this.props

    return (
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
            {[...templates].map(item => (
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
              onClick={linkEvent('newTemplate', showModal)}
            >
              + Template
            </div>
          </div>
        </div>

        <NewTemplateModal />
      </div>
    )
  }
}

export default connect(
  store => ({ templates: store.templates }),
  { fetchTemplates, setGame, showModal }
)(TemplatesPage)
