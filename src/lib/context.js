import { createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

import { debounce } from 'lib/utils'
import { Storage } from 'lib/data'

const writeToStorage = debounce((cacheKey, key, newVal) => {
  const stored = Storage.get(cacheKey) || {}
  stored[key] = newVal
  Storage.set(cacheKey, stored)
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
  if (cacheKey) {
    cacheKey = cacheKey[0].toUpperCase() + cacheKey.slice(1).toLowerCase()
    cacheKey += 'Context'
    Object.assign(cached, Storage.get(cacheKey))
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
