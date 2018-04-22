import { Firebase } from './data'

const iArray = (array, index, item) =>
  Object.assign([...array], { [index]: { ...array[index], ...item } })

export default {
  // Element
  addElement: () => async ({ elements, template }, { setTemplate }) => {
    const newElement = { name: `element${elements.length + 1}` }
    const updateData = { elements: [...elements, newElement] }
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },

  // TODO: cancel reverts to unchanged copy of element
  // cancelElement: index => ({ elements, oElement }) => ({
  //   editIndex: -1,
  //   mouseIndex: -1,
  //   elements: iArray(elements, index, oElement),
  // }),

  deleteElement: index => async ({ elements, template }, { setTemplate }) => {
    const updateData = (elements.splice(index, 1), { elements })
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },

  mouseElement: mouseIndex => ({ mouseIndex }),

  saveElement: () => ({ elements, template }) => {
    const newState = { elements }
    template.$ref.update(newState)
  },

  selectElement: selectedIndex => state => ({
    selectedIndex,
    element: state.elements[selectedIndex] || null,
  }),

  updateElement: ({ ...partial }) => ({ elements, selectedIndex }) => {
    const element = { ...elements[selectedIndex], ...partial }
    console.log(element)
    return {
      element,
      elements: Object.assign([...elements], { [selectedIndex]: element }),
    }
  },

  // Games
  fetchGames: () => async (_, { setGames }) =>
    setGames(await Firebase.list('games', 'name')),

  setGames: games => ({ games }),

  // SideBar
  setTab: tab => ({ tab }),

  // Template
  fetchTemplate: match => async (_state, { setTemplate }) =>
    setTemplate(await Firebase.doc('templates', match.params.templateId)),

  setTemplate: template => ({
    template: template,
    elements: template.elements || [],
    element: template.elements.length && template.elements[0],
    selectedIndex: template.elements.length >= 0 ? 0 : -1,
  }),

  // Templates
  fetchTemplates: match => async (_, { setTemplates }) => {
    const query = { owner: 'nando', game: match.params.gameId }
    setTemplates(await Firebase.query('templates', query, 'name'))
  },

  setTemplates: templates => ({ templates }),
}
