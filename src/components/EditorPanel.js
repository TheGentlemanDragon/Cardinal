import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { IconButton } from 'components'
import { useEditorContext } from 'contexts'
import { DataStore } from 'lib/datastore'
import { defaultElement } from 'lib/utils'

const mainCss = css`
  background-color: var(--clr-bg-dark);
  border-radius: var(--radius-md);
  left: var(--g-padding-horizontal);
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

EditorPanel.proptypes = {
  onUpdate: PropTypes.func.isRequired,
}

export function EditorPanel() {
  const editorContext = useEditorContext()

  const addImage = () => {
    addElement(editorContext, 'image')
  }

  const addText = () => {
    addElement(editorContext, 'text')
  }

  return (
    <div class={mainCss}>
      <h4>Add Element</h4>

      <div class={addElementCss}>
        <IconButton type="text" onClick={addText} />
        <IconButton type="image" onClick={addImage} />
      </div>
    </div>
  )
}
