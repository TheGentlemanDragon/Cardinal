import { addEvent, emitEvent, getStore, updateStore } from 'fluxible-js'
import { Firebase } from './data'

/* Generic Events */

addEvent('setState', partial => {
  updateStore(partial)
})

addEvent('fetchState', async ({ collection, sortKey, ...rest }) => {
  const data = await Firebase.list(collection, sortKey)
  updateStore({ [collection]: data, ...rest })
})

addEvent('queryState', async ({ collection, query, sortKey, ...rest }) => {
  query.owner = 'nando'
  const data = await Firebase.query(collection, query, sortKey)
  const newState = { [collection]: data, ...rest }
  updateStore(newState)
})

/* Game Events */

addEvent('createGame', async name => {
  const game = { name, owner: 'nando' }
  const collection = await Firebase.col('games')
  await collection.add(game)

  emitEvent('fetchState', {
    collection: 'games',
    sortKey: 'name',
    modal: '',
  })
})

/* Template Events */

addEvent('createTemplate', async name => {
  const { game, games } = getStore()
  const gameRef = Array.from(games.values()).find(item => item.name === game)
    .$ref
  const template = { name, game, gameRef, elements: [], owner: 'nando' }
  const collection = await Firebase.col('templates')
  await collection.add(template)

  emitEvent('queryState', {
    collection: 'templates',
    query: { game },
    sortKey: 'name',
    modal: '',
  })
})
