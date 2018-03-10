import firebase from 'firebase'
import 'firebase/firestore'
import { options } from '../config'

class _Firebase {
    constructor() {
        firebase.initializeApp(options)
        this.db = firebase.firestore()
        this.collections = {}
    }

    async _col (collection) {
        let col = this.collections[collection]

        if (!col) {
            col = this.collections[collection] = this.db.collection(collection)
        }

        let snapshot = await col.get()
        return snapshot.docs.map(doc => doc.data())
    }

    doc (collection, doc) {
        return this._col(collection).doc(doc)
    }
}

class Storage {
    static set (key, obj) {
        localStorage.setItem(key, JSON.stringify(obj))
    }

    static get (key) {
        return JSON.parse(localStorage.getItem(key))
    }
}

const Cache = {}

const Firebase = new _Firebase()

export { Firebase, Storage, Cache }
