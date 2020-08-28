import { route } from 'preact-router'

import { Firebase } from './data'

/* Element Actions */

export async function openEditorTemplate(game, template) {
  // TODO: Rewrite this for datastore
  // // If no template selected, pick the first one
  // if (game && !template) {
  //   const templates = await Firebase.query(
  //     'templates',
  //     { gameRef: `/games/${game.$id}` },
  //     'name'
  //   )
  //   template = templates[0]
  // }

  route(`/${game.$path}/${template.$path}`, true)
}
