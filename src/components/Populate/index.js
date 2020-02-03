import { mapStatesToProps } from 'inferno-fluxible'

import Cards from './Cards'

const Populate = ({ cards, elements }) => (
  <>
    <Cards />
  </>
)

const map = ({ cards, template }) => ({
  cards,
  elements: template.elements || [],
  template,
})

export default mapStatesToProps(Populate, map)
