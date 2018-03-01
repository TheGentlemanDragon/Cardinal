import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import './templates.styl'

const getTemplates = (games, gameId) => {
  const game = games.find(item => item.name === gameId)
  return (game.templates || []).sort((a, b) => a.name > b.name ? 1 : -1)
}

const Templates = ({ games }) => ({ match }) =>
  <div class="page" container="column #top @stretch">
    <div class="page-title">
      Games > gameId
    </div>

    <div class="list" container="row #left @top">
    {
      getTemplates(games, match.params.gameId)
        .map(item =>
          <Link
              class="item template-item"
              container="column #center @center"
              to={`/templates/${item.name}`}>
            {item.name}
          </Link>
        )
    }
    </div>
  </div>

export default Templates

