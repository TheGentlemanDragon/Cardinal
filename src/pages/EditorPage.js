import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { EditorCard } from '../components/EditorCard'
import { Menu } from '../components/Menu'

import { useEditorContext, withEditorContext } from '../contexts/EditorContext'

import { openEditorTemplate } from '../lib/actions'
import { DataStore } from '../lib/datastore'
import { PageCss } from '../lib/styles'

const EditorPageCss = css`
  align-items: center;
  display: flex;
  flex-direction: column;
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
  const { template, set } = useEditorContext()

  useEffect(() => {
    DataStore.Templates(templateId).then(set.template)
  }, [templateId])

  return (
    <>
      <Menu gameId={gameId} templateId={templateId} />

      <div class={PageCss + ' ' + EditorPageCss}>
        <EditorCard templateId={templateId} />
      </div>
    </>
  )
}

const EditorPageWithContext = withEditorContext(EditorPage, true)

export { EditorPageWithContext as EditorPage }
