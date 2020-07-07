import { h } from 'preact'

import s from './style.css'
import EditorCard from 'components/EditorCard'
import ScaleSlider from 'components/ScaleSlider'
import { withEditorContext } from 'contexts/EditorContext'

function TemplateEditor() {
  return (
    <div class={s.TemplateEditor}>
      <EditorCard />
      <ScaleSlider />
    </div>
  )
}

// TemplateEditor.defaultProps = {
// }

export default withEditorContext(TemplateEditor, true)
