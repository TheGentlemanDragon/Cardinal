import { h } from 'preact'

import { useEditorContext } from 'contexts/EditorContext'
import s from './style.css'

function EditorCard({ elements = [] }) {
  const { scale } = useEditorContext()

  return (
    <div class={s.EditorCard} style={{ transform: `scale(${scale})` }}>
      {/* {elements.map((element, index) => (
        <CardElement
          key={`card-field-${element.name}`}
          element={element}
          index={index}
          isCompose={isCompose}
          mode={mode}
        />
      ))} */}
    </div>
  )
}

EditorCard.defaultProps = {}

export default EditorCard
