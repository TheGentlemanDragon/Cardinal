import { Firebase } from './services/data'

export default {
  // Element
  addElement: () => async ({ elements, template }, { setTemplate }) => {
    const newElement = { name: `element${elements.length + 1}` }
    const updateData = { elements: [...elements, newElement] }
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },

  deleteElement: index => async ({ elements, template }, { setTemplate }) => {
    const updateData = (elements.splice(index, 1), { elements })
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },

  mouseElement: ({ index, item, mouse }) => state => ({
    ...state,
    elements: Object.assign([...state.elements], {
      [index]: { ...item, mouse: mouse },
    }),
  }),

  // Games
  fetchGames: () => async (state, { setGames }) =>
    setGames(await Firebase.list('games', 'name')),

  setGames: games => state => ({ ...state, games }),

  // SideBar
  setTab: tab => state => ({ ...state, tab }),

  // Template
  clearTemplate: () => (state, { setTemplate }) => setTemplate({}),

  fetchTemplate: match => async (state, { setTemplate }) =>
    setTemplate(await Firebase.doc('templates', match.params.templateId)),

  setTemplate: template => state => ({
    ...state,
    template: template,
    elements: template.elements || [],
  }),

  // Templates
  clearTemplates: () => (state, { setTemplates }) => setTemplates(null),
  fetchTemplates: match => async (state, { setTemplates }) => {
    const query = { owner: 'nando', game: match.params.gameId }
    setTemplates(await Firebase.query('templates', query, 'name'))
  },
  setTemplates: templates => state => ({ ...state, templates }),
}
