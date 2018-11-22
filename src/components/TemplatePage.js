import { emitEvent } from 'fluxible-js'

// import AssetsModal from './AssetsModal'
import Card from './Card'
import SideBar from './SideBar'

const getTemplate = id => emitEvent('fetchTemplate', id)

const TemplatePage = () => (
  <div key="template" container="row #left @stretch" flex>
    <SideBar />

    <div container="column #center @center" flex>
      <Card />
    </div>

    {/* TODO: <AssetsModal /> */}
  </div>
)

TemplatePage.defaultHooks = {
  onComponentWillMount(props) {
    getTemplate(props.match.params.templateId)
  },
}

export default TemplatePage
