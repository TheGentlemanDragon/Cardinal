import { Component, linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'
import { emitEvent } from 'fluxible-js'

const toThumb = url => {
  const ext = url.substring(url.lastIndexOf('.'))
  return url.replace(ext, 't' + ext)
}

class AssetsPage extends Component {
  constructor() {
    super()
    this.state = { filter: '', panelMode: 'hidden' }
  }

  componentWillMount() {
    const { gameId } = this.props.match.params
    emitEvent('initAssetsPage', { gameId })
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
    const { hidePanel, showAdd } = this
    const { assets = [] } = this.props
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
                    .filter(
                      item => !filter || item.description.includes(filter)
                    )
                    .map(item => (
                      <div class="asset-tile">
                        <div class="image-container">
                          <img
                            src={toThumb(item.link)}
                            alt={item.description}
                          />
                        </div>
                        <div class="asset-name">{item.description}</div>
                      </div>
                    ))}
                </section>
              )}

              {panelMode === 'add' && (
                <aside class="modal-content" container="column #left @stretch">
                  <label>Imgur Album ID</label>
                  <input type="text" autoFocus />
                  <span class="modal-footer" container="row #right @center">
                    <button onClick={linkEvent(this, hidePanel)}>Cancel</button>
                    <button class="primary">Save</button>
                  </span>
                </aside>
              )}
            </article>
          </main>
        </div>
      </div>
    )
  }
}

AssetsPage.defaultHooks = {}

const map = ({ assets, game, modal }) => ({ assets, game, modal })
export default mapStatesToProps(AssetsPage, map)
