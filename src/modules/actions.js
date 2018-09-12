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
  await template.$ref.update(updateData)

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
  store.updateStore({ elements: oElements })
}

function selectElement(store, selectedIndex) {
  const { elements } = store.getStoreState()
  store.updateStore({
    selectedIndex,
    element: { ...defaultElement, ...elements[selectedIndex] },
  })
}

function updateElement(store, { ...partial }) {
  const { elements, selectedIndex } = store.getStoreState()
  const element = { ...elements[selectedIndex], ...partial }
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
    oElements: { ...elements },
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

function saveTemplate(store, elements, template) {
  template.$ref.update({ elements })
}

function setTemplate(store, template) {
  store.updateStore({ template })
}

function setTemplates(store, templates) {
  store.updateStore({ templates })
}

/* SideBar */

function setTab(store, tab) {
  store.updateStore({ tab })
}

export {
  addElement,
  clearTemplates,
  deleteElement,
  fetchGames,
  fetchTemplate,
  fetchTemplates,
  restoreElements,
  saveTemplate,
  selectElement,
  setTab,
  setTemplate,
  setTemplates,
  updateElement,
}
