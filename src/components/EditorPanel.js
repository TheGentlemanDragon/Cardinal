import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { IconButton } from 'components'
import { useEditorContext } from 'contexts'
import { addElement } from 'lib/actions'

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

EditorPanel.proptypes = {
  onUpdate: PropTypes.func.isRequired,
}

export function EditorPanel() {
  const { template, set } = useEditorContext()

  const addImage = async () => {
    await addElement(template, 'image')
    set.refresh(Symbol())
  }

  const addText = async () => {
    await addElement(template, 'text')
    set.refresh(Symbol())
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
