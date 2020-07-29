import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { options } from './config'

firebase.initializeApp(options)

/**
 * Encapsulates Firebase functionality
 *
 * @class Firebase
 */
class FirebaseFactory {
  constructor() {
    this.db = firebase.firestore()
    this.collections = {}
    this.owner = null
    this.storage = firebase.storage()
    this.fb = firebase
  }

  setOwner(owner) {
    this.owner = owner
  }

  /**
   * Format document, retrieving data and assigning reference
   *
   * @static
   * @param {any} doc document id
   * @returns document
   * @memberof FirebaseFactory
   */
  static documentWithRef(doc) {
    return {
      ...doc.data(),
      $id: doc.ref.id,
      $ref: doc.ref,
    }
  }

  /**
   * Retrieve collectionzen
   *
   * @param {any} name collection name
   * @returns collection
   * @memberof FirebaseFactory
   */
  col(name) {
    let col = this.collections[name]
    col = col || this.db.collection(name)
    return col
  }

  /**
   * Retrieve document from collection
   *
   * @param {any} collection collection name
   * @param {any} doc document id
   * @returns document
   * @memberof FirebaseFactory
   */
  async doc(collection, doc) {
    const docRef = await this.col(collection)
      .doc(doc)
      .get()
    return FirebaseFactory.documentWithRef(docRef)
  }

  /**
   * Retrieve list of documents in collection
   *
   * @param {any} collection collection name
   * @returns map of documents
   * @memberof FirebaseFactory
   */
  async list(collection, sortKey) {
    const snapshot = await this.col(collection)
      .where('owner', '==', this.owner)
      .orderBy(sortKey)
      .get()
    return snapshot.docs.map(FirebaseFactory.documentWithRef)
  }

  /**
   * Query collection
   *
   * @param {any} collection collection name
   * @param {any} params query params
   * @returns map of documents
   * @memberof FirebaseFactory
   */
  async query(collection, params, sortKey) {
    let query = this.col(collection).where('owner', '==', this.owner)
    let keys = Object.keys(params)
    let key
    while ((key = keys.pop())) {
      let value = params[key]
      query = query.where(key, '==', value)
    }

    let snapshot = await query.orderBy(sortKey).get()
    return snapshot.docs.map(FirebaseFactory.documentWithRef)
  }

  /**
   * Query collection
   *
   * @param {string} id game id to associate asset with
   * @param {File} file file to upload
   * @memberof FirebaseFactory
   */
  async upload(id, file) {
    const ref = this.storage.ref(`${id}/`)
    // TODO: Store reference in database
    return ref.child(file.name).put(file)
  }

  async listFiles(id) {
    // TODO: Query references from database
    return []
  }
}

class Storage {
  static set(key, obj) {
    // localStorage.setItem(key, JSON.stringify(obj))
  }

  static get(key) {
    // return JSON.parse(localStorage.getItem(key))
  }
}

const Cache = {}

const Firebase = new FirebaseFactory()

export { Firebase, Storage, Cache }
