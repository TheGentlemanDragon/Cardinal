import { addEvent, emitEvent, getStore, updateStore } from 'fluxible-js'
import { Firebase } from './data'
import { newElement, setDeep } from './utils'

/* Generic Events */

addEvent('applyState', partial => {
  const parentKey = Object.keys(partial)[0]
  const parent = getStore()[parentKey]
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
  const { templatePage } = getStore()
  const template = await Firebase.doc('templates', templateId)
  const templateRef = template.$ref
  const cards = await Firebase.query('cards', { templateRef }, 'name')
  const elements = template.elements || []
  templatePage.prevElements = JSON.parse(JSON.stringify(elements))
  updateStore({
    cards,
    elements,
    template,
    templatePage,
  })
})

// addEvent('setPath', ({ path, value }) => {
//   debugger
//   const [key, property] = path.split('.')
//   const data = getStore()[key]
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

/* Card Events */

addEvent('createCard', async () => {
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
  const { cards, card } = getStore()
  card.data[key] = value
  updateStore({ card, cards })
})

/* Game Events */

addEvent('createGame', async name => {
  await Firebase.col('games').add({ name, owner: 'nando' })
  updateStore({ games: await Firebase.list('games', 'name') })
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
  const { elements } = getStore()
  updateStore({ elements: [...elements, newElement(elements.length + 1)] })
})

addEvent('deleteElement', async index => {
  const { elements, templatePage } = getStore()
  const remove = elements[index]

  updateStore({
    elements: elements.filter(item => item !== remove),
    templatePage: { ...templatePage, elementIndex: 0 },
  })
})

addEvent('resetElement', () => {
  const { element } = getStore()
  updateStore({ element })
})

addEvent('resetElements', () => {
  const { templatePage } = getStore()
  updateStore({ elements: templatePage.prevElements })
})

addEvent('selectElement', elementIndex => {
  const { templatePage } = getStore()
  updateStore({ templatePage: { ...templatePage, elementIndex } })
})

addEvent('updateElement', ({ key, value }) => {
  const {
    elements,
    templatePage: { elementIndex },
  } = getStore()
  elements[elementIndex] = setDeep(elements[elementIndex], key, value)
  updateStore({ elements })
})
