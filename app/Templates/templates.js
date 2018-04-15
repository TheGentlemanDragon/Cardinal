import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Firebase } from '../services'
import './templates.styl'

export const Templates = (
  { templates },
  { fetchTemplates, clearTemplates }
) => ({ match }) => (
  <div
    key="templates"
    container="column #top @stretch"
    flex
    oncreate={() => fetchTemplates(match)}
    ondestroy={() => clearTemplates()}
  >
    {/* App Title */}
    <div class="app-title">Cardinal</div>

    {/* Page */}
    <div class="page" container="column #top @stretch">
      {/* Page Title */}
      <div class="page-title">Games > gameId</div>

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

Templates.state = {
  templates: null,
}

Templates.actions = {
  clearTemplates: () => (state, { setTemplates }) => setTemplates(null),
  fetchTemplates: match => async (state, { setTemplates }) => {
    const query = { owner: 'nando', game: match.params.gameId }
    setTemplates(await Firebase.query('templates', query, 'name'))
  },
  setTemplates: templates => state => ({ ...state, templates }),
}
