import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { Icon } from './Icon'
import { useEditorContext } from '../contexts/EditorContext'
import { DataStore } from '../lib/datastore'
import { defaultElement } from '../lib/utils'

const EditorPanaelCss = css`
  background-color: var(--clr-bg-dark);
  border-radius: var(--radius-md);
  position: absolute;
  width: 13rem;
  padding: var(--panel-padding-vertical) var(--panel-padding-horizontal);
  margin-left: 2rem;
`

const addElementCss = css`
  display: flex;
  justify-content: space-evenly;
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
    <div class={EditorPanaelCss}>
      <h4>Add Element</h4>

      <div class={addElementCss}>
        <Icon type="text" onClick={addText} />
        <Icon type="image" onClick={addImage} />
      </div>
    </div>
  )
}
