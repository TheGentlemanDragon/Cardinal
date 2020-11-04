import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { EditorCard } from '../components/EditorCard'
import { Menu } from '../components/Menu'

import { withEditorContext } from '../contexts/EditorContext'
import { PageCss } from '../lib/styles'

const EditorPageCss = css`
  align-items: center;
  justify-content: center;
  padding: 0;
  user-select: none;
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
  return (
    <>
      <Menu gameId={gameId} templateId={templateId} />

      <div class={`${PageCss} ${EditorPageCss}`}>
        <EditorCard templateId={templateId} />
      </div>
    </>
  )
}

const EditorPageWithContext = withEditorContext(EditorPage, true)

export { EditorPageWithContext as EditorPage }
