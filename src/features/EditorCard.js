import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { css } from 'linaria'

import { ElementModifier } from './ElementModifier'
import { Icon } from './UI/Icon'

import { useEditorContext } from '../contexts/EditorContext'
import { useDS } from '../hooks/useDS'
import { ElementBaseCss } from '../lib/styles'
import { cls, selectElement, styleRender } from '../lib/utils'

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
  &:hover {
    outline: 1px dotted #aaa;
  }
`

const rxVariables = /\{([^}]*)\}/g

function applyValues(value, card, fields) {
  return value.match(rxVariables)?.reduce((result, varName) => {
    const key = varName.substring(1, varName.length - 1)
    const id = fields.find(item => item.name === key)?.id
    return result.replace(varName, card[id])
  }, value)
}

EditorCard.propTypes = {}

EditorCard.defaultProps = {}

export function EditorCard({ gameId, templateId }) {
  const Cards = useDS('Cards')

  const {
    elementIndex,
    elements,
    preview,
    scale,
    $set,
    template,
  } = useEditorContext()

  const card = preview ? Cards.list[0] : {}

  useEffect(() => {
    Cards.getList({ templateId })
  }, [gameId, templateId])

  return (
    <div
      class={EditorCardCss}
      id="EditorCard"
      style={{ transform: `scale(${scale})` }}
      onMouseDown={selectElement(elementIndex, $set.elementIndex)}
    >
      <ElementModifier />

      {elements.map((element, index) => {
        const isSelected = index === elementIndex
        return (
          <div
            key={element.$id}
            class={cls('element', ElementBaseCss, ElementCss)}
            style={styleRender(element, !preview && isSelected && hide)}
          >
            {preview ? (
              <span>{applyValues(element.value, card, template.fields)}</span>
            ) : (
              <>
                <Icon type={element.type} />
                <span>{element.name}</span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
