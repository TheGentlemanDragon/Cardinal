import { route } from 'preact-router'

function pointInRect(point) {
  return function(rect) {
    return (
      rect.left <= point.x &&
      rect.right >= point.x &&
      rect.top <= point.y &&
      rect.bottom >= point.y
    )
  }
}

export function debounce(fn, delay) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Open url string in current window
 *
 * @export
 * @param {string} url address to visit
 */
export function goToUrl(url) {
  return function() {
    route(url)
  }
}

export function noop() {}

export function renderStyle(element = {}, baseStyle) {
  if (!element.style) {
    return {}
  }

  return Object.keys(element.style).reduce(
    (result, key) => {
      const item = element.style[key]
      result[key] = `${item.value}${item.unit || ''}`
      return result
    },
    { ...baseStyle }
  )
}

export function selectElement(index, event, fn) {
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
  fn(nextIndex)
}

export function withEventTargetValue(cb) {
  return function(event) {
    return cb(event.target.value)
  }
}

export function withToggle(setState, initialState) {
  return function() {
    setState(!initialState)
  }
}
