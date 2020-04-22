import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'
import { pointInRect } from '../modules/utils'

import CardElement from './CardElement'

/** Iterate through target children, selecting next element at click event */
const selectElement = (index, event) => {
  const { currentTarget: card, x, y } = event

  // Shift elements to back
  const originalElements = Array.from(card.children)
  const elements = [
    ...originalElements.slice(index + 1),
    ...originalElements.slice(0, index + 1),
  ]

  // Get the first clicked on item from shifted array
  const clickedOn = pointInRect({ x, y })
  const clickedElement = elements.find(item =>
    clickedOn(item.getBoundingClientRect())
  )

  // Select that item by its index in original array
  const nextIndex = originalElements.indexOf(clickedElement)
  emitEvent('selectElement', nextIndex)
}

const Card = ({ elements, mode, templatePage }) => {
  const isCompose = mode === 'compose'
  const { elementIndex, scale } = templatePage

  return (
    <div
      class={`card` + (isCompose ? '' : ' preview')}
      style={{ transform: `scale(${scale})` }}
      onClick={isCompose && linkEvent(elementIndex, selectElement)}
    >
      {elements.map((element, index) => (
        <CardElement
          key={`card-field-${element.name}`}
          element={element}
          index={index}
          isCompose={isCompose}
          mode={mode}
        />
      ))}
    </div>
  )
}

const map = ({ elements, templatePage }) => ({
  elements,
  templatePage,
})
export default mapStatesToProps(Card, map)
