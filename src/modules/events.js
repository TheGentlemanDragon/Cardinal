import { addEvent, emitEvent, getStore, updateStore } from 'fluxible-js'
import { Firebase } from './data'

const defaultElement = {
  name: '',
  type: 'Dynamic Text',
  style: {
    top: 0,
    left: 0,
    width: 50,
    height: 15,
  },
}

const differ = (e1, e2) => JSON.stringify(e1) !== JSON.stringify(e2)

const setDeep = (obj, key, value) => {
  const parts = key.split('.')

  let part
  let nested = obj
  while ((part = parts.shift())) {
    if (!parts.length) {
      break
    }
    if (!nested.hasOwnProperty(part)) {
      nested[part] = {}
    }
    nested = nested[part]
  }
  nested[part] = value

  return obj
}

/* Generic Events */

addEvent('setState', partial => updateStore(partial))

addEvent('fetchCollection', async ({ collection, sortKey, ...rest }) => {
  const data = await Firebase.list(collection, sortKey)
  updateStore({ [collection]: data, ...rest })
})

addEvent('fetchQuery', async ({ collection, query = {}, sortKey, ...rest }) => {
  query.owner = 'nando'
  const data = await Firebase.query(collection, query, sortKey)
  const newState = { [collection]: data, ...rest }
  updateStore(newState)
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
  const $cards = await Firebase.col('instances')
  const { cards, template } = getStore()
  const newCard = {
    name: `card${cards.length + 1}`,
    template: template.name,
    templateRef: template.$ref,
    ownerRef: template.ownerRef,
    data: {},
  }
  template.elements.forEach(item => {
    if (item.type.startsWith('Static')) {
      return
    }
    newCard.data[item.name] = ''
  })
  await $cards.add(newCard)
  updateStore({ cards: [...cards, newCard] })
})

addEvent('updateCard', (key, value) => {
  const { cards, selectedIndex } = getStore()
  const card = setDeep(cards[selectedIndex], key, value)

  updateStore({
    card,
    cards: Object.assign([...cards], { [selectedIndex]: card }),
  })
})

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
    template,
  })
})

addEvent('saveTemplate', async () => {
  const { elements, template } = getStore()
  await template.$ref.update({ elements })
  updateStore({ modified: false })
})

/* Element Events */

addEvent('addElement', async index => {
  const { elements } = getStore()
  const element = {
    ...defaultElement,
    name: `element${elements.length + 1}`,
  }
  elements.push(element)

  updateStore({ element, elements, modified: true })
})

addEvent('deleteElement', async index => {
  const { elements } = getStore()
  elements.splice(index, 1)

  updateStore({
    element: elements[0],
    elements,
    modified: true,
    selected: 0,
  })
})

addEvent('resetElement', () => {
  const { element } = getStore()
  updateStore({ element })
})

addEvent('resetElements', () => {
  const { oElements: elements, selected } = getStore()
  updateStore({
    elements,
    element: elements[selected],
    modified: false,
  })
})

addEvent('selectElement', selected => {
  const { elements } = getStore()
  const element = elements[selected]
  updateStore({ element, selected })
})

addEvent('updateElement', ({ key, value }) => {
  const { oElements, elements, selected } = getStore()
  const element = setDeep(elements[selected], key, value)

  updateStore({
    element,
    elements,
    modified: differ(oElements, elements),
  })
})
