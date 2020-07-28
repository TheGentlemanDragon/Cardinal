import { h } from 'preact'
import PropTypes from 'proptypes'

import { useEditorContext } from 'contexts/EditorContext'
import { useGlobalBlur } from 'hooks'
import { renderStyle, selectElement } from 'lib/utils'
import s from './style.css'

function EditorCard({ template = {} }) {
  const { scale, elementIndex, set } = useEditorContext()
  const { blurRef } = useGlobalBlur(elementIndex !== -1, () =>
    set.elementIndex(-1)
  )
  const { elements = [] } = template

  return (
    <div
      ref={blurRef}
      class={s.EditorCard}
      style={{ transform: `scale(${scale})` }}
      onClick={event => selectElement(elementIndex, event, set.elementIndex)}
    >
      {elements.map((element, index) => {
        const selected = index === elementIndex ? s.SelectedElement : ''
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
