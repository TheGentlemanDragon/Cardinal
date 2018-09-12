import { Component } from 'inferno'
import { connect } from 'inferno-context-api-store'

class AssetManager extends Component {
  state = {
    show: false,
  }

  hide = () => this.setState({ show: false })

  show = () => this.setState({ show: true })

  render() {
    const { assets } = this.props
    const { show } = this.state

    return (
      show && (
        <div
          class="file-manager-wrapper"
          onClick={event =>
            event.currentTarget === event.srcElement && this.hide()
          }
        >
          <div class="file-manager" container="column #top @stretch">
            <div flex>Files:</div>
            <div
              class="file-manager-drop"
              container="row #center @center"
              flex
              ondrop={event => {
                // Assets.upload(event.dataTransfer.files[0])
                console.log(event.dataTransfer.files)
                event.preventDefault()
              }}
              ondragover={event => event.preventDefault()}
            >
              Drop Files Here
            </div>
          </div>
        </div>
      )
    )
  }
}

export default connect(store => ({ assets: store.assets }))(AssetManager)
