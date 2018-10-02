import { Component } from 'inferno'
import { connect } from 'inferno-context-api-store'

import AssetsModal from './AssetsModal'
import Card from './Card'
import SideBar from './SideBar'
import { fetchTemplate } from '../modules/actions'

class TemplatePage extends Component {
  componentDidMount() {
    this.props.fetchTemplate(this.props.match)
  }

  render() {
    return (
      <div key="template" container="row #left @stretch" flex>
        <SideBar />

        <div container="column #center @center" flex>
          <Card />
        </div>

        <AssetsModal />
      </div>
    )
  }
}

export default connect(
  store => ({}),
  { fetchTemplate }
)(TemplatePage)
