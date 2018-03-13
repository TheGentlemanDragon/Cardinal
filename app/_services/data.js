import firebase from 'firebase'
import 'firebase/firestore'
import { options } from '../config'

class _Firebase {
  constructor() {
    firebase.initializeApp(options)
    this.db = firebase.firestore()
    this.collections = {}
  }

  static documentWithRef (doc) {
    return {
      ...doc.data(),
      $ref: doc.ref,
    }
  }

  col(name) {
    let col = this.collections[name]

    if (!col) {
      col = this.collections[name] = this.db.collection(name)
    }

    return col
  }

  async doc(collection, doc) {
    return await this.col(collection).doc(doc).get().then(_Firebase.documentWithRef)
  }

  async list(collection) {
    let snapshot = await this.col(collection).get()
    return snapshot.docs.map(_Firebase.documentWithRef)
  }

  async query(collection, params) {
    let result = this.collections[collection]
    if (!result) {
      result = this.collections[collection] = this.db.collection(collection)
    }

    let keys = Object.keys(params)
    let key
    while (key = keys.pop()) {
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
