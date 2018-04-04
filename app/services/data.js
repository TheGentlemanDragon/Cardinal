import firebase from 'firebase'
import 'firebase/firestore'
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
      $ref: doc.ref,
    }
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
   * @returns array of documents
   * @memberof _Firebase
   */
  async list(collection) {
    let snapshot = await this.col(collection).get()
    return snapshot.docs.map(_Firebase.documentWithRef)
  }

  /**
   * Query collection
   *
   * @param {any} collection collection name
   * @param {any} params query params
   * @returns array of documents
   * @memberof _Firebase
   */
  async query(collection, params) {
    let result = this.collections[collection]
    if (!result) {
      result = this.collections[collection] = this.db.collection(collection)
    }

    let keys = Object.keys(params)
    let key
    while ((key = keys.pop())) {
      result = await result.where(key, '==', params[key])
    }

    let snapshot = await result.get()
    return snapshot.docs.map(_Firebase.documentWithRef)
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
