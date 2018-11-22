import { addEvent, emitEvent, getStore, updateStore } from 'fluxible-js'
import { Firebase } from './data'

const defaultElement = {
  name: '',
  contentType: '',
  type: '',
  style: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
}

/* Generic Events */

addEvent('setState', partial => {
  updateStore(partial)
})

addEvent('fetchCollection', async ({ collection, sortKey, ...rest }) => {
  const data = await Firebase.list(collection, sortKey)
  updateStore({ [collection]: data, ...rest })
})

addEvent('fetchQuery', async ({ collection, query, sortKey, ...rest }) => {
  query.owner = 'nando'
  const data = await Firebase.query(collection, query, sortKey)
  const newState = { [collection]: data, ...rest }
  updateStore(newState)
})

// addEvent('fetchDoc', async ({ collection, state, id }) => {
//   const data = await Firebase.doc(collection, id)
//   updateStore({ [state]: data })
// })

/* Game Events */

addEvent('createGame', async name => {
  const game = { name, owner: 'nando' }
  const collection = await Firebase.col('games')
  await collection.add(game)

  emitEvent('fetchCollection', {
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

  emitEvent('fetchQuery', {
    collection: 'templates',
    query: { game },
    sortKey: 'name',
    modal: '',
  })
})

addEvent('fetchTemplate', async id => {
  const template = await Firebase.doc('templates', id)
  const elements = template.elements || []
  updateStore({
    oElements: JSON.parse(JSON.stringify(elements)),
    elements,
    element: { ...defaultElement, ...elements[0] },
  })
})
