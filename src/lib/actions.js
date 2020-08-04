import { route } from 'preact-router'

import { Firebase } from 'lib/data'

const defaultElement = {
  style: {
    left: { unit: 'px', value: 0 },
    top: { unit: 'px', value: 0 },
    height: { unit: 'px', value: 30 },
    width: { unit: 'px', value: 100 },
  },
}

/* Element Actions */

export function addElement(template, type) {
  const count = document.getElementsByClassName('element').length
  const name = `element${count}`
  return Firebase.add(`${template.$path}/elements`, {
    ...defaultElement,
    name,
    type,
  })
}

export function updateElement(template, index, value) {
  const elements = Object.assign([], template.elements, { [index]: value })
  return Firebase.update(template, { elements })
}

export async function openEditorTemplate(game, template) {
  // If no template selected, pick the first one
  if (game && !template) {
    const templates = await Firebase.query(
      'templates',
      { gameRef: `/games/${game.$id}` },
      'name'
    )
    template = templates[0]
  }

  route(`/${game.$path}/${template.$path}`, true)
}
