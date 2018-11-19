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

// // const iArray = (array, index, item) =>
// //   Object.assign([...array], { [index]: { ...array[index], ...item } })

function setProperty(store, path, event) {
  const [key, property] = path.split('.')
  const data = store.getStoreState()[key]
  const { value } = event.target
  store.updateStore({ [key]: { ...data, [property]: value } })
}

function toggleProperty(store, path) {
  const [key, property] = path.split('.')
  const data = store.getStoreState()[key]
  store.updateStore({ [key]: { ...data, [property]: !data[property] } })
}

/* Elements */

async function addElement(store) {
  const { elements, template } = store.getStoreState()
  const newElement = { name: `element${elements.length + 1}` }
  const updateData = { elements: [...elements, newElement] }
  setTemplate(store, { ...template, ...updateData })
}

async function deleteElement(store, index) {
  const { elements, template } = store.getStoreState()
  const updateData = (elements.splice(index, 1), { elements })
  await template.$ref.update(updateData)

  setTemplate(store, { ...template, ...updateData })
}

function restoreElements(store) {
  const { oElements } = store.getStoreState()
  store.updateStore({ elements: JSON.parse(JSON.stringify(oElements)) })
}

function selectElement(store, selectedIndex) {
  const { elements } = store.getStoreState()
  store.updateStore({
    selectedIndex,
    element: { ...defaultElement, ...elements[selectedIndex] },
  })
}

function updateElement(store, key, event) {
  const { elements, selectedIndex } = store.getStoreState()
  const element = { ...elements[selectedIndex] }
  const parts = key.split('.')

  let part
  let nested = element
  while ((part = parts.shift())) {
    if (!parts.length) {
      break
    }
    if (!nested.hasOwnProperty(part)) {
      nested[part] = {}
    }
    nested = nested[part]
  }
  nested[part] = event.target.value

  store.updateStore({
    element,
    elements: Object.assign([...elements], { [selectedIndex]: element }),
  })
}

/* Games */

async function createGame(store, name) {
  const games = await Firebase.col('games')
  await games.add({ name, owner: 'nando' })
  fetchGames(store)
  hideModal(store, 'newGame')
}

async function fetchGames(store) {
  const games = await Firebase.list('games', 'name')
  store.updateStore({ games })
}

function setGame(store, game) {
  store.updateStore({ game })
}

/* Modals */

function hideModal(store, name, event) {
  if (event && event.currentTarget !== event.srcElement) {
    return
  }

  const { modals } = store.getStoreState()
  store.updateStore({ modals: { ...modals, [name]: false } })
}

function showModal(store, name) {
  const { modals } = store.getStoreState()
  store.updateStore({ modals: { ...modals, [name]: true } })
}

/* Templates */

function clearTemplates(store) {
  store.updateStore({ templates: [] })
}

async function createTemplate(store, template) {
  const templates = await Firebase.col('templates')
  await templates.add({ ...template, elements: [], owner: 'nando' })
  fetchTemplates(store, template.game)
  hideModal(store, 'newTemplate')
}

async function fetchTemplate(store, match) {
  const template = await Firebase.doc('templates', match.params.templateId)
  const elements = template.elements || []
  store.updateStore({
    oElements: JSON.parse(JSON.stringify(elements)),
    elements,
    element: { ...defaultElement, ...elements[0] },
    template,
    selectedIndex: 0,
  })
}

async function fetchTemplates(store, game) {
  const query = { owner: 'nando', game }
  const templates = await Firebase.query('templates', query, 'name')
  store.updateStore({ templates })
}

function saveTemplate(store) {
  const { elements, template } = store.getStoreState()
  template.$ref.update({ elements })
}

function setTemplate(store, template) {
  store.updateStore({ template, elements: template.elements })
}

function setTemplates(store, templates) {
  store.updateStore({ templates })
}

/* SideBar */

function setTabCompose(store) {
  store.updateStore({ tab: 'compose' })
}

function setTabPopulate(store) {
  store.updateStore({ tab: 'populate' })
}

/* Assets Manager */

async function addAsset(store, url) {
  const assets = await Firebase.col('assets')
  const path = url.split('/').pop() || ''
  const name = (path.match(/(.*\.\w+)/) || [])[0] || url
  await assets.add({ name, url, owner: 'nando' })
  fetchAssets(store)
}

async function fetchAssets(store) {
  const query = await Firebase.query('assets', { owner: 'nando' }, 'name')
  store.updateStore({ assets: [...query.values()] || [] })
}

export {
  addAsset,
  addElement,
  clearTemplates,
  createGame,
  createTemplate,
  deleteElement,
  fetchAssets,
  fetchGames,
  fetchTemplate,
  fetchTemplates,
  hideModal,
  restoreElements,
  saveTemplate,
  selectElement,
  setGame,
  setProperty,
  setTabCompose,
  setTabPopulate,
  setTemplate,
  setTemplates,
  showModal,
  toggleProperty,
  updateElement,
}
