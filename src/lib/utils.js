import { route } from 'preact-router'

/* Locals */

const idChars = '1234567890abcdefghijkmnpqrstuvwzyz'

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

/* Constants */

export const defaultElement = {
  style: {
    left: { unit: 'px', value: 0 },
    top: { unit: 'px', value: 0 },
    height: { unit: 'px', value: 30 },
    width: { unit: 'px', value: 100 },
  },
}

/* Exports */

export function debounce(fn, delay) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

export function generateId(length = 8) {
  return Array(length)
    .fill(0)
    .map((_, i) => idChars[randomInt(idChars.length - 1)])
    .join('')
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

export function hashRef(obj) {
  return typeof obj !== 'object'
    ? obj
    : Object.keys(obj)
        .sort()
        .map(key => key + '=' + hashRef(obj[key]))
        .join('&')
}

export function identity(value) {
  return value
}

export function memoize(fn) {
  const cache = {}
  return (...args) => {
    const stringifiedArgs = JSON.stringify(args)
    const result = (cache[stringifiedArgs] =
      cache[stringifiedArgs] || fn(...args))
    return result
  }
}

export function noop() {}

export function random() {
  const randomBuffer = new Uint32Array(1)
  window.crypto.getRandomValues(randomBuffer)
  return randomBuffer[0] / (0xffffffff + 1)
}

export function randomInt(max = 255) {
  return Math.round(random() * max)
}

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

export function sortArrayByKey(key) {
  return function(array) {
    return array.sort(sortByKey(key))
  }
}

export function sortByKey(key) {
  return function(a, b) {
    return a[key] > b[key] ? 1 : -1
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

export function toObjQuery(obj) {
  return Object.keys(obj).reduce(
    (result, key) => item => item[key] === obj[key],
    undefined
  )
}

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
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
