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

  .EditorPanel-ButtonRow {
    align-items: center;
    background-color: var(--clr-input-bg);
    border-radius: var(--radius-sm);
    cursor: pointer;
    display: flex;
    font-variant: small-caps;
    justify-content: space-between;
    margin-top: var(--margin-sm);
    padding-right: 0.75rem;

    width: 100%;

    svg {
      background-color: var(--clr-input-bg-hover);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      height: 50px;
      padding: 10px;
      width: 50px;
    }

    &:hover {
      background-color: var(--clr-input-bg-hover);
    }
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
    <div class={EditorPanelCss}>
      <div class="EditorPanel-ButtonRow" onClick={addText}>
        <Icon type="text" />
        Add Text
      </div>

      <div class="EditorPanel-ButtonRow" onClick={addImage}>
        <Icon type="image" />
        Add Image
      </div>
    </div>
  )
}
