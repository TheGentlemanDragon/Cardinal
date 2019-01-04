import { initializeStore } from 'fluxible-js'

initializeStore({
  initialStore: {
    assets: null,
    card: {},
    cards: [],
    elements: [],
    game: {},
    games: [],
    template: {},
    templates: [],
    templatePage: {
      elementIndex: 0,
      preview: [],
      scale: 1.8,
    },
  },
})
