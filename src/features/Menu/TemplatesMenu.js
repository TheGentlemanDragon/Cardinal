import { h } from 'preact'
import PropTypes from 'proptypes'

import { ActionButton } from './ActionButton'
import { SelectCollection } from '../SelectCollection'
import { Title } from '../Title'

import { MenuCss } from '../../lib/styles'
import { openEditorTemplate } from '../../lib/utils'

TemplatesMenu.propTypes = {
  gameId: PropTypes.string,
}

TemplatesMenu.defaultProps = {
  gameId: '',
}

/** List games for the main page */
export function TemplatesMenu({ gameId }) {
  return (
    <div class={MenuCss}>
      <Title />

      <div class="Menu-Panel">
        <SelectCollection
          collection="Games"
          labelKey="name"
          name="Game"
          value={gameId}
          valueKey="$id"
          onSelect={game => openEditorTemplate(game.$id)}
        />
      </div>

      <div class="Menu-Panel">
        <ActionButton caption="Add Template" icon="text" onClick={() => {}} />
      </div>
    </div>
  )
}
