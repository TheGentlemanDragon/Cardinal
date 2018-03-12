import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Firebase } from '../_services'
import './templates.styl'

export const templatesActions = {
  fetchTemplates: (match) => async (state, actions) => {
    const query = { owner: 'nando', game: match.params.gameId }
    actions.setTemplates([])
    actions.setTemplates(await Firebase.query('templates', query))
  },
  setTemplates: value => state => ({ ...state, templates: value }),
}

export const Templates = ({ templates }, actions) => ({ match }) =>
  <div  key="templates"
        container="column #top @stretch" flex
        oncreate={() => actions.fetchTemplates(match)}>

    {/* App Title */}
    <div class="app-title">Cardinal</div>

    {/* Page */}
    <div class="page" container="column #top @stretch">

      {/* Page Title */}
      <div class="page-title">Games > gameId</div>

      {/* Templates List */}
      <div class="list" container="row #left @top">
      {
        [...templates].sort((a, b) => a.name > b.name ? 1 : -1).map(item =>
          <Link class="item template-item"
                container="column #center @center"
                to={`/templates/${item.name}`}>
            {item.name}
          </Link>
        )
      }
      </div>
    </div>
  </div>
