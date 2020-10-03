import { route } from 'preact-router'

import { Firebase } from './data'

/* Element Actions */

export async function openEditorTemplate(gameId, templateId) {
  route(`/games/${gameId}${templateId ? '/templates/' + templateId : ''}`, true)
}
