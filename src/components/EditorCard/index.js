import { h } from 'preact'
import PropTypes from 'proptypes'

import { ElementModifier } from 'components'
import { useEditorContext } from 'contexts/EditorContext'
import { useGlobalBlur } from 'hooks'
import { renderStyle, selectElement } from 'lib/utils'
import s from './style.css'

function EditorCard({ template = {} }) {
  const { scale, elementIndex, set } = useEditorContext()

  const { elements = [] } = template
  const hasSelected = elements.length > 0 && elementIndex > -1

  const { blurRef } = useGlobalBlur(hasSelected, () => set.elementIndex(-1))

  return (
    <div
      ref={blurRef}
      class={s.EditorCard}
      id="EditorCard"
      style={{ transform: `scale(${scale})` }}
      onClick={selectElement(elementIndex, set.elementIndex)}
    >
      {hasSelected && <ElementModifier element={elements[elementIndex]} />}

      {elements.map(element => (
        <div
          key={element.name}
          class={`element ${s.EditorElement}`}
          style={renderStyle(element)}
        >
          {element.name}
        </div>
      ))}
    </div>
  )
}

EditorCard.proptypes = {
  template: PropTypes.object.isRequired,
}

export default EditorCard
