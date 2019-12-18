import {
  addEvent as _addEvent,
  emitEvent,
  store,
  updateStore,
} from 'fluxible-js'
import { Firebase } from './data'
import { newElement, prepAssets, setDeep } from './utils'

const addEvent = (name, fn) =>
  _addEvent(name, (...args) => {
    console.log(`Event: ${name}`)
    return fn(...args)
  })

/* Generic Events */

addEvent('applyState', partial => {
  const parentKey = Object.keys(partial)[0]
  const parent = store[parentKey]
  updateStore({ [parentKey]: { ...parent, ...partial[parentKey] } })
})

addEvent('setState', partial => {
  updateStore(partial)
})

addEvent('fetchCollection', async ({ collection, sortKey, ...rest }) => {
  const data = await Firebase.list(collection, sortKey)
  updateStore({ [collection]: data, ...rest })
})

addEvent('fetchQuery', async ({ collection, query = {}, sortKey, ...rest }) => {
  const data = await Firebase.query(collection, query, sortKey)
  const newState = { [collection]: data, ...rest }
  updateStore(newState)
})

/* Page Events */

addEvent('initAssetsPage', async ({ gameId }) => {
  const game = await Firebase.doc('games', gameId)
  const assets = await prepAssets(game)

  updateStore({ assets, game })
})

addEvent('initGamesPage', async () => {
  updateStore({ games: await Firebase.list('games', 'name') })
})

addEvent('initTemplatesPage', async ({ gameId }) => {
  const game = await Firebase.doc('games', gameId)
  const query = { gameRef: game.$ref }
  const templates = await Firebase.query('templates', query, 'name')
  updateStore({ game, templates })
})

addEvent('initTemplatePage', async ({ templateId }) => {
  const { templatePage } = store
  const template = await Firebase.doc('templates', templateId)
  const templateRef = template.$ref
  const cards = await Firebase.query('cards', { templateRef }, 'name')
  const elements = template.elements || []
  templatePage.prevElements = JSON.parse(JSON.stringify(elements))

  const gameRef = await template.gameRef.get()
  const game = gameRef.data()
  const assets = await prepAssets(game)

  updateStore({
    assets,
    cards,
    elements,
    game,
    template,
    templatePage,
  })
})

// addEvent('setPath', ({ path, value }) => {
//   debugger
//   const [key, property] = path.split('.')
//   const data = store[key]
//   updateStore({ [key]: { ...data, [property]: value } })
// })

// addEvent('fetchDoc', async ({ collection, state, id }) => {
//   const data = await Firebase.doc(collection, id)
//   updateStore({ [state]: data })
// })

/* Assets Manager */

addEvent('addAsset', async url => {
  const assets = await Firebase.col('assets')
  const path = url.split('/').pop() || ''
  const name = (path.match(/(.*\.\w+)/) || [])[0] || url
  await assets.add({ name, url, owner: 'nando' })
  emitEvent('fetchQuery', { collection: 'assets', sortKey: 'name' })
})

addEvent('uploadAsset', async ({ id, files }) => {
  await Firebase.upload(id, files[0])
})

/* Card Events */

addEvent('createCard', async () => {
  const { cards, template } = store
  const newCard = {
    name: `card${cards.size + 1}`,
    template: template.name,
    templateRef: template.$ref,
    ownerRef: template.ownerRef,
    data: {},
  }

  const $cards = await Firebase.col('cards')
  await $cards.add(newCard)

  const query = { templateRef: template.$ref }
  const newCards = await Firebase.query('cards', query, 'name')
  updateStore({ cards: newCards })
})

addEvent('updateCard', ({ key, value }) => {
  const { cards, card } = store
  card.data[key] = value
  updateStore({ card, cards })
})

/* Game Events */

addEvent('createGame', async name => {
  await Firebase.col('games').add({ name, owner: 'nando' })
  updateStore({ games: await Firebase.list('games', 'name') })
})

addEvent('updateGame', async data => {
  const { game } = store
  await game.$ref.update(data)
  window.location.reload()
})

/* Template Events */

addEvent('createTemplate', async ({ gameRef, name }) => {
  const template = { name, gameRef, owner: 'nando' }
  await Firebase.col('templates').add(template)

  updateStore({
    templates: await Firebase.query('templates', { gameRef }, 'name'),
  })
})

// addEvent('fetchTemplate', async id => {
//   const template = await Firebase.doc('templates', id)
//   const query = { templateRef: template.$ref }
//   const cards = await Firebase.query('cards', query, 'name')
//   const card = cards.values().next().value
//   const elements = template.elements || []

//   updateStore({
//     card,
//     cards,
//     elements,
//     element: { ...defaultElement, ...elements[0] },
//     oCardData: JSON.parse(JSON.stringify(card.data)),
//     oElements: JSON.parse(JSON.stringify(elements)),
//     template,
//   })
// })

addEvent('saveTemplate', async () => {
  const { elements, template, templatePage } = store
  await template.$ref.update({ elements })
  updateStore({
    template: setDeep(template, 'elements', elements),
    templatePage: setDeep(
      templatePage,
      'prevElements',
      JSON.parse(JSON.stringify(elements))
    ),
  })
})

/* Element Events */

addEvent('addElement', async () => {
  const { elements } = store
  updateStore({ elements: [...elements, newElement(elements.length + 1)] })
})

addEvent('deleteElement', async index => {
  const { elements, templatePage } = store
  const remove = elements[index]

  updateStore({
    elements: elements.filter(item => item !== remove),
    templatePage: { ...templatePage, elementIndex: 0 },
  })
})

addEvent('resetElement', () => {
  const { element } = store
  updateStore({ element })
})

addEvent('resetElements', () => {
  const { templatePage } = store
  updateStore({ elements: templatePage.prevElements })
})

addEvent('selectElement', elementIndex => {
  const { templatePage } = store
  updateStore({ templatePage: { ...templatePage, elementIndex } })
})

addEvent('updateElement', ({ key, value }) => {
  const {
    elements,
    templatePage: { elementIndex },
  } = store
  elements[elementIndex] = setDeep(elements[elementIndex], key, value)
  updateStore({ elements })
})
