import { Component, linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'
import { emitEvent } from 'fluxible-js'
import { hasChanged, setState, toThumb } from '../modules/utils'

class AssetsPage extends Component {
  constructor() {
    super()
    this.state = {
      albumId: '',
      filter: '',
      panelMode: 'hidden',
    }
  }

  componentWillMount() {
    const { gameId } = this.props.match.params
    emitEvent('initAssetsPage', { gameId })
  }

  componentDidUpdate(lastProps) {
    if (hasChanged(this.props, lastProps, 'game')) {
      this.setState({ albumId: this.props.game.images })
    }
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

  updateAlbumId(instance) {
    emitEvent('updateGame', { images: instance.state.albumId || '' })
    instance.setState({ panelMode: 'hidden' })
  }

  render() {
    const { hidePanel, showAdd, updateAlbumId } = this
    const { assets = [], game } = this.props
    const { albumId, filter, panelMode } = this.state
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
              <input
                type="text"
                placeholder="Search Assets"
                onInput={linkEvent(this, setState('filter'))}
              />
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
                  <input
                    type="text"
                    autoFocus
                    value={albumId}
                    onInput={linkEvent(this, setState('albumId'))}
                  />
                  <span class="modal-footer" container="row #right @center">
                    <button onClick={linkEvent(this, hidePanel)}>Cancel</button>
                    <button
                      class="primary"
                      disabled={albumId === game.images}
                      onClick={linkEvent(this, updateAlbumId)}
                    >
                      Save
                    </button>
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
