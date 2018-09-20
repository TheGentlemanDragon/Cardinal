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

async function fetchGames(store) {
  const games = await Firebase.list('games', 'name')
  store.updateStore({ games })
}

/* Templates */

function clearTemplates(store) {
  store.updateStore({ templates: [] })
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

async function fetchTemplates(store, match) {
  const query = { owner: 'nando', game: match.params.gameId }
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

function setTabPreview(store) {
  store.updateStore({ tab: 'preview' })
}

/* Assets Manager */

function hideAssetManager(store, event) {
  if (event && event.currentTarget !== event.srcElement) {
    return
  }

  const { assets } = store.getStoreState()
  store.updateStore({ assets: { ...assets, show: false } })
}

function showAssetManager(store) {
  const { assets } = store.getStoreState()
  store.updateStore({ assets: { ...assets, show: true } })
}

async function fetchFiles(store, username) {
  const { assets } = store.getStoreState()
  const user = await Firebase.doc('users', username)
  store.updateStore({ assets: { ...assets, files: user.assets || [] } })
}

export {
  addElement,
  clearTemplates,
  deleteElement,
  fetchFiles,
  fetchGames,
  fetchTemplate,
  fetchTemplates,
  hideAssetManager,
  restoreElements,
  saveTemplate,
  selectElement,
  setTabCompose,
  setTabPreview,
  setTemplate,
  setTemplates,
  showAssetManager,
  updateElement,
}
