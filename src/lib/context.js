import { createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

import { debounce } from 'lib/utils'
import { Cache } from 'lib/data'

const writeToStorage = debounce((cacheId, key, newVal) => {
  const stored = Cache.get(cacheId) || {}
  stored[key] = newVal
  Cache.set(cacheId, stored)
}, 250)

function makeUseContext(context) {
  return function() {
    return useContext(context)
  }
}

function populateContext(values, cacheId, cachedKeys) {
  return Object.keys(values).reduce(
    (result, key) => {
      if (key === 'set') {
        throw `'set' is a reserved key`
      }

      const [value, setValue] = useState(values[key])
      result[key] = value
      result.set[key] = newVal => {
        if (cacheId && cachedKeys.includes(key)) {
          writeToStorage(cacheId, key, newVal)
        }
        setValue(newVal)
      }
      return result
    },
    { get: {}, set: {} }
  )
}

export function useContextEx(defaults, cacheId, cachedKeys = []) {
  const cached = {}

  // Persist value to localStorage if cacheId is provided
  if (cacheId) {
    cacheId = cacheId[0].toUpperCase() + cacheId.slice(1).toLowerCase()
    cacheId += 'Context'
    Object.assign(cached, Cache.get(cacheId))
    Object.keys(cached).forEach(key => {
      if (!cachedKeys.includes(key)) {
        delete cached[key]
      }
    })
  }

  const values = { ...defaults, ...cached }
  const Context = createContext({})
  const keyedUseContext = makeUseContext(Context)

  const withContext = Component => {
    return function(props) {
      return (
        <Context.Provider value={populateContext(values, cacheId, cachedKeys)}>
          <Component {...props} />
        </Context.Provider>
      )
    }
  }

  return [keyedUseContext, withContext]
}
