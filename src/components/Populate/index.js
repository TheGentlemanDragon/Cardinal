import { mapStatesToProps } from 'inferno-fluxible'

import Cards from './Cards'
import { composeCards } from '../../modules/utils'

const Populate = ({ cards, elements }) => (
  <>
    <Cards items={composeCards(elements, cards)} />
  </>
)

const map = ({ cards, template }) => ({
  cards,
  elements: template.elements || [],
  template,
})

export default mapStatesToProps(Populate, map)
