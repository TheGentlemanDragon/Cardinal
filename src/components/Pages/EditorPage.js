import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

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

const mainCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: absolute;
  width: 100vw;
  z-index: 1;

  align-items: center;
  justify-content: center;
`

const bottomMenuCss = css`
  display: flex;
  position: absolute;
  bottom: var(--g-padding-vertical);
  left: var(--g-padding-horizontal);
  width: calc(100vw - 2 * var(--g-padding-horizontal));

  & > div + div {
    margin-left: var(--g-margin-lg);
  }
`

EditorPage.propTypes = {
  templateId: PropTypes.string.isRequired,
}

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
    <div class={mainCss}>
      <EditorPanel template={template} onUpdate={updateTemplate} />
      <EditorCard template={template} />

      <div class={bottomMenuCss}>
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

const EditorPageWithContext = withEditorContext(EditorPage, true)

export { EditorPageWithContext as EditorPage }
