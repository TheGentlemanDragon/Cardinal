import { h } from 'preact'
import { useState } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { useGlobalBlur } from '../hooks/useGlobalBlur'
import { getDisplayValue } from '../lib/utils'

const SelectCss = css`
  margin-bottom: var(--g-margin-md);
  text-align: right;

  label {
    text-shadow: var(--text-shadow-sm);
  }
`

const inputCss = css`
  align-items: center;
  background-color: var(--clr-input);
  border-radius: var(--radius-md);
  color: var(--clr-text-dark);
  cursor: pointer;
  display: flex;
  height: var(--input-height);
  justify-content: space-between;
  margin-top: var(--g-margin-sm);
  overflow: hidden;
  padding: var(--input-padding-vertical) var(--input-padding-horizontal);
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
  width: var(--input-min-width);
`

const caretCss = css`
  background-image: url(../assets/icons/caret-down.png);
  cursor: pointer;
  height: 16px;
  margin-top: 1px;
  pointer-events: none;
  transition: linear 0.15s transform;
  width: 16px;
`

const caretUpCss = css`
  transform: rotate(180deg);
`

const menuWrapperCss = css`
  height: 0;
  margin-top: calc(var(--g-margin-sm) / 2);
  overflow: visible;
`

const menuCss = css`
  background-color: var(--clr-input-bg-hover);
  border-radius: var(--radius-md);
  opacity: 1;
  overflow: hidden;
  padding: var(--input-padding-vertical) 0;
  position: absolute;
  transition: opacity 0.5s;
  width: var(--input-min-width);

  > div {
    align-items: center;
    display: flex;
    height: var(--input-height);
    justify-content: flex-end;
    padding: var(--input-padding-vertical) var(--input-padding-horizontal);
  }

  > div {
    color: var(--clr-white);
    opacity: 0.9;
  }

  > div:hover {
    cursor: pointer;
    opacity: 1;
  }
`

const menuClosedCss = css`
  opacity: 0;
  z-index: -1;
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

      <div
        ref={blurRef}
        class={`${inputCss} inputContainer`}
        onClick={isOpen ? close : open}
      >
        {options.length > 1 ? (
          isOpen ? (
            <div class={`${caretCss} ${caretUpCss}`} />
          ) : (
            <div class={caretCss} />
          )
        ) : null}
        {value}
      </div>

      <div class={menuWrapperCss}>
        <div class={`${menuCss} ${!isOpen && menuClosedCss}`}>
          {options
            .filter(item => getDisplayValue(item, labelKey) !== value)
            .map(item => (
              <div key={item.$id} onClick={() => onSelect(item)}>
                {getDisplayValue(item, labelKey)}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
