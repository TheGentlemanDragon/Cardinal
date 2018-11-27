import { initializeStore } from 'fluxible-js'

initializeStore({
  initialStore: {
    assets: null,
    cardId: '',
    cards: [],
    element: null,
    elements: [],
    games: new Map(),
    modal: '',
    mode: 'compose',
    modified: false,
    preview: [],
    scale: 1.8,
    selected: 0,
    templates: new Map(),
  },
})
