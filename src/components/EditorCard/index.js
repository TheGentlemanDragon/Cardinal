import { h } from 'preact'
import PropTypes from 'proptypes'

import { useEditorContext } from 'contexts/EditorContext'
import s from './style.css'

function EditorCard({ template = {} }) {
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

EditorCard.proptypes = {
  template: PropTypes.object.isRequired,
}

export default EditorCard
