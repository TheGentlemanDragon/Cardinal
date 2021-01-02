import { h } from 'preact'
import { route } from 'preact-router'
import PropTypes from 'proptypes'

import { ActionButton } from './ActionButton'
import { SelectCollection } from '../SelectCollection'
import { Title } from '../Title'

import { MenuCss } from '../../lib/styles'

// TODO: Add DS proptype
TemplatesMenu.propTypes = {
  gameId: PropTypes.string.isRequired,
  Templates: PropTypes.object.isRequired,
}

TemplatesMenu.defaultProps = {}

/** List games for the main page */
export function TemplatesMenu({ gameId, Templates }) {
  const addTemplate = () => {
    const count = document.getElementsByClassName('template').length
    Templates.add({
      name: `Template ${count}`,
      gameId,
      fields: [],
    })
  }

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
          onSelect={game => route(`templates?game=${game.$id}`)}
        />
      </div>

      <div class="Menu-Panel">
        <ActionButton
          caption="Add Template"
          icon="text"
          onClick={addTemplate}
        />
      </div>
    </div>
  )
}
