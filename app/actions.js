import { Firebase } from './services/data'

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

  cancelElement: index => ({ elements, oElement }) => ({
    editIndex: -1,
    mouseIndex: -1,
    elements: iArray(elements, index, oElement),
  }),

  deleteElement: index => async ({ elements, template }, { setTemplate }) => {
    const updateData = (elements.splice(index, 1), { elements })
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },

  editElement: editIndex => ({ elements }) => ({
    editIndex,
    oElement: elements[editIndex],
  }),

  mouseElement: mouseIndex => ({ mouseIndex }),

  saveElement: index => ({ elements, template }) => {
    const newState = { elements: elements }
    template.$ref.update(newState)
    return { ...newState, editIndex: -1, mouseIndex: -1 }
  },

  selectElement: selectedIndex => ({ selectedIndex }),

  updateElement: ({ index, ...partial }) => ({ elements }) => ({
    elements: iArray(elements, index, partial),
  }),

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
    selectedIndex: template.elements.length && 0,
  }),

  // Templates
  fetchTemplates: match => async (_, { setTemplates }) => {
    const query = { owner: 'nando', game: match.params.gameId }
    setTemplates(await Firebase.query('templates', query, 'name'))
  },

  setTemplates: templates => ({ templates }),
}
