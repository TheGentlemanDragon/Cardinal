import { route } from 'preact-router'

export function debounce(fn, delay) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

/** Return copy of array with specified index moved to last position */
export function indexToBack(ary = [], index = 0) {
  return ary.length ? [...ary.filter((_, i) => i !== index), ary[index]] : []
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
