import { Store, get, keys, set } from 'idb-keyval'

import { identity, hexId, toObjQuery } from './utils'

// Manually create stores if they don't exist
indexedDB.open('cardinal').onupgradeneeded = function(event) {
  const db = event.target.result

  const gameStore = db.createObjectStore('games')
  gameStore.createIndex('$id', '$id', { unique: true })
  gameStore.createIndex('name', 'name', { unique: false })

  const templateStore = db.createObjectStore('templates')
  templateStore.createIndex('$id', '$id', { unique: true })
  templateStore.createIndex('name', 'name', { unique: false })
  templateStore.createIndex('gameId', 'gameId', { unique: false })

  const elementStore = db.createObjectStore('elements')
  elementStore.createIndex('$id', '$id', { unique: true })
  elementStore.createIndex('name', 'name', { unique: false })
  elementStore.createIndex('templateId', 'templateId', { unique: false })
}

function generateStore(name) {
  let store
  try {
    store = new Store('cardinal', name)
  } catch (error) {
    console.log('ERROR')
    console.log(error)
  }

  async function Instance(keyOrQuery, value) {
    const keyType = typeof keyOrQuery
    const key = keyType === 'string' && keyOrQuery

    if (value) {
      return set(key, value, store)
    }

    const query = keyType === 'object' ? toObjQuery(keyOrQuery) : identity

    if (!key) {
      const objKeys = await keys(store)
      const items = await Promise.all(objKeys.map(key => get(key, store)))
      return items.filter(query)
    }

    return get(key, store)
  }

  Instance.add = function(value) {
    value.$id = hexId()
    set(value.$id, value, store)
    return value
  }

  return Instance
}

const DataStore = {
  Games: generateStore('games'),
  Templates: generateStore('templates'),
  Elements: generateStore('elements'),
}

export { DataStore }
