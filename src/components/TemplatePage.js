import { emitEvent } from 'fluxible-js'
import { Component, linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'

import Card from './Card'
import Compose from './Compose'
import Populate from './Populate'

class TemplatePage extends Component {
  state = {
    index: 0,
  }

  setIndex = index => this.setState({ index })

  componentDidMount() {
    const { templateId } = this.props.match.params
    emitEvent('initTemplatePage', { templateId })
  }

  render() {
    const { index } = this.state

    return (
      <div key="template" container="row #left @stretch" flex>
        <div class="sidebar" container="column #top @stretch">
          {/* Bar Title */}
          <Link class="sidebar-title" to={`/games/`}>
            Cardinal
          </Link>

          {/* Tabs */}
          <div class="sidebar-tabs" container="row #spaced @middle">
            <button
              class={index === 0 ? 'active' : ''}
              onClick={linkEvent(0, this.setIndex)}
            >
              Compose
            </button>

            <button
              class={index === 1 ? 'active' : ''}
              onClick={linkEvent(1, this.setIndex)}
            >
              Populate
            </button>
          </div>

          <div class="sidebar-tab" container="column #top @stretch">
            {index === 0 ? <Compose /> : <Populate />}
          </div>
        </div>

        <div container="column #center @center" flex>
          <Card mode={index === 0 ? 'compose' : 'populate'} />
        </div>
      </div>
    )
  }
}

const map = ({ templatePage }) => ({ templatePage })
export default mapStatesToProps(TemplatePage, map)
