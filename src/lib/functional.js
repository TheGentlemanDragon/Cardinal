import { route } from 'preact-router'

export function noop() {}

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

export function withToggle(setState, initialState) {
  return function() {
    setState(!initialState)
  }
}
