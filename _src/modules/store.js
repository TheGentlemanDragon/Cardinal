import { initializeStore } from 'fluxible-js'

initializeStore({
  initialStore: {
    assets: [],
    card: undefined,
    cards: [],
    elements: [],
    game: {},
    games: [],
    template: {},
    templates: [],
    templatePage: {
      elementIndex: 0,
      prevElements: [],
      preview: [],
      scale: 1.8,
    },
  },
})
