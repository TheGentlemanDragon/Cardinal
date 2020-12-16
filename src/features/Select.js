import { h } from 'preact'
import { useState } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { useGlobalBlur } from '../hooks/useGlobalBlur'
import { cls, getDisplayValue } from '../lib/utils'

const SelectCss = css`
  margin-bottom: var(--margin-md);
  text-align: right;

  label {
    text-shadow: var(--text-shadow-sm);
  }

  .Select-Caret {
    background-image: url(../assets/icons/caret-down.png);
    cursor: pointer;
    height: 16px;
    margin-right: 0.5rem;
    min-width: 16px;
    pointer-events: none;
    transition: linear 0.15s transform;
  }

  .Select-CaretUp {
    transform: rotate(180deg);
  }

  .Select-Input {
    align-items: center;
    background-color: var(--clr-input);
    border-radius: var(--radius-md);
    color: var(--clr-text-dark);
    cursor: pointer;
    display: flex;
    height: var(--input-height);
    justify-content: space-between;
    margin-top: var(--margin-sm);
    padding: var(--input-padding-vertical) var(--input-padding-horizontal);
    width: var(--input-min-width);
  }

  .Select-SelectedValue {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
  }

  .Select-MenuWrapper {
    height: 0;
    margin-top: 1px;
    overflow: visible;
  }

  .Select-Menu {
    background-color: var(--clr-white);
    border-radius: var(--radius-md);
    opacity: 1;
    overflow: hidden;
    padding: var(--margin-tn) 0;
    position: absolute;
    transition: opacity 0.5s;
    width: var(--input-min-width);
  }

  .Select-MenuClosed {
    opacity: 0;
    z-index: -1;
  }

  .Select-MenuItem {
    align-items: center;
    color: var(--clr-text-light);
    height: var(--input-height);
    justify-content: flex-end;
    overflow: hidden;
    padding: var(--input-padding-vertical) var(--input-padding-horizontal);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .Select-MenuItem:hover {
    background-color: var(--clr-input-bg);
    color: var(--clr-white);
    cursor: pointer;
    opacity: 1;
  }
`

Select.propTypes = {
  disabled: PropTypes.bool,
  labelKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array,
  value: PropTypes.any,
}

Select.defaultProps = {
  disabled: false,
  labelKey: '',
  options: [],
  value: '',
}

export function Select({ disabled, labelKey, name, onSelect, options, value }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => options.length > 1 && setIsOpen(true)
  const close = () => setIsOpen(false)

  const { blurRef } = useGlobalBlur(isOpen, close)

  return (
    <div class={SelectCss}>
      <label>{name}</label>

      <div ref={blurRef} class="Select-Input" onClick={isOpen ? close : open}>
        {options.length > 1 ? (
          isOpen ? (
            <div class={cls('Select-Caret', 'Select-CaretUp')} />
          ) : (
            <div class="Select-Caret" />
          )
        ) : null}
        <span class="Select-SelectedValue">{value}</span>
      </div>

      <div class="Select-MenuWrapper">
        <div class={cls('Select-Menu', !isOpen && 'Select-MenuClosed')}>
          {options
            .filter(item => getDisplayValue(item, labelKey) !== value)
            .map(item => (
              <div
                class="Select-MenuItem"
                key={item.$id}
                onClick={() => onSelect(item)}
              >
                {getDisplayValue(item, labelKey)}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
