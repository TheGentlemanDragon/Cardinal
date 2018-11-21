import Elements from './Elements'
import Properties from './Properties'
import Preview from './Preview'
import Style from './Style'

const Compose = () => (
  <div key="compose" class="sidebar-tab" container="column #top @stretch">
    <Elements />
    <Properties />
    <Style />
    <Preview />
  </div>
)

export default Compose
