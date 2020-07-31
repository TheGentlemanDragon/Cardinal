import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { IconButton } from 'components'
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
  template: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export function EditorPanel({ template, onUpdate }) {
  const addImage = () => addElement(template, 'image', onUpdate)
  const addText = () => addElement(template, 'text', onUpdate)

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
