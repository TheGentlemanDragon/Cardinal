import firebase from 'firebase'
import 'firebase/firestore'
import { options } from '../config'

class _Firebase {
  constructor() {
    firebase.initializeApp(options)
    this.db = firebase.firestore()
    this.collections = {}
  }

  async list(collection) {
    let col = this.collections[collection]

    if (!col) {
      col = this.collections[collection] = this.db.collection(collection)
    }

    let snapshot = await col.get()
    return snapshot.docs.map(doc => doc.data())
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
    return snapshot.docs.map(doc => doc.data())
  }

  doc(collection, doc) {
    return this.list(collection).doc(doc)
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
