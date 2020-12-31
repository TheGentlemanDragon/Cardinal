import { h } from 'preact'
import PropTypes from 'proptypes'

import { useEditorContext } from '../../contexts/EditorContext'
import { DataStore } from '../../lib/datastore'
import { MenuPanelCss } from '../../lib/styles'
import { defaultElement } from '../../lib/utils'
import { ActionButton } from './ActionButton'

function addElement(editorContext, type) {
  const count = document.getElementsByClassName('element').length
  const name = `element${count}`
  const element = {
    ...defaultElement,
    name,
    type,
    templateId: editorContext.template.$id,
  }
  DataStore.Elements.add(element)
  editorContext.$set.elements([...editorContext.elements, element])
}

EditorPanel.propTypes = {}

export function EditorPanel() {
  const editorContext = useEditorContext()

  const addImage = () => {
    addElement(editorContext, 'image')
  }

  const addText = () => {
    addElement(editorContext, 'text')
  }

  return (
    <div class={MenuPanelCss}>
      <ActionButton caption="Add Text" iconType="text" onClick={addText} />

      <ActionButton caption="Add Image" iconType="image" onClick={addImage} />
    </div>
  )
}
