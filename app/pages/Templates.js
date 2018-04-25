import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import './Templates.styl'

export default ({ templates }, { fetchTemplates, setTemplates }) => ({
  match,
}) => (
  <div
    key="templates"
    container="column #top @stretch"
    flex
    oncreate={() => fetchTemplates(match)}
    ondestroy={() => setTemplates(null)}
  >
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
        {templates &&
          [...templates].map(item => (
            <Link
              class="item template-item"
              container="column #center @center"
              to={`/templates/${item.$ref.id}`}
            >
              {item.name}
            </Link>
          ))}
      </div>
    </div>
  </div>
)
