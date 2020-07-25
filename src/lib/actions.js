import { route } from 'preact-router'

import { Firebase } from 'lib/data'

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
