import { h } from 'preact'

import useTemplates from 'hooks/useTemplates'
import s from './style.css'

function GameItemDetails({ game }) {
  const templates = useTemplates(game) || []

  return (
    <div class={s.GameItemDetails}>
      <div>Templates</div>
      <div class={s.TemplateList}>
        {templates.map(item => (
          <a
            key={`templates-list-${item.$id}`}
            class={s.TemplateItem}
            href={`/templates/${item.$ref.id}`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  )
}

GameItemDetails.defaultProps = {
  game: {},
}

export default GameItemDetails
