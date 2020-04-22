export function noop() {}

export function withToggle(setState, initialState) {
  return function() {
    setState(!initialState)
  }
}
