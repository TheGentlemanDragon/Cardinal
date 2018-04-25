import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import { options } from '../config'

/**
 * Encapsulates Firebase functionality
 *
 * @class _Firebase
 */
class _Firebase {
  constructor() {
    firebase.initializeApp(options)
    this.db = firebase.firestore()
    this.files = firebase.storage()
    this.collections = {}
  }

  /**
   * Format document, retrieving data and assigning reference
   *
   * @static
   * @param {any} doc document id
   * @returns document
   * @memberof _Firebase
   */
  static documentWithRef(doc) {
    return {
      ...doc.data(),
      $id: doc.ref.id,
      $ref: doc.ref,
    }
  }

  /**
   * x
   *
   * @static
   * @param {any} map x
   * @param {any} obj x
   * @memberof _Firebase
   */
  static arrayToMapReducer(map, obj) {
    return map.set(obj.$id, obj)
  }

  /**
   * x
   *
   * @static
   * @param {any} sortKey x
   * @returns x
   * @memberof _Firebase
   */
  static makeSortedValueMap(sortKey) {
    const newMap = new Map()
    newMap[Symbol.iterator] = function*() {
      yield* [...this.values()].sort(
        (a, b) => (a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? 1 : -1)
      )
    }
    return newMap
  }

  /**
   * x
   *
   * @static
   * @returns x
   * @memberof _Firebase
   */
  static makeValueMap() {
    const newMap = new Map()
    newMap[Symbol.iterator] = function*() {
      yield* [...this.values()]
    }
    return newMap
  }

  /**
   * Retrieve collection
   *
   * @param {any} name collection name
   * @returns collection
   * @memberof _Firebase
   */
  col(name) {
    let col = this.collections[name]

    if (!col) {
      col = this.collections[name] = this.db.collection(name)
    }

    return col
  }

  /**
   * Retrieve document from collection
   *
   * @param {any} collection collection name
   * @param {any} doc document id
   * @returns document
   * @memberof _Firebase
   */
  async doc(collection, doc) {
    return await this.col(collection)
      .doc(doc)
      .get()
      .then(_Firebase.documentWithRef)
  }

  /**
   * Retrieve list of documents in collection
   *
   * @param {any} collection collection name
   * @returns map of documents
   * @memberof _Firebase
   */
  async list(collection, sortKey) {
    let snapshot = await this.col(collection)
      .orderBy(sortKey)
      .get()
    return snapshot.docs
      .map(_Firebase.documentWithRef)
      .reduce(_Firebase.arrayToMapReducer, _Firebase.makeValueMap())
  }

  /**
   * Query collection
   *
   * @param {any} collection collection name
   * @param {any} params query params
   * @returns map of documents
   * @memberof _Firebase
   */
  async query(collection, params, sortKey) {
    let result = this.collections[collection]
    if (!result) {
      result = this.collections[collection] = this.db.collection(collection)
    }

    let keys = Object.keys(params)
    let key
    while ((key = keys.pop())) {
      result = result.where(key, '==', params[key])
    }
    let snapshot = await result.orderBy(sortKey).get()
    return snapshot.docs
      .map(_Firebase.documentWithRef)
      .reduce(_Firebase.arrayToMapReducer, _Firebase.makeValueMap())
  }
}

class Storage {
  static set(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key))
  }
}

const Cache = {}

const Firebase = new _Firebase()

export { Firebase, Storage, Cache }
