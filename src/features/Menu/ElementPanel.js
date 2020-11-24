import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { useModal } from '../../hooks/useModal'
import { useSelectOnFocus } from '../../hooks/useSelectOnFocus'

const ElementPanelCss = css`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`

ElementPanel.propTypes = {
  element: PropTypes.object,
  setElement: PropTypes.func,
}

export function ElementPanel({ element, setElement }) {
  const { isShowing, toggle, Modal } = useModal()
  const selectRef = useSelectOnFocus()

  return (
    <div class={ElementPanelCss}>
      <label>Name</label>
      <input
        type="text"
        ref={selectRef}
        value={element.name}
        onInput={e => setElement({ name: e.target.value })}
      />

      <label>Value</label>
      <input
        type="text"
        ref={selectRef}
        value={element.value || ''}
        onInput={e => setElement({ value: e.target.value })}
      />
      <button onClick={toggle}>Assets </button>
      <Modal />
    </div>
  )
}
