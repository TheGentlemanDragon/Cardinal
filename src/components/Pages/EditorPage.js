import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import {
  EditorCard,
  EditorPanel,
  FlexSeparator,
  ScaleSlider,
  SelectCollection,
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
  const [template, setTemplate] = useState({})

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

  const updateTemplate = async (modifyTemplate, postUpdate) => {
    await modifyTemplate(template)
    setTemplate(await Firebase.doc('templates', templateId, true))
    postUpdate()
  }

  useEffect(() => {
    ;(async () =>
      setTemplate(await Firebase.doc('templates', templateId, true)))()
  }, [gameId, templateId])

  return (
    <div class={mainCss}>
      <EditorPanel onUpdate={updateTemplate} />
      <EditorCard elements={template.elements} onUpdate={updateTemplate} />

      <div class={bottomMenuCss}>
        <SelectCollection
          collection="games"
          labelKey="name"
          name="Game"
          value={gameId}
          valueKey="$id"
          onSelect={item => openEditorTemplate(item)}
        />
        <SelectCollection
          collection="templates"
          labelKey="name"
          name="Template"
          query={{ gameRef: `/games/${gameId}` }}
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
