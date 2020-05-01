import { h } from 'preact'

import useTemplates from 'hooks/useTemplates'
import s from './style.css'

function TemplateList({ gameId }) {
  const templates = useTemplates(gameId) || []

  return (
    <div class={s.TemplateList}>
      <h2>Templates</h2>

      {/* Templates List */}
      <div class={s.List}>
        {templates.map(template => (
          <a
            key={`templates-list-${template.$id}`}
            class={s.TemplateItem}
            href={`/template/${template.$id}`}
          >
            {template.name}
          </a>
        ))}
      </div>
    </div>
  )
}

TemplateList.defaultProps = {
  game: {},
}

export default TemplateList
