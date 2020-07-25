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
  static docWithMeta(doc, ref) {
    return {
      ...doc,
      $id: doc.__meta__.id,
      $path: doc.__meta__.path.slice(1),
      $ref: ref,
    }
  }

  tryCache(method, key, invalidate = false) {
    if (invalidate) {
      DEBUG && console.info(`Invalidating Cache [${method}] ${key}`)
      delete this.cache[method][key]
      return null
    }

    DEBUG && console.info(`Fetching from Cache [${method}] ${key}`)
    return this.cache[method][key] || null
  }

  updateCache(method, key, value) {
    DEBUG && console.info(`Updating Cache [${method}] ${key}`)
    this.cache[method][key] = value
    return value
  }

  /**
   * Retrieve collectionzen
   *
   * @param {any} name collection name
   * @returns collection
   * @memberof FirebaseFactory
   */
  col(name, invalidate = false) {
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
    const key = `${collection}/${name}`
    const cached = this.tryCache('doc', key, invalidate)

    if (cached) {
      return cached
    }

    const docRef = this.col(key, invalidate)
    const doc = await docRef.get()
    return this.updateCache(
      'doc',
      key,
      FirebaseFactory.docWithMeta(doc, docRef)
    )
  }

  /**
   * Retrieve list of documents in collection
   *
   * @param {any} collection collection name
   * @returns map of documents
   * @memberof FirebaseFactory
   */
  async list(collection, sortKey, invalidate = false) {
    const key = `${collection}?sort:${sortKey}`
    const cached = this.tryCache('list', key, invalidate)

    if (cached) {
      return cached
    }

    const snapshot = await this.col(collection, invalidate)
      .query({
        where: [['owner', '==', this.owner]],
        orderBy: sortKey,
      })
      .run()
    return this.updateCache(
      'list',
      key,
      snapshot.map(FirebaseFactory.docWithMeta)
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

class Storage {
  static set(key, obj) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(obj))
    }
  }

  static get(key) {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem(key))
    }
  }
}

const Cache = {}

const Firebase = new FirebaseFactory()
Firebase.setOwner('nando')

export { Firebase, Storage, Cache }
