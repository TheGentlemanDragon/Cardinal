import { addEvent, emitEvent, getStore, updateStore } from 'fluxible-js'
import { Firebase } from './data'
import { newElement, setDeep } from './utils'

const imgurAlbum = id => `https://api.imgur.com/3/album/${id}/images`
const imgurOptions = {
  method: 'GET',
  headers: new Headers({
    Authorization: 'Client-ID ' + localStorage.getItem('imgurClientId'),
  }),
}

/* Generic Events */

addEvent('applyState', partial => {
  console.log('Event: applyState')

  const parentKey = Object.keys(partial)[0]
  const parent = getStore()[parentKey]
  updateStore({ [parentKey]: { ...parent, ...partial[parentKey] } })
})

addEvent('setState', partial => {
  console.log('Event: setState')

  updateStore(partial)
})

addEvent('fetchCollection', async ({ collection, sortKey, ...rest }) => {
  console.log('Event: fetchCollection')

  const data = await Firebase.list(collection, sortKey)
  updateStore({ [collection]: data, ...rest })
})

addEvent('fetchQuery', async ({ collection, query = {}, sortKey, ...rest }) => {
  console.log('Event: fetchQuery')

  const data = await Firebase.query(collection, query, sortKey)
  const newState = { [collection]: data, ...rest }
  updateStore(newState)
})

/* Page Events */

addEvent('initAssetsPage', async ({ gameId }) => {
  console.log('Event: initAssetsPage')

  let assets
  const game = await Firebase.doc('games', gameId)

  if (game.images) {
    const response = await fetch(imgurAlbum(game.images), imgurOptions)
    const json = await response.json()
    assets = json.data
  }

  updateStore({ assets, game })
})

addEvent('initGamesPage', async () => {
  console.log('Event: initGamesPage')

  updateStore({ games: await Firebase.list('games', 'name') })
})

addEvent('initTemplatesPage', async ({ gameId }) => {
  console.log('Event: initTemplatesPage')

  const game = await Firebase.doc('games', gameId)
  const query = { gameRef: game.$ref }
  const templates = await Firebase.query('templates', query, 'name')
  updateStore({ game, templates })
})

addEvent('initTemplatePage', async ({ templateId }) => {
  console.log('Event: initTemplatePage')

  let assets
  const { templatePage } = getStore()
  const template = await Firebase.doc('templates', templateId)
  const templateRef = template.$ref
  const cards = await Firebase.query('cards', { templateRef }, 'name')
  const elements = template.elements || []
  templatePage.prevElements = JSON.parse(JSON.stringify(elements))

  const gameRef = await template.gameRef.get()
  const game = gameRef.data()

  if (game.images) {
    const response = await fetch(imgurAlbum(game.images), imgurOptions)
    const json = await response.json()
    assets = json.data
  }

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
// console.log('Event: setPath')

//   debugger
//   const [key, property] = path.split('.')
//   const data = getStore()[key]
//   updateStore({ [key]: { ...data, [property]: value } })
// })

// addEvent('fetchDoc', async ({ collection, state, id }) => {
// console.log('Event: fetchDoc')

//   const data = await Firebase.doc(collection, id)
//   updateStore({ [state]: data })
// })

/* Assets Manager */

addEvent('addAsset', async url => {
  console.log('Event: addAsset')

  const assets = await Firebase.col('assets')
  const path = url.split('/').pop() || ''
  const name = (path.match(/(.*\.\w+)/) || [])[0] || url
  await assets.add({ name, url, owner: 'nando' })
  emitEvent('fetchQuery', { collection: 'assets', sortKey: 'name' })
})

addEvent('uploadAsset', async ({ id, files }) => {
  console.log('Event: uploadAsset')

  await Firebase.upload(id, files[0])
})

/* Card Events */

addEvent('createCard', async () => {
  console.log('Event: createCard')

  const { cards, template } = getStore()
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
  console.log('Event: updateCard')

  const { cards, card } = getStore()
  card.data[key] = value
  updateStore({ card, cards })
})

/* Game Events */

addEvent('createGame', async name => {
  console.log('Event: createGame')

  await Firebase.col('games').add({ name, owner: 'nando' })
  updateStore({ games: await Firebase.list('games', 'name') })
})

/* Template Events */

addEvent('createTemplate', async ({ gameRef, name }) => {
  console.log('Event: createTemplate')

  const template = { name, gameRef, owner: 'nando' }
  await Firebase.col('templates').add(template)

  updateStore({
    templates: await Firebase.query('templates', { gameRef }, 'name'),
  })
})

// addEvent('fetchTemplate', async id => {
// console.log('Event: fetchTemplate')

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
  console.log('Event: saveTemplate')

  const { elements, template, templatePage } = getStore()
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
  console.log('Event: addElement')

  const { elements } = getStore()
  updateStore({ elements: [...elements, newElement(elements.length + 1)] })
})

addEvent('deleteElement', async index => {
  console.log('Event: deleteElement')

  const { elements, templatePage } = getStore()
  const remove = elements[index]

  updateStore({
    elements: elements.filter(item => item !== remove),
    templatePage: { ...templatePage, elementIndex: 0 },
  })
})

addEvent('resetElement', () => {
  console.log('Event: resetElement')

  const { element } = getStore()
  updateStore({ element })
})

addEvent('resetElements', () => {
  console.log('Event: resetElements')

  const { templatePage } = getStore()
  updateStore({ elements: templatePage.prevElements })
})

addEvent('selectElement', elementIndex => {
  console.log('Event: selectElement')

  const { templatePage } = getStore()
  updateStore({ templatePage: { ...templatePage, elementIndex } })
})

addEvent('updateElement', ({ key, value }) => {
  console.log('Event: updateElement')

  const {
    elements,
    templatePage: { elementIndex },
  } = getStore()
  elements[elementIndex] = setDeep(elements[elementIndex], key, value)
  updateStore({ elements })
})
