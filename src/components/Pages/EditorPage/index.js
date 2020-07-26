import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import PropTypes from 'proptypes'

import {
  EditorCard,
  EditorPanel,
  FlexSeparator,
  ScaleSlider,
  Select,
} from 'components'
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
  const [template, setTemplate] = useState({})

  const game = games.find(item => item.$id === gameId) || {}

  // If template name changes
  // const updateTemplates = async () => {
  //   const _templates = await Firebase.query(
  //     'templates',
  //     { gameRef: `/games/${gameId}` },
  //     'name',
  //     true
  //   )
  //   setTemplates(_templates)
  // }

  const updateTemplate = async () => {
    const _template = await Firebase.doc('templates', templateId, true)
    setTemplate(_template)
  }

  useEffect(() => {
    ;(async () => {
      const [_games, _templates, _template] = await Promise.all([
        Firebase.list('games', 'name'),
        Firebase.query('templates', { gameRef: `/games/${gameId}` }, 'name'),
        Firebase.doc('templates', templateId, true),
      ])
      setGames(_games)
      setTemplates(_templates)
      setTemplate(_template)
    })()
  }, [gameId, templateId])

  return (
    <div class={s.EditorPage}>
      <EditorPanel template={template} onUpdate={updateTemplate} />
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
