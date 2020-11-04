import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { css } from 'linaria'

import { ElementModifier } from './ElementModifier'
import { useEditorContext } from '../contexts/EditorContext'
import { useDS } from '../hooks/useDS'
import { useGlobalBlur } from '../hooks/useGlobalBlur'
import { styleRender, selectElement } from '../lib/utils'

const hide = { display: 'none' }

const EditorCardCss = css`
  background-color: #ffffff;
  border-radius: calc(0.13px * var(--res));
  box-shadow: var(--box-shadow-lg);
  height: calc(3.5px * var(--res));
  position: relative;
  width: calc(2.5px * var(--res));
`

const ElementCss = css`
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

EditorCard.propTypes = {}

EditorCard.defaultProps = {}

export function EditorCard({ gameId, templateId }) {
  const Elements = useDS('Elements')
  const { elementIndex, elements, scale, $set } = useEditorContext()

  const hasSelected = Elements.list.length > 0 && elementIndex > -1

  const { blurRef } = useGlobalBlur(hasSelected, () => $set.elementIndex(-1))

  useEffect(() => {
    Elements.getList({ templateId }).then($set.elements)
  }, [gameId, templateId])

  return (
    <div
      ref={blurRef}
      class={EditorCardCss}
      id="EditorCard"
      style={{ transform: `scale(${scale})` }}
      onMouseDown={selectElement(elementIndex, $set.elementIndex)}
    >
      {hasSelected && <ElementModifier element={elements[elementIndex]} />}

      {elements.map((element, index) => {
        const isSelected = index === elementIndex
        return (
          <div
            key={element.$id}
            class={`element ${ElementCss}`}
            style={styleRender(element, isSelected && hide)}
          >
            {element.name}
          </div>
        )
      })}
    </div>
  )
}
