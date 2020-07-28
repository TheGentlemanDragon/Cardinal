import { route } from 'preact-router'

import { Firebase } from 'lib/data'

const defaultElement = {
  style: {
    height: { unit: 'px', value: 30 },
    width: { unit: 'px', value: 100 },
  },
}

export function addElement(template, type, callback) {
  const name = `element${template.elements?.length || 0}`
  Firebase.update(template, {
    elements: [...(template.elements || []), { ...defaultElement, name, type }],
  })

  // TODO: Fix this hack
  // `update` promise doesn't resolve; assume it will then make callback
  setTimeout(callback, 300)
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
