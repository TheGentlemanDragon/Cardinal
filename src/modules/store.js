import { initializeStore } from 'fluxible-js'

initializeStore({
  initialStore: {
    assets: null,
    cardId: '',
    cards: [],
    element: {},
    elements: [],
    games: new Map(),
    modal: '',
    mode: 'compose',
    preview: [],
    scale: 1.8,
    selected: 0,
    templates: new Map(),
  },
})
