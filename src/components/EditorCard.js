import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { ElementModifier } from 'components'
import { useEditorContext } from 'contexts/EditorContext'
import { useGlobalBlur } from 'hooks'
import { renderStyle, selectElement } from 'lib/utils'

const mainCss = css`
  background-color: #ffffff;
  border-radius: calc(0.13px * var(--res));
  box-shadow: var(--box-shadow-lg);
  height: calc(3.5px * var(--res));
  margin-bottom: calc(var(--input-height) + var(--g-padding-vertical));
  margin-left: 18rem;
  position: relative;
  width: calc(2.5px * var(--res));
`

const elementCss = css`
  align-items: center;
  color: #aaa;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: absolute;
  user-select: none;

  &:hover {
    outline: 1px dotted #aaa;
  }
`

EditorCard.proptypes = {
  template: PropTypes.object.isRequired,
}

export function EditorCard({ template }) {
  const { scale, elementIndex, set } = useEditorContext()

  const { elements = [] } = template
  const hasSelected = elements.length > 0 && elementIndex > -1

  const { blurRef } = useGlobalBlur(hasSelected, () => set.elementIndex(-1))

  return (
    <div
      ref={blurRef}
      class={mainCss}
      id="EditorCard"
      style={{ transform: `scale(${scale})` }}
      onClick={selectElement(elementIndex, set.elementIndex)}
    >
      {hasSelected && <ElementModifier element={elements[elementIndex]} />}

      {elements.map(element => (
        <div
          key={element.name}
          class={`element ${elementCss}`}
          style={renderStyle(element)}
        >
          {element.name}
        </div>
      ))}
    </div>
  )
}
