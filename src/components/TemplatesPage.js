import { Component } from 'inferno'
import { connect } from 'inferno-context-api-store'
import { Link } from 'inferno-router'

import { fetchTemplates } from '../modules/actions'

class TemplatesPage extends Component {
  componentWillMount() {
    this.props.fetchTemplates(this.props.match)
  }

  render() {
    const { match, templates } = this.props

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
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  store => ({ templates: store.templates }),
  { fetchTemplates }
)(TemplatesPage)
