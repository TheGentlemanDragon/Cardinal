import { createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

import { debounce } from 'lib/utils'

const writeToStorage = debounce((cacheKey, key, newVal) => {
  if (typeof window !== 'undefined') {
    const stored = JSON.parse(window.localStorage.getItem(cacheKey)) || {}
    stored[key] = newVal
    window.localStorage.setItem(cacheKey, JSON.stringify(stored))
  }
}, 250)

function makeUseContext(context) {
  return function() {
    return useContext(context)
  }
}

function populateContext(values, cacheKey) {
  return Object.keys(values).reduce(
    (result, key) => {
      if (key === 'set') {
        throw `'set' is a reserved key`
      }

      const [value, setValue] = useState(values[key])
      result[key] = value
      result.set[key] = newVal => {
        if (cacheKey) {
          writeToStorage(cacheKey, key, newVal)
        }
        setValue(newVal)
      }
      return result
    },
    { get: {}, set: {} }
  )
}

export function useContextEx(defaults, cacheKey) {
  const cached = {}

  // Persist value to localStorage if cacheKey is provided
  if (cacheKey && typeof window !== 'undefined') {
    cacheKey = cacheKey[0].toUpperCase() + cacheKey.slice(1).toLowerCase()
    cacheKey += 'Context'
    Object.assign(cached, JSON.parse(window.localStorage.getItem(cacheKey)))
  }

  const values = { ...defaults, ...cached }
  const Context = createContext({})
  const keyedUseContext = makeUseContext(Context)

  const withContext = Component => {
    return function(props) {
      return (
        <Context.Provider value={populateContext(values, cacheKey)}>
          <Component {...props} />
        </Context.Provider>
      )
    }
  }

  return [keyedUseContext, withContext]
}
