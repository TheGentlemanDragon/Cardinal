import { h } from 'preact'
import { useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import { css } from 'linaria'

const ModalOverlayCss = css`
  background-color: var(--clr-bg-dark);
  height: 100vh;
  position: absolute;
  top: 0;
  width: 100vw;

  .assets {
    height: 550px;
    width: 700px;

    > span > button.primary {
      margin-right: 20px;
    }
  }

  .assets-list {
    background: gradient(
      linear,
      left top,
      left bottom,
      from(rgba(255, 255, 255, 0)),
      to(#fff)
    );
    flex-wrap: wrap;
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 30px 0;
  }

  .assets-toolbar {
    padding: 0 30px 13px;
    border-bottom: 1px solid #eee;

    input {
      margin-right: 15px;
    }

    button + button {
      margin-left: 10px;
    }

    .hint {
      margin-right: 25px;
      line-height: 14px;
      color: #666;
    }
  }

  .asset-tile {
    border-radius: 10px;
    height: 120px;
    margin-bottom: 10px;
    margin-right: 40px;
    width: 120px;

    .image-container {
      border-radius: 10px;
      max-height: 80px;
      overflow: hidden;
    }

    img {
      display: block;
      width: 100%;
    }
  }
  .asset-name {
    overflow: hidden;
    white-space: nowrap;
    margin: 6px 0;
    text-overflow: ellipsis;
  }
`

export function useModal(filter = '', addMode = false) {
  const [isShowing, setIsShowing] = useState(false)

  const container = document.getElementById('modal')

  function add() {}

  function hide() {
    setIsShowing(false)
  }

  function toggle() {
    setIsShowing(!isShowing)
  }

  function toggleMode() {}

  function filterText() {}

  const assets = []

  const Modal = () =>
    isShowing
      ? createPortal(
          <div
            className={ModalOverlayCss}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div class="assets modal-content" container="column #left @stretch">
              <h1>Assets Manager</h1>

              <div class="assets-toolbar" container="row #spaced @bottom">
                {/* Add URL */}
                {addMode && [
                  <input type="text" placeholder="Asset URL" flex />,
                  <button class="primary" onClick={add}>
                    Upload
                  </button>,
                  <button onClick={toggleMode}>Cancel</button>,
                ]}

                {/* Filter */}
                {!addMode && [
                  <input
                    type="text"
                    placeholder="Filter Assets"
                    value={filter}
                    onInput={filterText}
                  />,
                  <button class="primary" onClick={toggleMode}>
                    Add Assets
                  </button>,
                ]}
              </div>

              <div class="assets-list" flex container="row #left @top">
                {[...assets]
                  .filter(item => !filter || item.name.includes(filter))
                  .map(item => (
                    <div class="asset-tile">
                      <div class="image-container">
                        <img src={item.url} alt={item.name} />
                      </div>
                      <div class="asset-name">{item.name}</div>
                    </div>
                  ))}
              </div>

              <span container="row #right @center">
                <button class="primary" onClick={hide}>
                  Done
                </button>
              </span>
            </div>
          </div>,
          container
        )
      : null

  return {
    isShowing,
    toggle,
    Modal,
  }
}
