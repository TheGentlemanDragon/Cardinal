import { initializeStore } from 'fluxible-js'

initializeStore({
  initialStore: {
    assets: null,
    card: null,
    cards: new Map(),
    element: null,
    elements: [],
    games: new Map(),
    modal: '',
    mode: 'populate',
    modified: {
      elements: false,
      cards: false,
    },
    preview: [],
    scale: 1.8,
    selected: 0,
    templates: new Map(),
  },
})
