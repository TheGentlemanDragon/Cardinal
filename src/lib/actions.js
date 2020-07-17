import { route } from 'preact-router'

import { Firebase } from 'lib/data'

export async function openEditorTemplate(game, template) {
  if (game && !template) {
    const templates = await Firebase.query(
      'templates',
      { gameRef: `/games/${game.$id}` },
      'name'
    )
    template = templates[0]
  }

  route(`/${game.$ref}/${template.$ref}`, true)
}
