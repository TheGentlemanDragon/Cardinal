import { route } from 'preact-router'

import { Firebase } from 'lib/data'

const defaultElement = {
  style: {
    height: { unit: 'px', value: 100 },
    width: { unit: 'px', value: 100 },
  },
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

export function addElement(template, type, callback) {
  Firebase.update(template, {
    elements: [...(template.elements || []), { ...defaultElement, type }],
  })

  // TODO: Fix this hack
  // Update promise doesn't resolve; assume it will then make callback
  setTimeout(callback, 300)
}
