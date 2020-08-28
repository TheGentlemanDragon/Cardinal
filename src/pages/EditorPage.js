import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { EditorCard } from '../components/EditorCard'
import { EditorPanel } from '../components/EditorPanel'
import { FlexSeparator } from '../components/FlexSeparator'
import { ScaleSlider } from '../components/ScaleSlider'
import { SelectCollection } from '../components/SelectCollection'

import { useEditorContext } from '../contexts/EditorContext'
import { withEditorContext } from '../contexts/EditorContext'

import { openEditorTemplate } from '../lib/actions'
import { Firebase } from '../lib/data'

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
  const { template, set } = useEditorContext()

  useEffect(() => {
    ;(async () => {
      set.template(await Firebase.doc('templates', templateId, true))
    })()
  }, [templateId])

  return (
    <div class={mainCss}>
      <EditorPanel />
      <EditorCard templateId={templateId} />

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
