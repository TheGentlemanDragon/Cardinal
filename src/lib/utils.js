import { route } from 'preact-router'

/* Constants */

/* Locals */

function identity(value) {
  return value
}

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

/* Exports */

export function debounce(fn, delay) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

export function getDisplayValue(item, labelKey) {
  if (typeof item === 'object' && labelKey in item) {
    return item[labelKey]
  } else if (typeof item !== 'object') {
    return item
  }
  return ''
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

export function selectElement(index, setSelected) {
  return function(event) {
    const { x, y } = event

    // Shift elements to back
    const originalElements = Array.from(document.querySelectorAll('.element'))
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
    setSelected(nextIndex)
  }
}

export function styleDelta(element = {}, delta = {}) {
  if (!element.style) {
    return {}
  }

  const { style } = element

  return Object.keys(style).reduce((result, key) => {
    const item = (result[key] = { ...style[key] })
    const offset = delta[key] || 0
    item.value = item.value + offset
    return result
  }, {})
}

export function styleRender(element = {}, baseStyle = {}, delta = {}) {
  if (!element.style) {
    return {}
  }

  const { style } = element

  return Object.keys(style).reduce(
    (result, key) => {
      const item = style[key]
      const offset = delta[key] || 0
      const value = item.value + offset
      result[key] = `${value}${item.unit || ''}`
      return result
    },
    { ...baseStyle }
  )
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
