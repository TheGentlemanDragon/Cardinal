import { initializeStore } from 'fluxible-js'

initializeStore({
  assets: null,
  cards: null,
  element: null,
  elements: null,
  game: null,
  games: null,
  modal: '',
  preview: {
    staticContent: false,
    dynamicContent: false,
    cardId: '',
    scale: 1.8,
  },
  tab: 'compose',
  template: null,
  templates: null,
})
