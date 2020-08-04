import { Database } from 'firebase-firestore-lite'
import Auth from 'firebase-auth-lite'

import config from './config'

const rxRef = /.*Ref$/
const DEBUG = false

const auth = new Auth({ apiKey: config.apiKey })

function hashRef(obj) {
  return typeof obj !== 'object'
    ? obj
    : Object.keys(obj)
        .sort()
        .map(key => key + ':' + hashRef(obj[key]))
}

function sortByKey(key) {
  return function(a, b) {
    return a[key] > b[key] ? 1 : -1
  }
}

/**
 * Encapsulates Firebase functionality
 *
 * @class Firebase
 */
class FirebaseFactory {
  constructor() {
    this.db = new Database({ projectId: config.projectId, auth })
    this.owner = null
    this.cache = {
      collection: {},
      doc: {},
      list: {},
      query: {},
    }
  }

  setOwner(owner) {
    this.owner = owner
  }

  /**
   * Format document, retrieving data and assigning reference
   *
   * @static
   * @param {any} prefix
   * @returns document
   * @memberof FirebaseFactory
   */
  static docWithMeta(doc) {
    return {
      ...doc,
      $id: doc.__meta__.id,
      $path: doc.__meta__.path.slice(1),
    }
  }

  tryCache(method, key, invalidate = false) {
    if (invalidate) {
      DEBUG && console.info(`Invalidating Cache [${method}] ${key}`)
      delete this.cache[method][key]
      return null
    }

    const value = this.cache[method][key]
    DEBUG && value && console.info(`Fetching from Cache [${method}] ${key}`)

    return value || null
  }

  updateCache(method, key, value) {
    DEBUG && console.info(`Updating Cache [${method}] ${key}`)
    this.cache[method][key] = value
    return value
  }

  add(collection, value) {
    return Firebase.db.ref(collection).add(value)
  }

  /**
   * Retrieve collection
   *
   * @param {any} name collection name
   * @returns collection
   * @memberof FirebaseFactory
   */
  col(name, invalidate = false) {
    DEBUG && console.info(`[DATA] ${invalidate ? '!' : ''}col - ${name}`)
    const cached = this.tryCache('collection', name, invalidate)

    if (cached) {
      return cached
    }

    const colRef = this.db.ref(name)
    return this.updateCache('collection', name, colRef)
  }

  /**
   * Retrieve document from collection
   *
   * @param {any} collection collection name
   * @param {any} doc document id
   * @returns document
   * @memberof FirebaseFactory
   */
  async doc(collection, name, invalidate = false) {
    DEBUG &&
      console.info(`[DATA] ${invalidate ? '!' : ''}doc - ${collection}:${name}`)
    const key = `${collection}/${name}`
    const cached = this.tryCache('doc', key, invalidate)

    if (cached) {
      return cached
    }

    const doc = await this.col(key, invalidate).get()
    return this.updateCache('doc', key, FirebaseFactory.docWithMeta(doc))
  }

  /**
   * Retrieve list of documents in collection
   *
   * @param {any} collection collection name
   * @returns map of documents
   * @memberof FirebaseFactory
   */
  async list(collection, sortKey, invalidate = false) {
    DEBUG && console.info(`[DATA] ${invalidate ? '!' : ''}list - ${collection}`)
    const key = `${collection}?sort:${sortKey}${invalidate && '(i)'}`
    const cached = this.tryCache('list', key, invalidate)

    if (cached) {
      return cached
    }

    // TODO: Query on owner
    const results = await this.col(collection, invalidate).list()
    return this.updateCache(
      'list',
      key,
      results.documents
        .sort(sortByKey(sortKey))
        .map(FirebaseFactory.docWithMeta)
    )
  }

  /**
   * Query collection
   *
   * @param {any} collection collection name
   * @param {any} params query params
   * @returns map of documents
   * @memberof FirebaseFactory
   */
  async query(collection, params, sortKey, invalidate = false) {
    const cacheKey = `${collection}?${hashRef(params)}&sort:${sortKey}`
    const cached = this.tryCache('query', cacheKey, invalidate)
    DEBUG && console.info(`[DATA] ${invalidate ? '!' : ''}query - ${cacheKey}`)

    if (cached) {
      return cached
    }

    const filter = {
      where: [['owner', '==', this.owner]],
      orderBy: sortKey,
    }

    let keys = Object.keys(params)
    let key
    while ((key = keys.pop())) {
      let value
      // Query expects and actual ref and not just a string
      if (rxRef.test(key)) {
        value = this.db.ref(params[key])
      } else {
        value = params[key]
      }
      filter.where.push([key, '==', value])
    }

    let snapshot = await this.col(collection)
      .query(filter)
      .run()
    return this.updateCache(
      'query',
      cacheKey,
      snapshot.map(FirebaseFactory.docWithMeta)
    )
  }

  update(object, value) {
    return Firebase.db.ref(object.$path).update(value)
  }

  // /**
  //  * Query collection
  //  *
  //  * @param {string} id game id to associate asset with
  //  * @param {File} file file to upload
  //  * @memberof FirebaseFactory
  //  */
  // async upload(id, file) {
  //   const ref = this.storage.ref(`${id}/`)
  //   // TODO: Store reference in database
  //   return ref.child(file.name).put(file)
  // }

  // async listFiles(id) {
  //   // TODO: Query references from database
  //   return []
  // }
}

// Shim for server-side rendering and test
let storage = { getItem: () => {}, setItem: () => {} }

if (window && window.localStorage && typeof window.localStorage === 'object') {
  storage = window.localStorage
}

class Cache {
  static set(key, obj) {
    storage.setItem(key, JSON.stringify(obj))
  }

  static get(key) {
    return JSON.parse(storage.getItem(key))
  }
}
const Firebase = new FirebaseFactory()
Firebase.setOwner('nando')

export { Firebase, Cache }
