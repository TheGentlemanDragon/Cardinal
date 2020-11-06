import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { Icon } from './Icon'
import { useEditorContext } from '../contexts/EditorContext'
import { DataStore } from '../lib/datastore'
import { defaultElement } from '../lib/utils'

const EditorPanelCss = css`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`

const addElementCss = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: var(--margin-sm);
  width: 100%;

  svg {
    background-color: var(--clr-input-bg);
    padding: var(--input-padding-vertical);
    width: 100%;
  }

  svg:hover {
    background-color: var(--clr-input-bg-hover);
  }
`

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
  editorContext.set.elements([...editorContext.elements, element])
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
    <div class={EditorPanelCss}>
      <label>Add Element</label>

      <div class={addElementCss}>
        <Icon type="text" onClick={addText} />
        <Icon type="image" margin="left" onClick={addImage} />
      </div>
    </div>
  )
}
