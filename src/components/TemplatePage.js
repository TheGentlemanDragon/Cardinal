import { emitEvent } from 'fluxible-js'

import AssetsModal from './AssetsModal'
import Card from './Card'
import SideBar from './SideBar'

const TemplatePage = () => (
  <div key="template" container="row #left @stretch" flex>
    <SideBar />

    <div container="column #center @center" flex>
      <Card />
    </div>

    <AssetsModal />
  </div>
)

TemplatePage.defaultHooks = {
  onComponentWillMount(props) {
    emitEvent('fetchTemplate', props.match.params.templateId)
  },
}

export default TemplatePage
