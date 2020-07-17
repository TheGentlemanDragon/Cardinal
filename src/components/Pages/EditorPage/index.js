import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import PropTypes from 'proptypes'

import { EditorCard, FlexSeparator, ScaleSlider, Select } from 'components'
import { withEditorContext } from 'contexts'
import { openEditorTemplate } from 'lib/actions'
import { Firebase } from 'lib/data'
import s from './style.css'

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.templateId ID of template to load
 * @example
 * const templateId = 'ILSUMGQVg80sjZ18T6Xl'
 * return (
 *   <EditorPage templateId={templateId} />
 * )
 */
function EditorPage({ gameId, templateId }) {
  const [games, setGames] = useState([])
  const [templates, setTemplates] = useState([])
  const game = games.find(item => item.$id === gameId) || {}
  const template = templates.find(item => item.$id === templateId) || {}

  useEffect(() => {
    ;(async () => {
      const [_games, _templates] = await Promise.all([
        Firebase.list('games', 'name'),
        Firebase.query('templates', { gameRef: `/games/${gameId}` }, 'name'),
      ])
      setGames(_games)
      setTemplates(_templates)
    })()
  }, [gameId, templateId])

  return (
    <div class={s.EditorPage}>
      <EditorCard template={template} />

      <div class={s.BottomMenu}>
        <Select
          labelKey="name"
          name="Game"
          options={games}
          value={game.name}
          onSelect={item => openEditorTemplate(item)}
        />
        <Select
          labelKey="name"
          name="Template"
          options={templates}
          value={template.name}
          onSelect={item => openEditorTemplate(game, item)}
        />
        <FlexSeparator />
        <ScaleSlider />
      </div>
    </div>
  )
}

EditorPage.propTypes = {
  templateId: PropTypes.string.isRequired,
}

export default withEditorContext(EditorPage, true)
