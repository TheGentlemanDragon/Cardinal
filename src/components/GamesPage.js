import { Component } from 'inferno'
import { connect } from 'inferno-context-api-store'
import { Link } from 'inferno-router'

import { clearTemplates, fetchGames } from '../modules/actions'

class GamesPage extends Component {
  componentDidMount() {
    if (!this.props.games.size) {
      this.props.fetchGames()
    }

    if (this.props.templates.size) {
      this.props.clearTemplates()
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.games !== nextProps.games) {
      return true
    }
  }

  render() {
    const { games } = this.props

    return (
      <div key="games" container="column #top @stretch" flex>
        {/* App Title */}
        <div class="app-title">Cardinal</div>

        {/* Page */}
        <div class="page" container="column #top @stretch">
          {/* Page Title */}
          <div class="page-title">Games</div>

          {/* Games List */}
          <div class="list" container="row #left @top">
            {[...games].map(item => (
              <Link
                key={item.$id}
                class="item game-item"
                container="column #center @center"
                to={'/games/' + item.name}
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
  store => ({ games: store.games, templates: store.templates }),
  { clearTemplates, fetchGames }
)(GamesPage)
