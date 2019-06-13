import { Component, linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'
import { emitEvent } from 'fluxible-js'

// const uploadAsset = id => event =>
//   emitEvent('uploadAsset', { files: event.target.files, id })

// const MidTrunc = ({ value }) => {
//   return [
//     <span class="trunc-front">{value}</span>,
//     <span class="trunc-back">{value}</span>,
//   ]
// }

class AssetsPage extends Component {
  constructor() {
    super()
    this.state = { filter: '', panelMode: 'hidden' }
  }

  componentWillMount() {
    emitEvent('fetchQuery', { collection: 'assets', sortKey: 'name' })
  }

  add(instance) {
    const { value } = document.querySelector('[placeholder="Asset URL"]')
    emitEvent('addAsset', value)
    instance.setState({ filter: '' })
    instance.toggleMode(instance)
  }

  hidePanel(instance) {
    instance.setState({ panelMode: 'hidden' })
  }

  showAdd(instance) {
    instance.setState({ panelMode: 'add' })
  }

  showDetails(instance) {
    instance.setState({ panelMode: 'details' })
  }

  filterText(instance, event) {
    instance.setState({ filter: event.target.value })
  }

  render() {
    const { add, hidePanel, showAdd, showDetails, filterText } = this
    const { assets, game, match } = this.props
    const { panelMode, filter } = this.state
    const articleFlex = panelMode === 'hidden' ? 'center' : 'spread'

    return (
      <div key="templates" container="column #top @stretch" flex>
        {/* App Title */}
        <div class="app-title">Cardinal</div>

        {/* Page */}
        <div class="page" container="column #top @stretch">
          <div class="page-title">
            <Link to={`/games/`}>&lt; Back</Link>
          </div>

          <main class="activity" container="column #left @stretch">
            <header container="row #spaced @middle">
              <h1 flex>Assets Manager</h1>
              <input type="text" placeholder="Search Assets" />
              <button class="edge-button" onClick={linkEvent(this, showAdd)}>
                +
              </button>
            </header>

            <article flex container={`row #${articleFlex} @top`}>
              {/* Assets List - Empty */}
              {assets.length === 0 && (
                <section class="info-well">
                  There are no assets associated with this game. You should{' '}
                  <button
                    class="link-button"
                    onClick={linkEvent(this, showAdd)}
                  >
                    add
                  </button>{' '}
                  one.
                </section>
              )}

              {/* Assets List */}
              {assets.length > 0 && (
                <section class="assets-list" flex container="row #left @top">
                  {[...assets]
                    .filter(item => !filter || item.name.includes(filter))
                    .map(item => (
                      <div class="asset-tile">
                        <div class="image-contianer">
                          <img src={item.url} alt={item.name} />
                        </div>
                        <div class="asset-name">{item.name}</div>
                      </div>
                    ))}
                </section>
              )}

              {panelMode === 'add' && <aside>Here is the new side panel</aside>}
            </article>
          </main>
        </div>
      </div>
    )
  }
}

AssetsPage.defaultHooks = {
  onComponentDidMount(domNode, props) {
    const { gameId } = props.match.params
    emitEvent('initAssetsPage', { gameId })
  },
}

const map = ({ assets, game, modal }) => ({ assets, game, modal })
export default mapStatesToProps(AssetsPage, map)
