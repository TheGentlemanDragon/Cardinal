import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { ElementModifier } from './ElementModifier'
import { useEditorContext } from '../contexts/EditorContext'
import { useGlobalBlur } from '../hooks/useGlobalBlur'
import { styleRender, selectElement } from '../lib/utils'

const hide = { display: 'none' }

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

EditorCard.proptypes = {}

EditorCard.defaultProps = {}

export function EditorCard({}) {
  const { elements, elementIndex, scale, set } = useEditorContext()

  const hasSelected = elements.length > 0 && elementIndex > -1

  const { blurRef } = useGlobalBlur(hasSelected, () => set.elementIndex(-1))

  return (
    <div
      ref={blurRef}
      class={mainCss}
      id="EditorCard"
      style={{ transform: `scale(${scale})` }}
      onMouseDown={selectElement(elementIndex, set.elementIndex)}
    >
      {hasSelected && <ElementModifier element={elements[elementIndex]} />}

      {elements.map((element, index) => {
        const isSelected = index === elementIndex
        return (
          <div
            key={element.$id}
            class={`element ${elementCss}`}
            style={styleRender(element, isSelected && hide)}
          >
            {element.name}
          </div>
        )
      })}
    </div>
  )
}
