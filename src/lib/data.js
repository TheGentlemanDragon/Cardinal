import Firestore from 'firebase-firestore-lite'
import config from './config'

const rxRef = /.*Ref$/

/**
 * Encapsulates Firebase functionality
 *
 * @class Firebase
 */
class FirebaseFactory {
  constructor() {
    this.db = new Firestore(config)
    this.collections = {}
    this.owner = null
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
  static documentWithRef(doc) {
    return {
      ...doc,
      $id: doc.__meta__.id,
      $ref: doc.__meta__.path,
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
    col = col || this.db.reference(name)
    return col
  }

  // /**
  //  * Retrieve document from collection
  //  *
  //  * @param {any} collection collection name
  //  * @param {any} doc document id
  //  * @returns document
  //  * @memberof FirebaseFactory
  //  */
  // async doc(collection, doc) {
  //   const docRef = await this.col(collection)
  //     .doc(doc)
  //     .get()
  //   return FirebaseFactory.documentWithRef(docRef)
  // }

  /**
   * Retrieve list of documents in collection
   *
   * @param {any} collection collection name
   * @returns map of documents
   * @memberof FirebaseFactory
   */
  async list(collection, sortKey) {
    const snapshot = await this.col(collection)
      .query()
      .where('owner', '==', this.owner)
      .orderBy(sortKey)
      .run()
    return snapshot.map(FirebaseFactory.documentWithRef)
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
    let query = await this.col(collection)
      .query()
      .where('owner', '==', this.owner)

    let keys = Object.keys(params)
    let key
    while ((key = keys.pop())) {
      let value
      if (rxRef.test(key)) {
        value = this.db.reference(params[key])
      } else {
        value = params[key]
      }
      query = query.where(key, '==', value)
    }

    let snapshot = await query.orderBy(sortKey).run()
    return snapshot.map(FirebaseFactory.documentWithRef)
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
    localStorage.setItem(key, JSON.stringify(obj))
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key))
  }
}

const Cache = {}

const Firebase = new FirebaseFactory()
Firebase.setOwner('nando')

export { Firebase, Storage, Cache }
