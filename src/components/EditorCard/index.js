import { h } from 'preact'
import PropTypes from 'proptypes'

import { useEditorContext } from 'contexts/EditorContext'
import { indexToBack, renderStyle } from 'lib/utils'
import s from './style.css'

function EditorCard({ template = {} }) {
  const { scale, elementIndex, set } = useEditorContext()
  const { elements = [] } = template
  const selectedElement = elements[elementIndex]

  return (
    <div class={s.EditorCard} style={{ transform: `scale(${scale})` }}>
      {indexToBack(elements, elementIndex).map(element => {
        const selected = element === selectedElement ? s.SelectedElement : ''
        return (
          <div
            key={element.name}
            class={`${s.EditorElement} ${selected}`}
            style={renderStyle(element)}
          >
            {element.name}
          </div>
        )
      })}
    </div>
  )
}

EditorCard.proptypes = {
  template: PropTypes.object.isRequired,
}

export default EditorCard
