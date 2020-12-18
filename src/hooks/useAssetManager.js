import { h } from 'preact'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { css } from 'linaria'

import { useModal } from './useModal'
import { DataImage } from '../features/DataImage'
import { ActionButton } from '../features/Menu/ActionButton'
import { MenuCss } from '../features/Menu/Menu'
import { useDS } from '../hooks/useDS'
import { MenuPanelCss } from '../lib/styles'
import { importFile, noop } from '../lib/utils'

const IMAGE_WIDTH = 234
const PADDING = 16

const AssetManagerCss = css`
  display: flex;

  .AssetManager-Content {
    background-color: var(--clr-modal-light);
    box-shadow: var(--box-shadow-lg);
    padding: var(--modal-padding);
    width: 50rem;
  }

  .AssetManager-SearchInput {
    background-color: var(--clr-black-10);
    border: none;
    border-bottom: var(--border-dark);
    font-size: large;
    outline: none;
    padding: var(--input-padding-y) var(--input-padding-x);
  }

  .AssetManager-Header {
    display: flex;
  }

  .AssetManager-Title {
    color: var(--clr-text-light);
    flex-grow: 1;
  }

  .AssetManager-List {
    height: calc(100% - 54px);
    margin-right: -16px;
    margin-top: 16px;
    overflow: hidden auto;
    position: relative;
  }
`

export function useAssetManager(onSelect = noop) {
  const Assets = useDS('Assets')
  const fileInput = useRef(null)
  const [selected, setSelected] = useState('')

  useEffect(() => {
    Assets.getList()
  }, [])

  // Get 3-column flow offset map for each image asset
  const offsets = useMemo(() => {
    if (!Assets.list.length) {
      return []
    }

    const columns = [
      { x: 0, y: 0 },
      { x: PADDING + IMAGE_WIDTH, y: 0 },
      { x: 2 * (PADDING + IMAGE_WIDTH), y: 0 },
    ]

    return Assets.list.map(item => {
      // Move first column to end, once it is larger
      if (columns[0].y > columns[1].y) {
        columns.push(columns.shift())
      }

      const offset = { ...columns[0] }
      columns[0].y += PADDING + (IMAGE_WIDTH / item.width) * item.height

      return offset
    })
  }, [Assets])

  const uploadFile = async event => {
    const imageFile = await importFile(event)
    Assets.add(imageFile)
  }

  const AssetManagerContent = ({ closeModal }) => (
    <div class={AssetManagerCss}>
      <div class={MenuCss}>
        <div class={MenuPanelCss}>
          <ActionButton caption="Back" iconType="back" onClick={closeModal} />
        </div>

        <div class={MenuPanelCss}>
          <ActionButton
            caption="Add Image"
            iconType="addImage"
            onClick={() => fileInput.current?.click()}
          />

          <ActionButton caption="Add URL" iconType="addUrl" onClick={noop} />
        </div>
      </div>

      <div class="AssetManager-Content">
        <div class="AssetManager-Header">
          <h2 class="AssetManager-Title">Game Assets</h2>
          <input
            class="AssetManager-SearchInput"
            type="text"
            placeholder="Search"
          />
        </div>

        <div class="AssetManager-List">
          {Assets.list.map((item, index) => (
            <DataImage
              image={item}
              offset={offsets[index]}
              width={IMAGE_WIDTH}
            />
          ))}
        </div>
      </div>

      <input
        ref={fileInput}
        type="file"
        multiple
        accept="image/*"
        onChange={uploadFile}
        style="display:none"
      />
    </div>
  )

  return useModal(AssetManagerContent)
}
