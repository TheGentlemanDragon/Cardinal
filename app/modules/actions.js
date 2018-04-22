import { Firebase } from './data'

// const iArray = (array, index, item) =>
//   Object.assign([...array], { [index]: { ...array[index], ...item } })

export default {
  // Element
  addElement: () => async ({ elements, template }, { setTemplate }) => {
    const newElement = { name: `element${elements.length + 1}` }
    const updateData = { elements: [...elements, newElement] }
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },

  backupElements: elements => ({ oElements: elements }),

  deleteElement: index => async ({ elements, template }, { setTemplate }) => {
    const updateData = (elements.splice(index, 1), { elements })
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },

  mouseElement: mouseIndex => ({ mouseIndex }),

  restoreElements: () => ({ oElements }) => ({ elements: oElements }),

  selectElement: selectedIndex => state => ({
    selectedIndex,
    element: state.elements[selectedIndex] || null,
  }),

  updateElement: ({ ...partial }) => ({ elements, selectedIndex }) => {
    const element = { ...elements[selectedIndex], ...partial }
    return {
      element,
      elements: Object.assign([...elements], { [selectedIndex]: element }),
    }
  },

  // Elements
  setElements: elements => ({ elements }),

  // Games
  fetchGames: () => async (_, { setGames }) =>
    setGames(await Firebase.list('games', 'name')),

  setGames: games => ({ games }),

  // SideBar
  setTab: tab => ({ tab }),

  // Template
  fetchTemplate: match => async (
    _,
    { backupElements, setTemplate, setElements, selectElement }
  ) => {
    const template = await Firebase.doc('templates', match.params.templateId)
    setTemplate(template)
    setElements(template.elements)
    backupElements(template.elements)
    selectElement(0)
  },

  saveTemplate: () => ({ elements, template }) => {
    template.$ref.update({ elements })
  },

  setTemplate: template => ({ template }),

  // Templates
  fetchTemplates: match => async (_, { setTemplates }) => {
    const query = { owner: 'nando', game: match.params.gameId }
    setTemplates(await Firebase.query('templates', query, 'name'))
  },

  setTemplates: templates => ({ templates }),
}
