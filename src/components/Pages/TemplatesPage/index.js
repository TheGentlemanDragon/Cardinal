import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import PropTypes from 'proptypes'

import { Firebase } from 'lib/data'
import s from './style.css'

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.gameId ID of game to load
 * @example
 * const gameId = 'lCSYutJmUDI5qqgPYadC'
 * return (
 *   <TemplatesPage gameId={gameId} />
 * )
 */
function TemplatesPage({ gameId }) {
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    ;(async () => {
      const _templates = await Firebase.query(
        'templates',
        { gameRef: `/games/${gameId}` },
        'name'
      )
      setTemplates(_templates)
    })()
  }, [gameId])

  return (
    <div class={s.TemplatesPage}>
      <h2>Templates</h2>

      {/* Templates List */}
      <div class={s.List}>
        {templates.map(template => (
          <a
            key={`templates-list-${template.$id}`}
            class={s.TemplateItem}
            href={`/games/${gameId}/templates/${template.$id}`}
          >
            {template.name}
          </a>
        ))}
      </div>
    </div>
  )
}

TemplatesPage.propTypes = {
  gameId: PropTypes.string.isRequired,
}

export default TemplatesPage
