import { route } from 'preact-router'

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
