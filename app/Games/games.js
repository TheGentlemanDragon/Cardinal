import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import './games.styl'

const Games = ({ games }) => ({ location, match }) =>
  <div container="column #top @stretch" flex>

    {/* App Title */}
    <div class="app-title">Cardinal</div>

    {/* Page */}
    <div class="page" container="column #top @stretch">

      {/* Page Title */}
      <div class="page-title">Games</div>

      {/* Games List */}
      <div class="list" container="row #left @top">
      {
        [...games].sort((a, b) => a.name > b.name ? 1 : -1).map(item =>
          <Link
              class="item game-item"
              container="column #center @center"
              to={`games/${item.name}`}>
            {item.name}
          </Link>
        )
      }
      </div>
    </div>
  </div>

export default Games
