import { h } from 'preact'
import { useContext } from 'preact/hooks'

import EditorContext from 'contexts/EditorContext'
import s from './style.css'

function EditorCard({ elements = [] }) {
  const editor = useContext(EditorContext)

  return (
    <div class={s.EditorCard} style={{ transform: `scale(${editor.scale})` }}>
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
