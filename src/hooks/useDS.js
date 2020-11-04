import { useState } from 'preact/hooks'

import { DataStore } from '../lib/datastore'

export function useDS(storeName) {
  const store = DataStore[storeName] || null
  const [itemId, setItemId] = useState()
  const [listParams, setListParams] = useState()
  const [list, setList] = useState([])
  const [item, setItem] = useState()

  const setAndReturn = type => result => (
    (type === 'item' ? setItem : setList)(result), result
  )

  const getItem = id => {
    setItemId(id)
    return store.get(id).then(setAndReturn('item'))
  }

  const getList = params => {
    setListParams(params)
    return store.list(params).then(setAndReturn('list'))
  }

  const refresh = scope => {
    if (!scope) {
      throw new Error("Must specify refresh scope: 'all', 'item', 'list'")
    }

    if (scope === 'all' || scope === 'list') {
      store.list(listParams).then(setList)
    } else if (scope === 'all' || scope === 'item') {
      store.get(itemId).then(setItem)
    }
  }

  const add = value => store.add(value).then(() => refresh('list'))

  return {
    add,
    getItem,
    getList,
    item,
    list,
    refresh,
  }
}
