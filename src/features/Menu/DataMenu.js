import { h } from 'preact'
import PropTypes from 'proptypes'

import { ActionButton } from './ActionButton'
import { Title } from '../Title'

import { exportCsv, importCsv } from '../../lib/models'
import { MenuCss } from '../../lib/styles'
import { goBack } from '../../lib/utils'

DataMenu.propTypes = {
  addField: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
}

DataMenu.defaultProps = {}

/** List games for the main page */
export function DataMenu({ addField, addRow }) {
  return (
    <div class={MenuCss}>
      <Title />

      <div class="Menu-Panel">
        <ActionButton caption="Return to Editor" icon="back" onClick={goBack} />
      </div>

      <div class="Menu-Panel">
        <ActionButton caption="Import CSV" icon="table" onClick={importCsv} />

        <ActionButton caption="Export CSV" icon="table" onClick={exportCsv} />
      </div>

      <div class="Menu-Panel">
        <ActionButton caption="Add row" icon="addImage" onClick={addRow} />

        <ActionButton caption="Add field" icon="addImage" onClick={addField} />
      </div>
    </div>
  )
}
