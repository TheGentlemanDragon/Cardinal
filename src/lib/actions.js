import { route } from 'preact-router'

/* Element Actions */

export async function openEditorTemplate(gameId, templateId) {
  route(`/games/${gameId}${templateId ? '/templates/' + templateId : ''}`, true)
}
